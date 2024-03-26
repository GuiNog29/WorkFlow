export interface IEmployer {
  id: number;
  companyName: string;
  cnpj: string;
  email: string;
  password: string;
  profile_picture: string;
  created_at: Date;
  updated_at: Date;
  getProfilePictureUrl(): string | null;
}
