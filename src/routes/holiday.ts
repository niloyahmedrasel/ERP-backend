import express from "express";
import { HolidayController } from "../controller/holiday";
import validate from "../middleware/validate";
import holidaySchema from "../validation/holiday";

const router = express.Router();

router.post("/create",validate(holidaySchema), new HolidayController().createHoliday);
router.get("/", new HolidayController().getHolidays);
router.put("/update/:id",validate(holidaySchema), new HolidayController().updateHoliday);
router.delete("/:id", new HolidayController().deleteHoliday);

export default router;