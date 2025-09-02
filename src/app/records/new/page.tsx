"use client";

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
  Suspense,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { Header } from "@/components/ui/common/molecules/Header";
import { useFoodRecords } from "@/hooks";
import { useNavigation } from "@/hooks/useNavigation";
import { FilePlus, Edit } from "lucide-react";
import PlaceSearch from "@/components/ui/records/places/PlaceSearch";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";

function NewRecordPageContent() {
  const { activeTab, changeTab } = useNavigation("records");
  const { actions } = useFoodRecords();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 편집 모드 확인
  const isEditMode = searchParams.get("edit") === "true";
  const editRecordId = searchParams.get("id");

  // 편집할 기록 데이터 불러오기
  const editRecord = useLiveQuery(
    () =>
      editRecordId ? db.foodRecords.get(parseInt(editRecordId)) : undefined,
    [editRecordId]
  );

  const today = useMemo(() => new Date(), []);
  const pad = (n: number) => String(n).padStart(2, "0");
  const defaultDate = `${today.getFullYear()}-${pad(
    today.getMonth() + 1
  )}-${pad(today.getDate())}`;
  const defaultTime = `${pad(today.getHours())}:${pad(today.getMinutes())}`;

  // minimal state to avoid re-renders; group form state in a ref where possible
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState(defaultTime);
  const [restaurantName, setRestaurantName] = useState("");
  const [foodName, setFoodName] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");
  const [price, setPrice] = useState<number | "">("");

  // 편집 모드일 때 기존 데이터로 폼 초기화
  useEffect(() => {
    if (isEditMode && editRecord) {
      setDate(editRecord.date);
      setTime(editRecord.time);
      setRestaurantName(editRecord.restaurantName);
      setFoodName(editRecord.foodName);
      setCategory(editRecord.category || "");
      setRating(editRecord.rating);
      setReview(editRecord.review);
      setPrice(editRecord.price || "");

      // 위치 정보 설정
      locationRef.current = {
        address: editRecord.location.address,
        latitude: editRecord.location.latitude,
        longitude: editRecord.location.longitude,
        placeId: editRecord.location.placeId,
        placeName: editRecord.location.placeName,
      };
    }
  }, [isEditMode, editRecord]);

  const locationRef = useRef<{
    address?: string;
    latitude?: number;
    longitude?: number;
    placeId?: string;
    placeName?: string;
  }>({});

  const [submitting, setSubmitting] = useState(false);
  const [recordError, setRecordError] = useState<string | null>(null);

  const onPlaceSelect = useCallback(
    (place: {
      placeId?: string;
      placeName?: string;
      address?: string;
      latitude?: number;
      longitude?: number;
    }) => {
      locationRef.current = {
        placeId: place.placeId,
        placeName: place.placeName,
        address: place.address,
        latitude: place.latitude,
        longitude: place.longitude,
      };
      if (place.placeName) setRestaurantName(place.placeName);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      setRecordError(null);

      try {
        const recordData = {
          date,
          time,
          restaurantName: restaurantName || "",
          location: {
            address: locationRef.current.address || "",
            latitude: locationRef.current.latitude ?? 0,
            longitude: locationRef.current.longitude ?? 0,
            placeId: locationRef.current.placeId,
            placeName: locationRef.current.placeName,
          },
          foodName: foodName || "",
          category: category || "",
          rating: Number(rating) || 0,
          review: review || "",
          price: price === "" ? undefined : Number(price),
        };

        if (isEditMode && editRecordId) {
          // 편집 모드: 기존 기록 업데이트
          await db.foodRecords.update(parseInt(editRecordId), recordData);
        } else {
          // 새로 추가 모드
          await actions.addRecord(recordData);
        }

        router.push("/records");
      } catch (err) {
        console.error(err);
        setRecordError(
          isEditMode
            ? "기록 수정 중 오류가 발생했습니다."
            : "기록 저장 중 오류가 발생했습니다."
        );
      } finally {
        setSubmitting(false);
      }
    },
    [
      actions,
      date,
      time,
      restaurantName,
      foodName,
      category,
      rating,
      review,
      price,
      router,
      isEditMode,
      editRecordId,
    ]
  );

  return (
    <MainLayout activeTab={activeTab} onTabChange={changeTab}>
      <Header
        title={isEditMode ? "기록 수정" : "기록 추가"}
        subtitle={
          isEditMode ? "기록을 수정하세요" : "새로운 음식 기록을 추가하세요"
        }
        icon={
          isEditMode ? (
            <Edit className="w-6 h-6" />
          ) : (
            <FilePlus className="w-6 h-6" />
          )
        }
      />

      <div className="w-full px-4 py-6">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <label className="flex flex-col text-sm">
              날짜
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 p-2 border rounded"
                required
              />
            </label>
            <label className="flex flex-col text-sm">
              시간
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 p-2 border rounded"
                required
              />
            </label>
          </div>

          {/* PlaceSearch moved to separate component */}
          <PlaceSearch onSelect={onPlaceSelect} />

          <label className="flex flex-col text-sm">
            가게명
            <input
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              placeholder="가게명을 직접 입력하거나 검색에서 선택하세요"
              className="mt-1 p-2 border rounded"
            />
          </label>

          <label className="flex flex-col text-sm">
            음식명
            <input
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="mt-1 p-2 border rounded"
            />
          </label>

          <label className="flex flex-col text-sm">
            카테고리
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 border rounded"
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <label className="flex flex-col text-sm">
              평점 (0-5)
              <input
                type="number"
                min={0}
                max={5}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="mt-1 p-2 border rounded"
              />
            </label>
            <label className="flex flex-col text-sm">
              가격
              <input
                type="number"
                value={price === "" ? "" : price}
                onChange={(e) =>
                  setPrice(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="mt-1 p-2 border rounded"
              />
            </label>
          </div>

          <label className="flex flex-col text-sm">
            리뷰
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="mt-1 p-2 border rounded"
              rows={4}
            />
          </label>

          {recordError ? (
            <div className="text-sm text-red-600">{recordError}</div>
          ) : null}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 rounded border"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 text-white"
              disabled={submitting}
            >
              {submitting ? "저장중..." : "저장"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default function NewRecordPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <NewRecordPageContent />
    </Suspense>
  );
}
