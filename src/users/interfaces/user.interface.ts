export interface IUser {
  id: number;
  email: string;
  name: string;
}

export interface IUserCreate {
  email: string;
  password: string;
  name: string;
}

export interface IUserProfile {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  refreshToken?: string;
}