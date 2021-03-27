export class BaseResponse {
  isSuccess: boolean;
  statusCode: number;
  message: string;
  customErrorMessage: string;
  originalException: string;
  errors: string[]
}
