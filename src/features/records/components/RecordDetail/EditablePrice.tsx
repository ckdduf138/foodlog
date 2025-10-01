"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, X } from "lucide-react";

interface EditablePriceProps {
  value: number | undefined;
  onSave: (value: number | undefined) => Promise<void>;
}

export const EditablePrice: React.FC<EditablePriceProps> = ({ value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value?.toString() || "");
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    const numValue = editValue.trim() ? parseInt(editValue.replace(/[^0-9]/g, "")) : undefined;
    
    if (numValue === value) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      await onSave(numValue);
      setIsEditing(false);
    } catch (error) {
      alert("저장 실패: " + (error instanceof Error ? error.message : "알 수 없는 오류"));
      setEditValue(value?.toString() || "");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value?.toString() || "");
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCancel();
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setEditValue(numericValue);
  };

  const formatPrice = (price: number | undefined) => {
    if (!price) return "가격 미등록";
    return `${price.toLocaleString()}원`;
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={editValue ? parseInt(editValue).toLocaleString() : ""}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="0"
          className="flex-1 px-3 py-2 rounded-lg border text-lg font-bold"
          style={{
            backgroundColor: 'var(--color-background)',
            borderColor: 'var(--color-primary)',
            color: 'var(--color-primary)',
            maxWidth: '150px',
          }}
        />
        <span className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>원</span>
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="p-2 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'white',
            }}
            title="저장"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="p-2 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--color-muted)',
              color: 'var(--color-foreground)',
            }}
            title="취소"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="group cursor-pointer hover:opacity-80 transition-opacity"
      title="클릭하여 편집"
    >
      <p 
        className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}
      >
        {formatPrice(value)}
      </p>
    </div>
  );
};
