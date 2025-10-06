import React, { memo } from "react";
import type { FoodRecord } from "@/features/records/types";
import { EditablePhoto } from "./EditablePhoto";

interface RecordMediaProps {
  record: FoodRecord;
  onUpdatePhoto: (photo: string | File | undefined) => Promise<void>;
}

const RecordMediaComponent: React.FC<RecordMediaProps> = ({ record, onUpdatePhoto }) => {
  return <EditablePhoto record={record} onSave={onUpdatePhoto} />;
};

RecordMediaComponent.displayName = 'RecordMedia';

export const RecordMedia = memo(RecordMediaComponent, (prevProps, nextProps) => {
  // photo가 변경되지 않았다면 리렌더링하지 않음
  return prevProps.record.photo === nextProps.record.photo;
});
