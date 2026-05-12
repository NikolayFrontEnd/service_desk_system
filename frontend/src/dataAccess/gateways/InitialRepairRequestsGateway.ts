import axios from "axios";
import type { InitialRepairRequestsResponseDto } from "../dtos/InitialRepairRequestsDto";
import { InitialRepairRequest } from "../../domain/entities/InitialRepairRequest";

export class InitialRepairRequestsGateway {
  private readonly API_BASE_URL = "http://localhost:3000";

  async getAll(): Promise<InitialRepairRequest[]> {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const { data } = await axios.get<InitialRepairRequestsResponseDto>(
        `${this.API_BASE_URL}/initial-repair-requests`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return data.requests.map(
        (request) =>
          new InitialRepairRequest(
            request.id,
            request.department,
            request.floor,
            request.room,
            request.workImpact
          )
      );
    } catch {
      throw new Error("Failed to load initial repair requests");
    }
  }
}

export const initialRepairRequestsGateway =
  new InitialRepairRequestsGateway();