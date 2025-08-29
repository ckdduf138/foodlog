import Dexie, { Table } from "dexie";

// 타입을 별도 파일에서 import
export interface FoodRecord {
  id?: number;
  date: string; // YYYY-MM-DD 형식
  time: string; // HH:MM 형식
  restaurantName: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
    placeId?: string; // 카카오 맵 장소 ID
    placeName?: string; // 카카오 맵 장소명
  };
  foodName: string;
  category?: string; // 음식 카테고리
  rating: number; // 1-5 별점
  review: string; // 한줄평
  photo?: string; // base64 이미지 데이터 또는 URL
  tags?: string[]; // 태그 배열
  price?: number; // 가격 정보
  createdAt: Date;
  updatedAt: Date;
}

// 검색 키워드 인터페이스
export interface SearchKeyword {
  id?: number;
  keyword: string;
  count: number; // 사용 횟수
  lastUsed: Date;
}

// 사용자 설정 인터페이스
export interface UserSettings {
  id?: number;
  notifications: {
    mealReminders: boolean;
    weeklyReports: boolean;
  };
  privacy: {
    shareLocation: boolean;
    sharePhotos: boolean;
  };
  display: {
    theme: "light" | "dark" | "system";
    language: "ko" | "en";
  };
  backup: {
    autoBackup: boolean;
    backupFrequency: "daily" | "weekly" | "monthly";
  };
  updatedAt: Date;
}

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
