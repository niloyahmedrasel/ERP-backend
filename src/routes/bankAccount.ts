import express from "express";
import { BankAccountController } from "../controller/bankAccount";
import validate from "../middleware/validate";
import bankAccountSchema from "../validation/bankAccount";
import authenticateToken from "../middleware/auth";


const router = express.Router();

router.post("/create",authenticateToken, validate(bankAccountSchema), new BankAccountController().createAccount);
router.get("/:accountNumber",authenticateToken, new BankAccountController().getAccount);
router.put("/update/:accountNumber",authenticateToken, validate(bankAccountSchema), new BankAccountController().updateAccount);
router.delete("/:accountNumber",authenticateToken, new BankAccountController().deleteAccount);

export default router;