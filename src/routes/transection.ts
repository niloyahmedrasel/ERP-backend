import express from "express";
import { TransactionController } from "../controller/transection";
import validate from "../middleware/validate";
import transactionValidationSchema from "../validation/transection";
import authenticateToken from "../middleware/auth";

const router = express.Router();

router.post("/create",authenticateToken, validate(transactionValidationSchema), new TransactionController().createTransaction);
router.get("/",authenticateToken, new TransactionController().getTransactions);
router.get("/:id",authenticateToken, new TransactionController().getTransactionById);
router.put("/update/:id",authenticateToken, validate(transactionValidationSchema), new TransactionController().updateTransaction);
router.delete("/:id",authenticateToken, new TransactionController().deleteTransaction);
router.get("/type/:transactionType",authenticateToken, new TransactionController().getTransectionByType);
router.post("/transectionCategory",authenticateToken, new TransactionController().createTransectionCategory);
router.get("/transectionCategory/:transectionType",authenticateToken, new TransactionController().getTransectionCategory);

export default router;