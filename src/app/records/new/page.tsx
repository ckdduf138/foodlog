"use client";

import React, { Suspense } from "react";
import { MainLayout, Header, LoadingSpinner } from "@/shared/components";
import { useNavigation } from "@/shared/hooks";
import { FilePlus, Edit } from "lucide-react";
import { RecordForm } from "@/features/records/components";
import { useRecordForm } from "@/features/records/hooks";
import { useSearchParams } from "next/navigation";

const NewRecordPageContent = () => {
  const { activeTab, changeTab } = useNavigation("records");
  const searchParams = useSearchParams();
  const editParam = searchParams.get("edit");
  const {
    formData,
    submitting,
    error,
    isEditMode,
    handleFormChange,
    handleRatingChange,
    handlePriceChange,
    handlePlaceSelect,
    handleSubmit,
  } = useRecordForm(editParam ?? undefined);

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

      <div className="w-full px-4 pt-4">
        <RecordForm
          formData={formData}
          onFormChange={handleFormChange}
          onRatingChange={handleRatingChange}
          onPriceChange={handlePriceChange}
          onPlaceSelect={handlePlaceSelect}
          onSubmit={handleSubmit}
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
    <Suspense fallback={<LoadingSpinner />}>
      <NewRecordPageContent />
    </Suspense>
  );
};

export default NewRecordPage;
