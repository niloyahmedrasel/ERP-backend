import express from "express";
import { TransactionController } from "../controller/transection";
import validate from "../middleware/validate";
import transactionValidationSchema from "../validation/transection";
import authenticateToken from "../middleware/auth";

const router = express.Router();

router.post("/",authenticateToken,validate(transactionValidationSchema), new TransactionController().createTransaction);
router.get("/", authenticateToken, new TransactionController().getTransactions);
router.get("/:id",authenticateToken,new TransactionController().getTransactionById);
router.put("/:id",authenticateToken,new TransactionController().updateTransaction);
router.delete("/:id",authenticateToken,new TransactionController().deleteTransaction);
router.get("/type/:transaction-types",authenticateToken,new TransactionController().getTransectionByType);
router.post("/transaction-categorys",authenticateToken,new TransactionController().createTransectionCategory);
router.get("/all/transaction-categorys",authenticateToken,new TransactionController().getTransectionCategory);

export default router;
