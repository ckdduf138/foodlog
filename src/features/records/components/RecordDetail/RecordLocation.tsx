import React, { memo, useMemo } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import type { FoodRecord } from "@/features/records/types";

interface RecordLocationProps {
  record: FoodRecord;
}

const RecordLocationComponent: React.FC<RecordLocationProps> = ({ record }) => {
  const hasLocation = record.location.placeName || record.location.address;
  const hasCoordinates = record.location.latitude && record.location.longitude;

  const mapUrl = useMemo(() => {
    if (!hasCoordinates) return null;
    return `https://map.kakao.com/link/map/${encodeURIComponent(
      record.location.placeName || record.location.address || '장소'
    )},${record.location.latitude},${record.location.longitude}`;
  }, [hasCoordinates, record.location.placeName, record.location.address, record.location.latitude, record.location.longitude]);

  if (!hasLocation) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-2">
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: 'var(--color-muted)' }}
        >
          <MapPin className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
        </div>
        <h4 className="text-lg font-bold" style={{ color: 'var(--color-foreground)' }}>
          위치
        </h4>
      </div>
      
      <p className="text-base leading-relaxed pl-1" style={{ color: 'var(--color-muted-foreground)' }}>
        {record.location.placeName || record.location.address}
      </p>
      
      {mapUrl && (
        <a
          target="_blank"
          rel="noreferrer"
          href={mapUrl}
          className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
          style={{ 
            backgroundColor: 'var(--color-muted)',
            color: 'var(--color-primary)',
          }}
        >
          <MapPin className="w-4 h-4" />
          <span>지도에서 보기</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  );
};

RecordLocationComponent.displayName = 'RecordLocation';

export const RecordLocation = memo(RecordLocationComponent, (prevProps, nextProps) => {
  return (
    prevProps.record.location.placeName === nextProps.record.location.placeName &&
    prevProps.record.location.address === nextProps.record.location.address &&
    prevProps.record.location.latitude === nextProps.record.location.latitude &&
    prevProps.record.location.longitude === nextProps.record.location.longitude
  );
});
