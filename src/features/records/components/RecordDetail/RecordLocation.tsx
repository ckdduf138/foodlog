import React from "react";
import type { FoodRecord } from "@/features/records/types";

const RecordLocation: React.FC<{ record: FoodRecord }> = ({ record }) => {
  return (
    <div style={{ color: 'var(--color-foreground)' }}>
      <h4 className="font-semibold">장소</h4>
      <p style={{ color: 'var(--color-muted-foreground)' }}>{record.location.placeName || record.location.address}</p>
      {record.location.latitude && record.location.longitude && (
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://map.kakao.com/link/map/${encodeURIComponent(record.location.placeName || record.location.address || '장소')},${record.location.latitude},${record.location.longitude}`}
          className="text-sm text-blue-600"
        >
          지도에서 보기
        </a>
      )}

      {record.price ? (
        <div className="mt-4">
          <h4 className="font-semibold">가격</h4>
          <p style={{ color: 'var(--color-muted-foreground)' }}>{record.price}원</p>
        </div>
      ) : null}
    </div>
  );
};

export default RecordLocation;
