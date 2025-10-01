"use client";

import React, { useState, useRef, useEffect } from "react";
import { Camera, Upload, X, ImageIcon } from "lucide-react";
import type { FoodRecord } from "@/features/records/types";

interface EditablePhotoProps {
  record: FoodRecord;
  onSave: (photo: File | string | undefined) => Promise<void>;
}

const isFile = (x: unknown): x is File => {
  return typeof x === "object" && x instanceof File;
};

export const EditablePhoto: React.FC<EditablePhotoProps> = ({ record, onSave }) => {
  const [src, setSrc] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let objUrl: string | null = null;

    if (!record.photo) {
      setSrc(null);
      return;
    }

    if (typeof record.photo === "string") {
      setSrc(record.photo);
    } else if (isFile(record.photo)) {
      objUrl = URL.createObjectURL(record.photo);
      setSrc(objUrl);
    }

    return () => {
      if (objUrl) {
        URL.revokeObjectURL(objUrl);
      }
    };
  }, [record.photo]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 파일인지 확인
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    setIsSaving(true);
    try {
      // 파일을 Base64로 변환
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        await onSave(base64String);
        setIsSaving(false);
      };
      reader.onerror = () => {
        alert("파일 읽기 실패");
        setIsSaving(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert("사진 저장 실패: " + (error instanceof Error ? error.message : "알 수 없는 오류"));
      setIsSaving(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!confirm("사진을 삭제하시겠습니까?")) return;

    setIsSaving(true);
    try {
      await onSave(undefined);
    } catch (error) {
      alert("사진 삭제 실패: " + (error instanceof Error ? error.message : "알 수 없는 오류"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleClick = () => {
    if (!isSaving) {
      fileInputRef.current?.click();
    }
  };

  if (!src) {
    return (
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center cursor-pointer transition-all hover:shadow-md"
        style={{
          backgroundColor: isHovered ? "var(--color-secondary)" : "var(--color-muted)",
          border: isHovered ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <div className="text-center" style={{ color: 'var(--color-muted-foreground)' }}>
          <Upload 
            className={`w-12 h-12 mx-auto mb-2 transition-all ${isHovered ? 'scale-110' : ''}`} 
            style={{ color: isHovered ? 'var(--color-primary)' : 'var(--color-muted-foreground)' }}
          />
          <p className="text-sm font-medium">
            {isSaving ? "업로드 중..." : "클릭하여 사진 추가"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] relative group"
      style={{ backgroundColor: "var(--color-background)", border: "1px solid var(--color-border)" }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {/* 이미지 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={record.foodName}
        className="w-full h-full object-cover"
      />

      {/* 호버 오버레이 */}
      <div
        className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-opacity ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={handleClick}
          disabled={isSaving}
          className="p-3 rounded-full transition-all hover:scale-110"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
          }}
          title="사진 변경"
        >
          <Camera className="w-5 h-5" />
        </button>
        <button
          onClick={handleRemovePhoto}
          disabled={isSaving}
          className="p-3 rounded-full transition-all hover:scale-110"
          style={{
            backgroundColor: 'var(--color-destructive)',
            color: 'white',
          }}
          title="사진 삭제"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 로딩 오버레이 */}
      {isSaving && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <div className="text-white text-sm font-medium">처리 중...</div>
        </div>
      )}
    </div>
  );
};
