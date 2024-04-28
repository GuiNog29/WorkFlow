export interface IUserToken {
  token: string;
  readonly userId: number;
  readonly created_at: Date;
  readonly updated_at: Date;
  userType: number;
}
