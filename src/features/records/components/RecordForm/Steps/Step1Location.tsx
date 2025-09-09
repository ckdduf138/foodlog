import React from "react";
import { FoodRecordFormData, PlaceSelect } from "@/features/records/types";
import { MapSearch } from "@/features/records/components";
import { LocationCard } from "./components";

interface Step1LocationProps {
  formData: FoodRecordFormData;
  onPlaceSelect: (place: PlaceSelect) => void;
}

export const Step1Location: React.FC<Step1LocationProps> = ({
  formData,
  onPlaceSelect,
}) => {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl overflow-hidden">
        <MapSearch onPlaceSelect={onPlaceSelect} />
      </div>

      <LocationCard formData={formData} />
    </div>
  );
};
