import React, { useEffect, useState } from "react";
import type { FoodRecord } from "@/features/records/types";

const isFile = (x: unknown): x is File => {
  return typeof x === "object" && x instanceof File;
};

const RecordMedia: React.FC<{ record: FoodRecord }> = ({ record }) => {
  const [src, setSrc] = useState<string | null>(null);

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

  if (!src) return null;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: "var(--color-background)", border: "1px solid var(--color-border)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={record.foodName} className="w-full h-auto object-cover" />
    </div>
  );
};

export default RecordMedia;
