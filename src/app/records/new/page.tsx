"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { Header } from "@/components/ui/molecules";
import { useNavigation, useFoodRecords } from "@/hooks";
import { FilePlus } from "lucide-react";
import PlaceSearch from "@/components/places/PlaceSearch";

export default function NewRecordPage() {
  const { activeTab, changeTab } = useNavigation("records");
  const { actions } = useFoodRecords();
  const router = useRouter();

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
        await actions.addRecord({
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
        });

        router.push("/records");
      } catch (err) {
        console.error(err);
        setRecordError("기록 저장 중 오류가 발생했습니다.");
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
    ]
  );

  return (
    <MainLayout activeTab={activeTab} onTabChange={changeTab}>
      <Header
        title="기록 추가"
        subtitle="새로운 음식 기록을 추가하세요"
        icon={<FilePlus className="w-6 h-6" />}
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
