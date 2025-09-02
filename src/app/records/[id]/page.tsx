"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigation } from "@/hooks/useNavigation";
import { Header } from "@/components/ui/common/molecules/Header";
import {
  MapPin,
  Clock,
  Calendar,
  Trash2,
  DollarSign,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share,
  FileText,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { LoadingSpinner } from "@/components/ui/common/atoms/LoadingSpinner";
import { StarRating } from "@/components/ui/common/atoms/StarRating";
import { useState } from "react";

export default function RecordDetailPage() {
  const { activeTab, changeTab } = useNavigation("records");
  const router = useRouter();
  const params = useParams();
  const recordId = parseInt(params.id as string);
  const [isDeleting, setIsDeleting] = useState(false);

  const record = useLiveQuery(() => db.foodRecords.get(recordId), [recordId]);

  const handleDelete = async () => {
    if (!record) return;

    const confirmed = window.confirm(
      `"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigation } from "@/hooks/useNavigation";
import { Header } from "@/components/ui/common/molecules/Header";
import { FileText } from "lucide-react";
import { useParams } from "next/navigation";
import { RecordDetailContainer } from "@/components/ui/records/organisms";

export default function RecordDetailPage() {
  const { activeTab, changeTab } = useNavigation("records");
  const params = useParams();
  const recordId = parseInt(params.id as string);

  return (
    <MainLayout activeTab={activeTab} onTabChange={changeTab}>
      <Header
        title="기록"
        subtitle="음식 기록 상세 정보"
        icon={<FileText className="w-6 h-6" />}
      />

      <div className="w-full py-4">
        <RecordDetailContainer recordId={recordId} />
      </div>
    </MainLayout>
  );
}`
    );

    if (confirmed) {
      setIsDeleting(true);
      try {
        await db.foodRecords.delete(recordId);
        router.push("/records");
      } catch (error) {
        console.error("기록 삭제 실패:", error);
        alert("기록을 삭제하는 중 오류가 발생했습니다.");
        setIsDeleting(false);
      }
    }
  };

  if (!record && record !== undefined) {
    return (
      <MainLayout activeTab={activeTab} onTabChange={changeTab}>
        <Header title="기록을 찾을 수 없습니다" />
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500">해당 기록을 찾을 수 없습니다.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout activeTab={activeTab} onTabChange={changeTab}>
      <Header
        title="기록"
        subtitle="음식 기록 상세 정보"
        icon={<FileText className="w-6 h-6" />}
      />

      <div className="w-full py-4">
        {!record ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner message="기록을 불러오는 중입니다..." />
          </div>
        ) : (
          <div className="bg-white">
            {/* 인스타그램 스타일 포스트 */}
            <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {/* 헤더 - 위치 정보 */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {record.restaurantName}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {record.location.address}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                  >
                    <MoreHorizontal className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* 이미지 */}
              {record.photo ? (
                <div className="relative bg-black">
                  <img
                    src={record.photo}
                    alt={record.foodName}
                    className="w-full h-80 object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🍽️</span>
                    </div>
                    <p className="text-sm">사진이 없습니다</p>
                  </div>
                </div>
              )}

              {/* 액션 버튼들 */}
              <div className="flex items-center justify-between p-4">
                <div className="flex space-x-4">
                  <Heart className="w-6 h-6 text-gray-600 hover:text-red-500 cursor-pointer transition-colors" />
                  <MessageCircle className="w-6 h-6 text-gray-600 hover:text-blue-500 cursor-pointer transition-colors" />
                  <Share className="w-6 h-6 text-gray-600 hover:text-green-500 cursor-pointer transition-colors" />
                </div>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-red-500 hover:text-red-600 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* 컨텐츠 */}
              <div className="px-4 pb-4">
                {/* 음식명과 평점 */}
                <div className="mb-3">
                  <h1 className="font-bold text-lg text-gray-900 mb-1">
                    {record.foodName}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <StarRating rating={record.rating} size="sm" />
                    <span className="text-sm font-semibold text-gray-700">
                      {record.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* 리뷰 */}
                {record.review && (
                  <div className="mb-3">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      <span className="font-semibold text-gray-900">나</span>{" "}
                      {record.review}
                    </p>
                  </div>
                )}

                {/* 메타 정보 */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {record.category && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700 font-medium">
                      {record.category}
                    </span>
                  )}
                  {record.tags &&
                    record.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
                      >
                        #{tag}
                      </span>
                    ))}
                </div>

                {/* 날짜, 시간, 가격 */}
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{record.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{record.time}</span>
                  </div>
                  {record.price && (
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-3 h-3" />
                      <span>{record.price.toLocaleString()}원</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
