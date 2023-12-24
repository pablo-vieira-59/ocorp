import { Batch } from "./Batch";
import { BatchStatus } from "./BatchStatus";
import { User } from "./User";

export interface BatchHistory {
    id :number,
    batchId : number,
    userId :number,
    batchStatusIdFrom :number,
    batchStatusIdTo :number,
    message :string,
    createdAt :Date,

    batch :Batch,
    toStatus : BatchStatus,
    user : User
}