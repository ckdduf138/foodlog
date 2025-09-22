import Dexie, { Table } from "dexie";
import { FoodRecord, SearchKeyword, UserSettings } from "@/types";

export class FoodLogDB extends Dexie {
  foodRecords!: Table<FoodRecord>;
  searchKeywords!: Table<SearchKeyword>;
  userSettings!: Table<UserSettings>;

  constructor() {
    super("FoodLogDB");

    this.version(1).stores({
      foodRecords:
        "++id, date, restaurantName, foodName, rating, category, createdAt",
      searchKeywords: "++id, keyword, count, lastUsed",
      userSettings: "++id, updatedAt",
    });

    // 데이터 변환 훅 (필요시 확장)

    this.foodRecords.hook("creating", (_primKey, obj, _trans) => {
      // mark unused params to satisfy linters
      void _primKey;
      void _trans;
      obj.createdAt = new Date();
      obj.updatedAt = new Date();
    });

    this.foodRecords.hook(
      "updating",
      (modifications, _primKey, _obj, _trans) => {
        // mark unused params to satisfy linters
        void _primKey;
        void _obj;
        void _trans;
        const mods = modifications as Partial<FoodRecord>;
        mods.updatedAt = new Date();
      }
    );
  }
}

export const db = new FoodLogDB();

// 기본 설정 초기화
export const initializeDefaultSettings = async () => {
  const existingSettings = await db.userSettings.count();

  if (existingSettings === 0) {
    await db.userSettings.add({
      notifications: {
        mealReminders: true,
        weeklyReports: true,
      },
      privacy: {
        shareLocation: true,
        sharePhotos: true,
      },
      display: {
        theme: "light",
        language: "ko",
      },
      backup: {
        autoBackup: false,
        backupFrequency: "weekly",
      },
      updatedAt: new Date(),
    });
  }
};
