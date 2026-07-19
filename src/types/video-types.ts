export interface VideoDataType {
	id: number;
	title: string;
	prompt: string;
	video_url: string;
	thumbnail_url?: string;
	subject: string;
	user_id: string;
	created_at: string;
	updated_at?: string;
	is_ready: boolean;
	progress?: number;
	message?: string;
}

export interface SubjectOption {
  label: string;
  value: string;
  [key: string]: string; // Add index signature to match Option type
}
