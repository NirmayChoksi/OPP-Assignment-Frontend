export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorDetails {
  timestamp: string | null;
  status: number;
  error: string;
  message: string;
  path: string;
  errors: Record<string, string> | null;
}
