export interface CommonState {
  loading: boolean;
  errors: boolean | AppError;
}

export interface AppError {
  messages: string[]
}
