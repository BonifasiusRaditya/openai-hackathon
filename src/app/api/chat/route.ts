import {openai} from "@ai-sdk/openai";
import {streamText} from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Define extended content type that includes data property for data URLs
interface ImageContent {
	type: "image_url";
	image_url?: URL;
	data?: string;
}

interface TextContent {
	type: "text";
	text: string;
}

type MessageContent = TextContent | ImageContent;

// Function to compress/resize data URL to reduce its size
function optimizeDataUrl(dataUrl: string): string {
	// If data URL is too large (over 1MB), we should try to optimize it
	if (dataUrl.length > 1000000) {
		console.log("Image data URL is very large, optimizing...");
		try {
			// Extract the MIME type and the base64 data
			const [metaData, base64Data] = dataUrl.split(",");

			// For very large data URLs, truncate to a reasonable size
			// This is a fallback mechanism - ideally we'd resize properly on the client
			const maxSize = 800000; // ~800KB max
			if (base64Data.length > maxSize) {
				console.log(
					`Truncating large data URL from ${base64Data.length} to ${maxSize} chars`
				);
				return `${metaData},${base64Data.substring(0, maxSize)}`;
			}
		} catch (err) {
			console.error("Error optimizing data URL:", err);
		}
	}
	return dataUrl;
}

export async function POST(req: Request) {
	const {messages, data} = await req.json();

	console.log("Received data:", data ? "Data present" : "No data");
	if (data?.imageUrl) {
		// Only log the start of the URL to avoid console overflow
		console.log(`Image URL length: ${data.imageUrl.length} chars`);
	}

	const initialMessages = messages.slice(0, -1);
	const currentMessage = messages[messages.length - 1];

	// Create an array to hold the user's content
	const userContent: MessageContent[] = [
		{
			type: "text",
			text: currentMessage.content,
		},
	];

	// Add image to message content if it exists
	if (data?.imageUrl) {
		try {
			console.log(
				"Processing image URL:",
				typeof data.imageUrl,
				data.imageUrl.substring(0, 50) + "..."
			);

			// Handle data URLs differently than web URLs
			if (data.imageUrl.startsWith("data:image/")) {
				console.log("Detected data URL image");

				// Optimize the data URL to reduce its size
				const optimizedDataUrl = optimizeDataUrl(data.imageUrl);

				// When using data URLs, we need to use the content format expected by the model
				userContent.push({
					type: "image_url",
					image_url: new URL("https://example.com/placeholder.jpg"), // Placeholder URL
					data: optimizedDataUrl,
				});
			} else {
				// Regular URL handling
				console.log("Regular URL image");
				userContent.push({
					type: "image_url",
					image_url: new URL(data.imageUrl),
				});
			}
		} catch (error) {
			console.error("Error processing image:", error);
		}
	}

	console.log(
		"User content structure:",
		JSON.stringify(
			userContent.map((c) => ({type: c.type})),
			null,
			2
		)
	);

	try {
		// Check if the user message content includes an image
		const hasImage = userContent.some((part) => part.type === "image_url");

		if (hasImage) {
			console.log("Image detected, using non-streaming fetch approach");

			// Format content for direct API call (ensure correct image_url structure)
			const apiContent = userContent
				.map((part) => {
					if (part.type === "image_url") {
						// Use data URL if present, otherwise use the image_url property
						const url = part.data || part.image_url?.toString();
						if (!url) {
							console.error("Image part is missing URL/data");
							return null; // Skip invalid image parts
						}
						return {
							type: "image_url",
							image_url: {url: url},
						};
					}
					return part; // Keep text parts as is
				})
				.filter((part) => part !== null); // Remove any null parts from filtering

			// Use direct fetch for image inputs
			const response = await fetch(
				"https://api.openai.com/v1/chat/completions",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
					},
					body: JSON.stringify({
						model: "gpt-4o-mini",
						messages: [
							...initialMessages,
							{
								role: "user",
								content: apiContent,
							},
						],
						// Stream: false is the default for direct fetch
					}),
				}
			);

			if (!response.ok) {
				const errorText = await response.text();
				console.error("OpenAI API error:", errorText);
				return new Response(`Error from OpenAI API: ${errorText}`, {
					status: response.status,
				});
			}

			const json = await response.json();
			console.log("Non-streaming response received successfully");

			// Return the assistant's response in the expected format for useChat
			// We need to mimic a streaming chunk containing the full message
			const assistantMessage = json.choices[0]?.message;
			if (!assistantMessage) {
				console.error("No message found in OpenAI response");
				return new Response("Invalid response from OpenAI", {
					status: 500,
				});
			}

			// The useChat hook expects data stream format.
			// Send the whole message as a single 'text' chunk.
			const streamData = `0:"${JSON.stringify(
				assistantMessage.content
			).slice(1, -1)}"\n`;

			return new Response(streamData, {
				headers: {
					"Content-Type": "text/plain; charset=utf-8",
					"X-Experimental-Stream-Data": "true", // Header used by Vercel AI SDK
				},
			});
		} else {
			console.log("Text-only detected, using streaming approach");
			// Use streaming for text-only inputs
			const result = streamText({
				model: openai("gpt-4o-mini"),
				messages: [
					...initialMessages,
					{
						role: "user",
						// Ensure content is just text for streamText
						content: currentMessage.content,
					},
				],
			});

			console.log("Stream created successfully");

			return result.toDataStreamResponse({
				headers: {
					Connection: "keep-alive",
					"Transfer-Encoding": "chunked",
					"Cache-Control": "no-cache, no-transform",
					"X-Content-Type-Options": "nosniff",
				},
			});
		}
	} catch (error) {
		console.error("Error in OpenAI API call:", error);
		return new Response("Error processing your request", {status: 500});
	}
}
