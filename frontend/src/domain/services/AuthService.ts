import { authGateway } from "../../dataAccess/gateways/AuthGateway";
import type { AuthSession } from "../entities/AuthSession";

export class AuthService {
  async login(email: string, password: string): Promise<AuthSession> {
    const session = await authGateway.login(email, password);

    localStorage.setItem("accessToken", session.accessToken.toString());

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: session.user.id,
        name: session.user.name,
        role: session.user.role,
      })
    );

    return session;
  }
}

export const authService = new AuthService();