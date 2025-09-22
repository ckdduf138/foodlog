"use client";
import React from "react";
import { Edit, Trash2 } from "lucide-react";

const RecordActions: React.FC<{ onEdit: () => void; onDelete: () => void }> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        className="inline-flex items-center gap-2 px-3 py-2 rounded"
        onClick={onEdit}
        style={{ backgroundColor: 'var(--color-green-100)', color: 'var(--color-foreground)', border: '1px solid var(--color-border)' }}
      >
        <Edit className="w-4 h-4" /> 편집
      </button>
      <button
        type="button"
        className="inline-flex items-center gap-2 px-3 py-2 rounded"
        onClick={onDelete}
        style={{ backgroundColor: 'var(--color-destructive)', color: 'var(--color-destructive-foreground)', border: '1px solid transparent' }}
      >
        <Trash2 className="w-4 h-4" /> 삭제
      </button>
    </div>
  );
};

export default RecordActions;
