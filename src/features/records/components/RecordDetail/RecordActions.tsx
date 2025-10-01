"use client";
import React from "react";
import { Edit, Trash2 } from "lucide-react";

const RecordActions: React.FC<{ onEdit: () => void; onDelete: () => void }> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <button
        type="button"
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-sm active:scale-95"
        onClick={onEdit}
        style={{ 
          backgroundColor: 'var(--color-green-100)', 
          color: 'var(--color-green-800)', 
          border: '1px solid var(--color-green-200)' 
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-green-200)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-green-100)';
        }}
      >
        <Edit className="w-4 h-4" />
        <span className="hidden sm:inline">편집</span>
      </button>
      
      <button
        type="button"
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-md active:scale-95"
        onClick={onDelete}
        style={{ 
          backgroundColor: 'var(--color-destructive)', 
          color: 'var(--color-destructive-foreground)' 
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
      >
        <Trash2 className="w-4 h-4" />
        <span className="hidden sm:inline">삭제</span>
      </button>
    </div>
  );
};

export default RecordActions;
