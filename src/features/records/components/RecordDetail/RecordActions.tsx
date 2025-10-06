"use client";
import React, { memo } from "react";
import { Edit3, Trash2 } from "lucide-react";

const RecordActionsComponent: React.FC<{ onEdit: () => void; onDelete: () => void }> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex items-center gap-3">
      {/* 편집 버튼 */}
      <button
        type="button"
        className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
        onClick={onEdit}
        style={{ 
          backgroundColor: 'var(--color-primary)',
          color: 'white',
        }}
      >
        <Edit3 className="w-5 h-5" />
        <span>편집하기</span>
      </button>
      
      {/* 삭제 버튼 */}
      <button
        type="button"
        className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
        onClick={onDelete}
        style={{ 
          backgroundColor: '#FEE2E2',
          color: '#EF4444',
          border: '1px solid #FECACA',
        }}
      >
        <Trash2 className="w-5 h-5" />
        <span>삭제하기</span>
      </button>
    </div>
  );
};

RecordActionsComponent.displayName = 'RecordActions';

export const RecordActions = memo(RecordActionsComponent);
