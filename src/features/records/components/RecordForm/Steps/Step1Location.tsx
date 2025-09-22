import React from "react";
import { FoodRecordFormData, PlaceSelect } from "@/features/records/types";
import { PlaceSearch } from "@/features/records/components";
import { LocationCard} from "./components";

interface Step1LocationProps {
  formData: FoodRecordFormData;
  onPlaceSelect: (place: PlaceSelect) => void;
}

export const Step1Location: React.FC<Step1LocationProps> = ({
  formData,
  onPlaceSelect,
}) => {
  return (
    <div className="space-y-2">
      <div className="rounded-2xl overflow-visible">
        <PlaceSearch onPlaceSelect={onPlaceSelect} />
      </div>

      <LocationCard formData={formData} />
    </div>
  );
};
