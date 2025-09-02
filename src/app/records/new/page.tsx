"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  Suspense,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { FoodRecordFormData } from "@/types";
import { MainLayout } from "@/components/layout/MainLayout";
import { Header } from "@/components/ui/common/molecules/Header";
import { useNavigation } from "@/hooks/useNavigation";
import { FilePlus, Edit } from "lucide-react";
import { RecordForm } from "@/components/ui/records/organisms/RecordForm";
import { PlaceSelect } from "@/components/ui/records/places/PlaceSearch";

const NewRecordPageContent = () => {
  const { activeTab, changeTab } = useNavigation("records");
  const router = useRouter();
  const searchParams = useSearchParams();

  const isEditMode = searchParams.get("edit") === "true";
  const editRecordId = searchParams.get("id");

  const editRecord = useLiveQuery(
    () =>
      editRecordId ? db.foodRecords.get(parseInt(editRecordId)) : undefined,
    [editRecordId]
  );

  const today = useMemo(() => new Date(), []);
  const pad = (n: number) => String(n).padStart(2, "0");

  const [formData, setFormData] = useState<FoodRecordFormData>({
    date: `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(
      today.getDate()
    )}`,
    time: `${pad(today.getHours())}:${pad(today.getMinutes())}`,
    restaurantName: "",
    location: {},
    foodName: "",
    category: "",
    rating: 4,
    review: "",
    price: undefined,
    tags: [],
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && editRecord) {
      setFormData({
        date: editRecord.date,
        time: editRecord.time,
        restaurantName: editRecord.restaurantName,
        location: editRecord.location,
        foodName: editRecord.foodName,
        category: editRecord.category || "",
        rating: editRecord.rating,
        review: editRecord.review,
        photo: editRecord.photo,
        price: editRecord.price,
        tags: editRecord.tags || [],
      });
    }
  }, [isEditMode, editRecord]);

  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      if (
        name === "photo" &&
        e.target instanceof HTMLInputElement &&
        e.target.files
      ) {
        const file = e.target.files[0];
        setFormData((prev) => ({
          ...prev,
          photo: file,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]:
            name === "price"
              ? value === ""
                ? undefined
                : Number(value)
              : value,
        }));
      }
    },
    []
  );

  const handleRatingChange = useCallback((rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  }, []);

  const handlePriceChange = useCallback((price: number | undefined) => {
    setFormData((prev) => ({ ...prev, price }));
  }, []);

  const handlePlaceSelect = useCallback((place: PlaceSelect) => {
    setFormData((prev) => ({
      ...prev,
      restaurantName: place.placeName || prev.restaurantName,
      location: {
        address: place.address,
        latitude: place.latitude,
        longitude: place.longitude,
        placeId: place.placeId,
        placeName: place.placeName,
      },
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      setError(null);

      try {
        let photoData: string | undefined = undefined;

        // 사진이 File 객체인 경우 base64로 변환하여 저장
        if (formData.photo && typeof formData.photo !== "string") {
          console.log("Converting File to base64:", formData.photo);
          const reader = new FileReader();
          photoData = await new Promise<string>((resolve) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(formData.photo as File);
          });
          console.log("Photo converted to base64, length:", photoData.length);
        } else if (typeof formData.photo === "string") {
          photoData = formData.photo;
          console.log("Using existing photo string, length:", photoData.length);
        } else {
          console.log("No photo to save");
        }

        const recordData = {
          ...formData,
          photo: photoData,
          location: {
            address: formData.location.address || "",
            latitude: formData.location.latitude ?? 0,
            longitude: formData.location.longitude ?? 0,
            placeId: formData.location.placeId,
            placeName: formData.location.placeName,
          },
        };

        console.log("Saving record with photo:", !!recordData.photo);

        if (isEditMode && editRecordId) {
          await db.foodRecords.update(parseInt(editRecordId), recordData);
        } else {
          await db.foodRecords.add(recordData as any);
        }

        router.push("/records");
      } catch (err) {
        console.error(err);
        setError(
          isEditMode
            ? "기록 수정 중 오류가 발생했습니다."
            : "기록 저장 중 오류가 발생했습니다."
        );
      } finally {
        setSubmitting(false);
      }
    },
    [formData, router, isEditMode, editRecordId]
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
        <RecordForm
          formData={formData}
          onFormChange={handleFormChange}
          onRatingChange={handleRatingChange}
          onPriceChange={handlePriceChange}
          onPlaceSelect={handlePlaceSelect}
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
          isSubmitting={submitting}
          error={error}
          isEditMode={isEditMode}
        />
      </div>
    </MainLayout>
  );
};

const NewRecordPage = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <NewRecordPageContent />
    </Suspense>
  );
};

export default NewRecordPage;
