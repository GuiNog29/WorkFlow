export interface IEmployer {
  readonly id: number;
  companyName: string;
  readonly cnpj: string;
  email: string;
  password: string;
  profile_picture?: string;
  readonly created_at: Date;
  readonly updated_at: Date;
  getProfilePictureUrl(): string | null;
}
