'use client';
import { useChat } from '@ai-sdk/react';
import { useState, FormEvent, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';
import Image from 'next/image';

interface ChatProps {
  imageData?: string | null;
  timestamp?: string;
}

// Define type for file parts
interface FilePart {
  type: 'file';
  mimeType: string;
  data: string;
}

// Function to resize image and return a smaller data URL
const resizeImage = (dataUrl: string, maxWidth = 800, maxHeight = 800, quality = 0.7): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Check if running in a browser environment
      if (typeof document === 'undefined') {
        reject(new Error('Cannot resize image in non-browser environment'));
        return;
      }

      const img = new globalThis.Image();
      img.onload = () => {
        try {
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round(height * (maxWidth / width));
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round(width * (maxHeight / height));
              height = maxHeight;
            }
          }

          // Create canvas and resize
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          // Draw resized image
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Get new data URL with reduced quality
          const resizedDataUrl = canvas.toDataURL('image/jpeg', quality);
          console.log(`Resized image: Original size: ${dataUrl.length}, New size: ${resizedDataUrl.length}`);

          resolve(resizedDataUrl);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        reject(new Error('Error loading image'));
      };

      img.src = dataUrl;
    } catch (error) {
      reject(error);
    }
  });
};

// Maximum file size in bytes (5MB)
// const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function Chat({ imageData, timestamp }: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    onError: (error) => {
      console.error('Chat API error:', error);
    },
  });
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingError, setProcessingError] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Helper function to handle image processing errors
  const handleImageProcessingError = (error: Error | unknown, fallbackImage?: string) => {
    console.error('Error processing image:', error);
    setProcessingError(error instanceof Error ? error.message : 'Failed to process image');

    if (fallbackImage) {
      setImagePreview(fallbackImage);
      setImageUrl(fallbackImage);
    }

    setIsProcessing(false);
  };

  // Update imageUrl and preview when imageData changes
  useEffect(() => {
    if (!imageData) return;

    let isMounted = true;
    setProcessingError('');

    try {
      // Validate data URL format
      if (imageData.startsWith('data:image/')) {
        setIsProcessing(true);

        // Resize the image to reduce its size
        resizeImage(imageData)
          .then((resizedImage) => {
            if (isMounted) {
              setImagePreview(resizedImage);
              setImageUrl(resizedImage);
              setIsProcessing(false);

              // Show a system message when new image context is added
              const textarea = document.getElementById('chat-input') as HTMLInputElement;
              if (textarea) {
                textarea.placeholder = `Ask about this frame at ${timestamp || 'current position'}...`;
                textarea.focus();
              }
            }
          })
          .catch((error) => {
            if (isMounted) {
              handleImageProcessingError(error, imageData);
            }
          });
      }
    } catch (error) {
      if (isMounted) {
        handleImageProcessingError(error);
      }
    }

    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
    };
  }, [imageData, timestamp]);

  // const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
  // 	const file = e.target.files?.[0];
  // 	setProcessingError("");

  // 	if (!file) return;

  // 	// Check file size
  // 	if (file.size > MAX_FILE_SIZE) {
  // 		setProcessingError(
  // 			`File too large. Maximum size is ${
  // 				MAX_FILE_SIZE / (1024 * 1024)
  // 			}MB`
  // 		);
  // 		return;
  // 	}

  // 	// Validate file type
  // 	if (!file.type.startsWith("image/")) {
  // 		setProcessingError("Only image files are allowed");
  // 		return;
  // 	}

  // 	try {
  // 		setIsProcessing(true);

  // 		const reader = new FileReader();

  // 		reader.onloadend = () => {
  // 			const result = reader.result as string;

  // 			// Validate data URL format
  // 			if (result && result.startsWith("data:image/")) {
  // 				// Resize the image
  // 				resizeImage(result)
  // 					.then((resizedImage) => {
  // 						setImagePreview(resizedImage);
  // 						setImageUrl(resizedImage);
  // 						setIsProcessing(false);
  // 					})
  // 					.catch((error) => {
  // 						handleImageProcessingError(error, result);
  // 					});
  // 			} else {
  // 				setProcessingError("Invalid image format");
  // 				setIsProcessing(false);
  // 			}
  // 		};

  // 		reader.onerror = () => {
  // 			handleImageProcessingError(new Error("Error reading file"));
  // 		};

  // 		reader.readAsDataURL(file);
  // 	} catch (error) {
  // 		handleImageProcessingError(error);
  // 	}
  // };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (isProcessing) {
      e.preventDefault();
      return;
    }

    try {
      // Clear image and errors after submission
      const currentImageUrl = imageUrl; // Save before clearing
      setImagePreview('');
      setImageUrl('');
      setProcessingError('');

      handleSubmit(e, {
        data: { imageUrl: currentImageUrl || null },
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex flex-col h-full w-full relative mx-auto">
      <p className="font-bold text-3xl mb-4 px-6 py-4">Live Chat</p>
      <div className="overflow-y-auto h-[70vh] flex flex-col gap-4 pb-20 px-6">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`whitespace-pre-wrap p-4 rounded-lg max-w-[80%] ${message.role === 'user' ? 'bg-blue-300/50 rounded-tr-none' : 'bg-gray-100 border border-gray-200 rounded-tl-none'}`}>
              {message.role === 'user' ? (
                typeof message.content === 'string' ? (
                  <div className="text-sm">{message.content}</div>
                ) : (
                  message.parts.map((part, i) => {
                    if (part.type === 'text') {
                      return (
                        <div key={`${message.id}-${i}`} className="text-sm">
                          {(part as { text: string }).text}
                        </div>
                      );
                    }
                    return null;
                  })
                )
              ) : (
                <div className="text-sm leading-relaxed prose prose-sm max-w-none 
                  prose-pre:bg-gray-800 prose-pre:text-gray-100 
                  prose-headings:my-1 prose-headings:font-semibold
                  prose-p:my-1 prose-p:leading-relaxed
                  prose-ul:my-1 prose-ol:my-1
                  prose-li:my-0 prose-li:leading-relaxed
                  prose-code:text-xs prose-code:px-1 prose-code:py-0.5
                  prose-strong:font-semibold
                  [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
                  [&_.katex]:text-sm [&_.katex-display]:my-2">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      p: ({ children }) => <p className="my-1">{children}</p>,
                      h1: ({ children }) => <h1 className="text-lg font-bold my-1">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-base font-bold my-1">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-sm font-bold my-1">{children}</h3>,
                      ul: ({ children }) => <ul className="list-disc list-inside my-1 space-y-0.5">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside my-1 space-y-0.5">{children}</ol>,
                      li: ({ children }) => <li className="my-0">{children}</li>,
                      blockquote: ({ children }) => <blockquote className="border-l-2 border-gray-300 pl-3 my-1">{children}</blockquote>,
                      code: ({ className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                          <pre className="bg-gray-800 text-gray-100 p-2 rounded text-xs overflow-x-auto my-1">
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                        ) : (
                          <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-xs" {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {typeof message.content === 'string'
                      ? message.content
                      : message.parts
                          .filter((part) => part.type === 'text')
                          .map(
                            (part) =>
                              (
                                part as {
                                  text: string;
                                }
                              ).text
                          )
                          .join('\n')}
                  </ReactMarkdown>
                </div>
              )}

              {/* Handle image parts separately */}
              {typeof message.content !== 'string' &&
                message.parts.map((part, i) => {
                  if (part.type === 'file' && 'mimeType' in part && part.mimeType?.startsWith('image/')) {
                    // Handle file parts (for images)
                    const filePart = part as FilePart;
                    return (
                      <div key={`${message.id}-file-${i}`} className="mt-2">
                        <Image src={`data:${filePart.mimeType};base64,${filePart.data}`} alt="Image content" className="max-h-60 w-auto rounded-lg" width={300} height={200} style={{ width: 'auto', maxHeight: '240px' }} />
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        ))}

        {/* Enhanced skeleton loader for image processing */}
        {isLoading && imageUrl && (
          <div className="flex justify-start">
            <div className="bg-gray-100 border border-gray-200 rounded-lg rounded-tl-none p-4 w-[80%]">
              <div className="flex items-center space-x-2 mb-3">
                <div className="h-6 w-6 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded-full w-24 animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded-full w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded-full w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded-full w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded-full w-2/3 animate-pulse"></div>
              </div>
              {imageUrl && (
                <div className="mt-3 h-32 bg-gray-300 rounded-md w-3/4 animate-pulse flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              )}
            </div>
          </div>
        )}

        {processingError && <div className="text-sm text-red-500 mb-2 p-3 bg-red-50 rounded">{processingError}</div>}

        {/* Invisible div for scrolling to bottom */}
        <div ref={messagesEndRef} />
      </div>

      {imagePreview && (
        <div className="absolute bottom-[75px] left-0 w-full px-3">
          <div className="bg-blue-500/10 py-1 px-3 rounded-t-md text-xs flex items-center gap-1 border-t border-x border-blue-200 max-w-fit mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Seeing {timestamp || 'current frame'}
          </div>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="w-full absolute bottom-0 p-3 bg-white border-t">
        <div className="flex gap-2">
          <input id="chat-input" className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={input} placeholder={isProcessing ? 'Processing image...' : imagePreview ? `Ask about video at ${timestamp || 'current position'}...` : 'Type a message...'} onChange={handleInputChange} disabled={isProcessing} />
          <button type="submit" className="p-3 px-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading || isProcessing || (!input.trim() && !imageUrl)}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
        {isProcessing && (
          <div className="flex items-center justify-center mt-2 space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            <span className="text-xs text-blue-500 ml-2">Processing image...</span>
          </div>
        )}
      </form>
    </div>
  );
}
