export interface ICandidate {
  readonly id: number;
  name: string;
  readonly cpf: string;
  email: string;
  password: string;
  profile_picture?: string;
  readonly created_at: Date;
  readonly updated_at: Date;
  getProfilePictureUrl(): string | null;
}
