import { IHoliday } from "../model/interface/holiday";
import { HolidayRepository } from "../repository/holiday";
import { AppError } from "../utils/appError";

const holidayRepository = new HolidayRepository();

export class HolidayService {

  async createHoliday(name: string, date: Date, description: string): Promise<IHoliday> {
    const holiday = await holidayRepository.create({ name, date, description });
    if (!holiday) {
      throw new AppError("Holiday creation failed",500);
    }
    return holiday;
  }

  async getHolidays(): Promise<IHoliday[]> {
    return await holidayRepository.find({});
  }

  async getHolidayById(id: string): Promise<IHoliday> {
    const holiday = await holidayRepository.findOne({ _id: id });
    if (!holiday) {
      throw new AppError("Holiday not found",200);
    }
    return holiday;
  }

  async updateHoliday(id: string, name: string, date: Date, description: string): Promise<IHoliday> {
    const holiday = await holidayRepository.findOneAndUpdate({ _id: id }, { name, date, description });
    if (!holiday) {
      throw new AppError("Holiday update failed",500);
    }
    return holiday;
  }

  async deleteHoliday(id: string): Promise<void> {
    const result = await holidayRepository.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new AppError("Holiday deletion failed",500);
    }
  }
}
