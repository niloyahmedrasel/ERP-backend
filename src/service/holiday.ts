import { IHoliday } from "../model/interface/holiday";
import { HolidayRepository } from "../repository/holiday";

const holidayRepository = new HolidayRepository();

export class HolidayService {

  async createHoliday(name: string, date: Date, description: string): Promise<IHoliday> {
    const holiday = await holidayRepository.create({ name, date, description });
    if (!holiday) {
      throw new Error("Holiday creation failed");
    }
    return holiday;
  }

  async getHolidays(): Promise<IHoliday[]> {
    return await holidayRepository.find({});
  }

  async updateHoliday(id: string, name: string, date: Date, description: string): Promise<IHoliday> {
    const holiday = await holidayRepository.findOneAndUpdate({ _id: id }, { name, date, description });
    if (!holiday) {
      throw new Error("Holiday update failed");
    }
    return holiday;
  }

  async deleteHoliday(id: string): Promise<void> {
    const result = await holidayRepository.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new Error("Holiday deletion failed");
    }
  }
}
