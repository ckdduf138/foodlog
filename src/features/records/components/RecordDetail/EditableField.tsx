"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check, X, Edit2 } from "lucide-react";

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => Promise<void>;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
  editClassName?: string;
  icon?: React.ReactNode;
  label?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onSave,
  placeholder = "입력하세요",
  multiline = false,
  className = "",
  editClassName = "",
  icon,
  label,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.setSelectionRange(editValue.length, editValue.length);
      } else {
        inputRef.current.setSelectionRange(editValue.length, editValue.length);
      }
    }
  }, [isEditing, editValue.length]);

  const handleSave = async () => {
    if (editValue.trim() === value) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      await onSave(editValue.trim());
      setIsEditing(false);
    } catch (error) {
      alert("저장 실패: " + (error instanceof Error ? error.message : "알 수 없는 오류"));
      setEditValue(value);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCancel();
    } else if (e.key === "Enter" && !multiline && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        {label && (
          <div className="flex items-center gap-2 mb-1">
            {icon}
            <span className="text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
              {label}
            </span>
          </div>
        )}
        <div className="flex items-start gap-2">
          {multiline ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={`flex-1 px-3 py-2 rounded-lg border resize-none ${editClassName}`}
              style={{
                backgroundColor: 'var(--color-background)',
                borderColor: 'var(--color-primary)',
                color: 'var(--color-foreground)',
                minHeight: '80px',
              }}
              rows={3}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={`flex-1 px-3 py-2 rounded-lg border ${editClassName}`}
              style={{
                backgroundColor: 'var(--color-background)',
                borderColor: 'var(--color-primary)',
                color: 'var(--color-foreground)',
              }}
            />
          )}
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
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`group cursor-pointer relative ${className}`}
      title="클릭하여 편집"
    >
      {label && (
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <span className="text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
            {label}
          </span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <span className="flex-1">{value || placeholder}</span>
        <Edit2 
          className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" 
          style={{ color: 'var(--color-muted-foreground)' }}
        />
      </div>
    </div>
  );
};
