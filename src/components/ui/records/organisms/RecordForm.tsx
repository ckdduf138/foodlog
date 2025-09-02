"use client";

import React from "react";
import MapSearch from "../places/MapSearch";
import { PlaceSelect } from "../places/PlaceSearch";
import { FoodRecordFormData } from "@/types";

interface RecordFormProps {
  formData: FoodRecordFormData;
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onRatingChange: (rating: number) => void;
  onPlaceSelect: (place: PlaceSelect) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  error: string | null;
  isEditMode: boolean;
}

export const RecordForm = ({
  formData,
  onFormChange,
  onRatingChange,
  onPlaceSelect,
  onSubmit,
  onCancel,
  isSubmitting,
  error,
  isEditMode,
}: RecordFormProps) => {
  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto space-y-4">
      <div>
        <label className="text-sm">위치 *</label>
        <MapSearch onPlaceSelect={onPlaceSelect} />
      </div>

      <label className="flex flex-col text-sm">
        음식명 *
        <input
          name="foodName"
          value={formData.foodName}
          onChange={onFormChange}
          className="mt-1 p-2 border rounded"
          required
        />
      </label>

      <div className="grid grid-cols-2 gap-2">
        <label className="flex flex-col text-sm">
          평점 (0-5) *
          <input
            type="number"
            name="rating"
            min={0}
            max={5}
            value={formData.rating}
            onChange={(e) => onRatingChange(Number(e.target.value))}
            className="mt-1 p-2 border rounded"
            required
          />
        </label>
        <label className="flex flex-col text-sm">
          가격
          <input
            type="number"
            name="price"
            value={formData.price ?? ""}
            onChange={onFormChange}
            className="mt-1 p-2 border rounded"
          />
        </label>
      </div>

      <label className="flex flex-col text-sm">
        리뷰
        <textarea
          name="review"
          value={formData.review}
          onChange={onFormChange}
          className="mt-1 p-2 border rounded"
          rows={4}
        />
      </label>

      <label className="flex flex-col text-sm">
        음식 사진
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={onFormChange}
          className="mt-1 p-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
        />
      </label>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded border"
        >
          취소
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-green-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? isEditMode
              ? "수정 중..."
              : "저장 중..."
            : isEditMode
            ? "수정"
            : "저장"}
        </button>
      </div>
    </form>
  );
};
