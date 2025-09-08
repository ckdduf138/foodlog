import React from "react";
import { FoodRecordFormData } from "@/types";
import MapSearch from "@/components/ui/records/organisms/places/MapSearch";
import { PlaceSelect } from "@/components/ui/records/organisms/places/PlaceSearch";
import { MapPin } from "lucide-react";

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

      {formData.location.placeName && (
        <div
          className="rounded-2xl p-3 border"
          style={{
            backgroundColor: "var(--color-background)",
            borderColor: "var(--color-green-200)",
          }}
        >
          <div className="flex items-center space-x-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--color-green-500)" }}
            >
              <MapPin className="w-4 h-4 text-black" />
            </div>
            <div className="flex-1">
              <p
                className="font-semibold"
                style={{ color: "var(--color-foreground)" }}
              >
                {formData.location.placeName}
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                {formData.location.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
