import express from "express";
import { TransactionController } from "../controller/transection";
import validate from "../middleware/validate";
import transactionValidationSchema from "../validation/transection";

const router = express.Router();

router.post("/create",validate(transactionValidationSchema), new TransactionController().createTransaction);
router.get("/", new TransactionController().getTransactions);
router.get("/:id", new TransactionController().getTransactionById);
router.put("/update/:id",validate(transactionValidationSchema), new TransactionController().updateTransaction);
router.delete("/:id", new TransactionController().deleteTransaction);

export default router;