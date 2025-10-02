import React from "react";
import { MapPin, ExternalLink } from "lucide-react";
import type { FoodRecord } from "@/features/records/types";

interface RecordLocationProps {
  record: FoodRecord;
}

export const RecordLocation: React.FC<RecordLocationProps> = ({ record }) => {
  const hasLocation = record.location.placeName || record.location.address;
  const hasCoordinates = record.location.latitude && record.location.longitude;

  return (
    <div 
      className="rounded-xl p-4 space-y-4"
      style={{ 
        backgroundColor: 'var(--color-muted)', 
        border: '1px solid var(--color-border)' 
      }}
    >
      {/* 장소 정보 */}
      {hasLocation && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
            <h4 className="text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
              장소
            </h4>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-foreground)' }}>
            {record.location.placeName || record.location.address}
          </p>
          
          {hasCoordinates && (
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://map.kakao.com/link/map/${encodeURIComponent(
                record.location.placeName || record.location.address || '장소'
              )},${record.location.latitude},${record.location.longitude}`}
              className="inline-flex items-center gap-1 mt-2 text-xs font-medium transition-colors hover:underline"
              style={{ color: 'var(--color-primary)' }}
            >
              <ExternalLink className="w-3 h-3" />
              지도에서 보기
            </a>
          )}
        </div>
      )}
    </div>
  );
};
