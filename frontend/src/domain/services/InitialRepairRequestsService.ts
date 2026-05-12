import { initialRepairRequestsGateway } from "../../dataAccess/gateways/InitialRepairRequestsGateway";
import type { InitialRepairRequest } from "../entities/InitialRepairRequest";

export class InitialRepairRequestsService {
  async getAll(): Promise<InitialRepairRequest[]> {
    return initialRepairRequestsGateway.getAll();
  }
}

export const initialRepairRequestsService =
  new InitialRepairRequestsService();