import React, { useEffect, useState } from "react";
import type { FoodRecord } from "@/features/records/types";

const RecordMedia: React.FC<{ record: FoodRecord }> = ({ record }) => {
  if (!record.photo) return null;

  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let objUrl: string | null = null;
    if (typeof record.photo === "string") {
      setSrc(record.photo);
    } else if (record.photo && typeof (record.photo as any).size === "number") {
      objUrl = URL.createObjectURL(record.photo as File);
      setSrc(objUrl);
    }

    return () => {
      if (objUrl) {
        URL.revokeObjectURL(objUrl);
      }
    };
  }, [record.photo]);

  if (!src) return null;

  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
      <img src={src} alt={record.foodName} className="w-full h-auto object-cover" />
    </div>
  );
};

export default RecordMedia;
