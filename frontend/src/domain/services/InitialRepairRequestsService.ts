import { initialRepairRequestsGateway } from "../../dataAccess/gateways/InitialRepairRequestsGateway";
import type { InitialRepairRequest } from "../entities/InitialRepairRequest";
import type { WorkImpact } from "../valueObjects/WorkImpact";

export class InitialRepairRequestsService {
  async getAll(): Promise<InitialRepairRequest[]> {
    return initialRepairRequestsGateway.getAll();
  }

   async create(workImpact: WorkImpact): Promise<void> {
    return initialRepairRequestsGateway.create(workImpact);
  }
}

export const initialRepairRequestsService =
  new InitialRepairRequestsService();