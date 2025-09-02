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
