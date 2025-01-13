import { ITransectionCategory } from "../model/interface/transectionCategory";
import { baseRepository } from "./baseRepository";
import TransactionCategoryModel from "../model/transectionCategory";

export class TransectionCategoryRepository extends baseRepository<ITransectionCategory>{
    constructor(){
        super(TransactionCategoryModel)
    }
}