"use client";
import React from "react";
import { Edit3, Trash2 } from "lucide-react";

export const RecordActions: React.FC<{ onEdit: () => void; onDelete: () => void }> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      {/* 편집 버튼 */}
      <button
        type="button"
        className="group relative p-2.5 rounded-xl transition-all hover:scale-105 active:scale-95"
        onClick={onEdit}
        style={{ 
          backgroundColor: 'var(--color-muted)',
          border: '1px solid var(--color-border)',
        }}
        title="편집"
      >
        <Edit3 
          className="w-5 h-5 transition-colors" 
          style={{ color: 'var(--color-foreground)' }}
        />
        {/* 툴팁 */}
        <span 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            backgroundColor: 'var(--color-foreground)',
            color: 'var(--color-background)',
          }}
        >
          편집
        </span>
      </button>
      
      {/* 삭제 버튼 */}
      <button
        type="button"
        className="group relative p-2.5 rounded-xl transition-all hover:scale-105 active:scale-95"
        onClick={onDelete}
        style={{ 
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
        }}
        title="삭제"
      >
        <Trash2 
          className="w-5 h-5 transition-colors" 
          style={{ color: '#EF4444' }}
        />
        {/* 툴팁 */}
        <span 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            backgroundColor: '#EF4444',
            color: 'white',
          }}
        >
          삭제
        </span>
      </button>
    </div>
  );
};
