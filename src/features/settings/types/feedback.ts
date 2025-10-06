export type FeedbackType = 'bug' | 'feature' | 'other';

export interface FeedbackFormData {
  type: FeedbackType;
  message: string;
  email?: string;
}

export interface FeedbackResponse {
  success: boolean;
  message: string;
  error?: string;
}
