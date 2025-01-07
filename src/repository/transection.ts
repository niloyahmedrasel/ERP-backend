import { baseRepository } from "./baseRepository";
import Transaction from "../model/transection";
import { ITransaction } from "../model/interface/transection";

export class TransactionRepository extends baseRepository<ITransaction> {
    constructor() {
        super(Transaction);
    }
}
