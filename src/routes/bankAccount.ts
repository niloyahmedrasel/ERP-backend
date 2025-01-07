import express from "express";
import { BankAccountController } from "../controller/bankAccount";
import validate from "../middleware/validate";
import bankAccountSchema from "../validation/bankAccount";


const router = express.Router();

router.post("/create",validate(bankAccountSchema), new BankAccountController().createAccount);
router.get("/:accountNumber", new BankAccountController().getAccount);
router.put("/update/:accountNumber",validate(bankAccountSchema), new BankAccountController().updateAccount);
router.delete("/:accountNumber", new BankAccountController().deleteAccount);

export default router;