export interface ICandidate {
  id: number;
  name: string;
  cpf: string;
  email: string;
  password: string;
  profile_picture: string;
  created_at: Date;
  updated_at: Date;
  getProfilePictureUrl(): string | null;
}
