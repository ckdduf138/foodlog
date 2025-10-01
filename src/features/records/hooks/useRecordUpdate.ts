import { useCallback } from "react";
import { db } from "@/shared/lib/db";
import type { FoodRecord } from "@/features/records/types";

export const useRecordUpdate = (record: FoodRecord | null, onUpdate?: () => void) => {
  const updateField = useCallback(
    async (field: keyof FoodRecord, value: any) => {
      if (!record?.id) {
        throw new Error("기록 ID가 없습니다.");
      }

      try {
        await db.foodRecords.update(record.id, {
          [field]: value,
        });

        if (onUpdate) {
          onUpdate();
        }
      } catch (error) {
        throw new Error(`${field} 업데이트 실패`);
      }
    },
    [record, onUpdate]
  );

  const updateRestaurantName = useCallback(
    async (restaurantName: string) => {
      await updateField("restaurantName", restaurantName);
    },
    [updateField]
  );

  const updateFoodName = useCallback(
    async (foodName: string) => {
      await updateField("foodName", foodName);
    },
    [updateField]
  );

  const updateReview = useCallback(
    async (review: string) => {
      await updateField("review", review);
    },
    [updateField]
  );

  const updateRating = useCallback(
    async (rating: number) => {
      await updateField("rating", rating);
    },
    [updateField]
  );

  const updatePhoto = useCallback(
    async (photo: string | File | undefined) => {
      await updateField("photo", photo);
    },
    [updateField]
  );

  const updateCategory = useCallback(
    async (category: string) => {
      await updateField("category", category);
    },
    [updateField]
  );

  const updatePrice = useCallback(
    async (price: number | undefined) => {
      await updateField("price", price);
    },
    [updateField]
  );

  const updateLocation = useCallback(
    async (location: Partial<FoodRecord["location"]>) => {
      if (!record) return;
      await updateField("location", { ...record.location, ...location });
    },
    [updateField, record]
  );

  return {
    updateRestaurantName,
    updateFoodName,
    updateReview,
    updateRating,
    updatePhoto,
    updateCategory,
    updatePrice,
    updateLocation,
  };
};
