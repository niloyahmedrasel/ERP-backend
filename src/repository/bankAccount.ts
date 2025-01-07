import { baseRepository } from "./baseRepository";
import BankAccount from "../model/bankAccount";
import { IBankAccount } from "../model/interface/bankAccount";

export class BankAccountRepository extends baseRepository<IBankAccount>{
    constructor(){
        super(BankAccount)
    }
}