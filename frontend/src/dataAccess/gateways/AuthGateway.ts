import axios from "axios";
import type { LoginResponseDto } from "../dtos/AuthDto";
import { User } from "../../domain/entities/User";
import { AccessToken } from "../../domain/valueObjects/AccessToken";
import  { AuthSession } from "../../domain/entities/AuthSession";

export class AuthGateway {
  private readonly API_BASE_URL = "http://localhost:3000";

  async login(email: string, password: string): Promise<AuthSession> {
    try {
      const { data } = await axios.post<LoginResponseDto>(
        `${this.API_BASE_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      const accessToken = new AccessToken(data.accessToken);

      const user = new User(
        data.user.id,
        data.user.name,
        data.user.role
      );

      return new AuthSession(accessToken, user);
    } catch {
      throw new Error("Failed to login");
    }
  }
}

export const authGateway = new AuthGateway();