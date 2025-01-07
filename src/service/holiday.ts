import { IHoliday } from "../model/interface/holiday";
import { HolidayRepository } from "../repository/holiday";

const holidayRepository = new HolidayRepository();

export class HolidayService {

  async createHoliday(name: string, date: Date, description: string): Promise<IHoliday> {
    try {
      const holiday = await holidayRepository.create({ name, date, description });
      if (!holiday) {
        throw new Error("Holiday creation failed");
      }
      return holiday;
    } catch (error) {
      throw new Error("Error creating holiday");
    }
  }

  async getHolidays(): Promise<IHoliday[]> {
    try {
      return await holidayRepository.find({});
    } catch (error) {
      throw new Error("Error fetching holidays");
    }
  }

  async updateHoliday(id: string, name: string, date: Date, description: string): Promise<IHoliday> {
    try {
      const holiday = await holidayRepository.findOneAndUpdate({ _id: id }, { name, date, description });
      if (!holiday) {
        throw new Error("Holiday update failed");
      }
      return holiday;
    } catch (error) {
      throw new Error("Error updating holiday");
    }
  }

  async deleteHoliday(id: string): Promise<void> {
    try {
      await holidayRepository.deleteOne({ _id: id });
    } catch (error) {
      throw new Error("Error deleting holiday");
    }
  }
}
