import React from "react";
import type { FoodRecord } from "@/features/records/types";
import { EditablePhoto } from "./EditablePhoto";

interface RecordMediaProps {
  record: FoodRecord;
  onUpdatePhoto: (photo: string | File | undefined) => Promise<void>;
}

const RecordMedia: React.FC<RecordMediaProps> = ({ record, onUpdatePhoto }) => {
  return <EditablePhoto record={record} onSave={onUpdatePhoto} />;
};

export default RecordMedia;
