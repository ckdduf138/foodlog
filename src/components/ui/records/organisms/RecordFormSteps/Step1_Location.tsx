import React from "react";
import { FoodRecordFormData } from "@/types";
import MapSearch from "@/components/ui/records/places/MapSearch";
import { PlaceSelect } from "@/components/ui/records/places/PlaceSearch";
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
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-3 border border-blue-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                {formData.location.placeName}
              </p>
              <p className="text-sm text-gray-600">
                {formData.location.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
