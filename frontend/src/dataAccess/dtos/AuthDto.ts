export type LoginResponseDto = {
  message: string;
  accessToken: string;
  user: {
    id: number;
    name: string;
    role: string;
  };
};