"use client";

import { useState } from "react";
import { FoodRecord } from "@/types";
import { StarRating } from "@/components/ui/common/atoms/StarRating";
import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  MoreHorizontal,
} from "lucide-react";

interface RecordDetailContentProps {
  record: FoodRecord;
  onEdit: () => void;
  onDelete: () => void;
}

export const RecordDetailContent = ({
  record,
  onEdit,
  onDelete,
}: RecordDetailContentProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold">{record.restaurantName}</h2>
          <p className="text-gray-500">{record.location.address}</p>
        </div>
        <div className="flex items-center gap-4">
          <StarRating rating={record.rating} />
          <div className="relative">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <MoreHorizontal className="w-6 h-6" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-[-10] w-16 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onEdit();
                      setIsMenuOpen(false);
                    }}
                    className="flex justify-center items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => {
                      onDelete();
                      setIsMenuOpen(false);
                    }}
                    className="flex justify-center items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-lg font-semibold">"{record.foodName}"</p>
        <p className="text-gray-600 mt-2">{record.review}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(record.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          <span>{record.time}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-4 h-4 mr-2" />
          <span>
            {record.price
              ? `${record.price.toLocaleString()}원`
              : "가격 정보 없음"}
          </span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{record.category}</span>
        </div>
      </div>
    </div>
  );
};
