import express from "express";
import { HolidayController } from "../controller/holiday";
import validate from "../middleware/validate";
import holidaySchema from "../validation/holiday";
import authenticateToken from "../middleware/auth";

const router = express.Router();

router.post("/create",authenticateToken, validate(holidaySchema), new HolidayController().createHoliday);
router.get("/",authenticateToken, new HolidayController().getHolidays);
router.put("/update/:id",authenticateToken, validate(holidaySchema), new HolidayController().updateHoliday);
router.delete("/:id",authenticateToken, new HolidayController().deleteHoliday);

export default router;