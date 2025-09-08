import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/shared/lib/db";
import { FoodRecordFormData, PlaceSelect } from "@/features/records/types";

export const useRecordForm = () => {
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
    rating: 4,
    review: "",
    price: undefined,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load edit data when in edit mode
  useEffect(() => {
    if (isEditMode && editRecord) {
      setFormData({
        date: editRecord.date,
        time: editRecord.time,
        restaurantName: editRecord.restaurantName,
        location: editRecord.location,
        foodName: editRecord.foodName,
        rating: editRecord.rating,
        review: editRecord.review,
        photo: editRecord.photo,
        price: editRecord.price,
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
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        restaurantName: place.placeName || prev.restaurantName,
        location: {
          address: place.address,
          latitude: place.latitude,
          longitude: place.longitude,
          placeId: place.placeId,
          placeName: place.placeName,
        },
      };
      return newFormData;
    });
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      setError(null);

      try {
        let photoData: string | undefined = undefined;

        // Convert File to base64 if photo is a File object
        if (formData.photo && typeof formData.photo !== "string") {
          const reader = new FileReader();
          photoData = await new Promise<string>((resolve) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(formData.photo as File);
          });
        } else if (typeof formData.photo === "string") {
          photoData = formData.photo;
        }

        const recordData = {
          ...formData,
          photo: photoData,
          location: {
            address: formData.location.address || "",
            latitude: formData.location.latitude || 0,
            longitude: formData.location.longitude || 0,
            placeId: formData.location.placeId || "",
            placeName: formData.location.placeName || "",
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        if (isEditMode && editRecordId) {
          await db.foodRecords.update(parseInt(editRecordId), recordData);
        } else {
          await db.foodRecords.add(recordData);
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

  return {
    formData,
    submitting,
    error,
    isEditMode,
    handleFormChange,
    handleRatingChange,
    handlePriceChange,
    handlePlaceSelect,
    handleSubmit,
  };
};
