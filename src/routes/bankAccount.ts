import express from "express";
import { BankAccountController } from "../controller/bankAccount";
import validate from "../middleware/validate";
import bankAccountSchema from "../validation/bankAccount";
import authenticateToken from "../middleware/auth";


const router = express.Router();

router.post("/",authenticateToken, validate(bankAccountSchema), new BankAccountController().createAccount);
router.get("/:accountId",authenticateToken, new BankAccountController().getAccount);
router.get("/",authenticateToken, new BankAccountController().getAllBankAccount);
router.put("/:accountId",authenticateToken, validate(bankAccountSchema), new BankAccountController().updateAccount);
router.delete("/:accountId",authenticateToken, new BankAccountController().deleteAccount);

export default router;