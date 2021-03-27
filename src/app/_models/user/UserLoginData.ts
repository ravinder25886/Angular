import { BaseResponse } from '../BaseResponse';

export class UserLoginData {
  role: string;
  token: string;
}
export class UserLoginResponse extends BaseResponse {
  data: UserLoginData;
}
