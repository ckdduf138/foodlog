"use client";

import React, { useCallback, useRef, useState } from "react";

type KakaoPlace = {
  id: string;
  place_name: string;
  road_address_name: string;
  address_name: string;
  x: string; // longitude
  y: string; // latitude
};

export type PlaceSelect = {
  placeId?: string;
  placeName?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
};

const PlaceSearch = ({
  onSelect,
  apiKey,
  placeholder = "가게명이나 주소로 검색",
}: {
  onSelect: (p: PlaceSelect) => void;
  apiKey?: string;
  placeholder?: string;
}) => {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<KakaoPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef<number | null>(null);
  const abortCtrl = useRef<AbortController | null>(null);

  const key =
    apiKey ||
    (typeof window !== "undefined"
      ? (
          window as unknown as Window & {
            NEXT_PUBLIC_KAKAO_REST_API_KEY?: string;
          }
        ).NEXT_PUBLIC_KAKAO_REST_API_KEY
      : undefined) ||
    (process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY as string | undefined);

  const search = useCallback(
    (keyword: string) => {
      if (!keyword) {
        setResults([]);
        return;
      }

      if (!key || key === "KAKAO_REST_API_KEY_HERE") {
        // No key provided: skip remote call
        return;
      }

      if (abortCtrl.current) {
        abortCtrl.current.abort();
      }
      abortCtrl.current = new AbortController();

      setLoading(true);
      fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
          keyword
        )}&size=6`,
        {
          headers: {
            Authorization: `KakaoAK ${key}`,
          },
          signal: abortCtrl.current.signal,
        }
      )
        .then((res) => res.json())
        .then((data) => {
          const docs: KakaoPlace[] = data.documents || [];
          setResults(docs);
        })
        .catch((err: unknown) => {
          const e = err as { name?: string } | undefined;
          if (e?.name === "AbortError") return;
          console.error("Kakao search error", err);
        })
        .finally(() => setLoading(false));
    },
    [key]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setQ(v);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => search(v), 350);
    },
    [search]
  );

  const handleSelect = useCallback(
    (p: KakaoPlace) => {
      onSelect({
        placeId: p.id,
        placeName: p.place_name,
        address: p.road_address_name || p.address_name,
        latitude: Number(p.y),
        longitude: Number(p.x),
      });
      setQ("");
      setResults([]);
    },
    [onSelect]
  );

  return (
    <div>
      <label
        className="flex flex-col text-sm"
        style={{ color: "var(--color-foreground)" }}
      >
        위치 검색 (카카오)
        <input
          value={q}
          onChange={onChange}
          placeholder={placeholder}
          className="mt-1 p-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2"
          style={{
            backgroundColor: "var(--color-background)",
            borderColor: "var(--color-border)",
            color: "var(--color-foreground)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--color-green-500)";
            e.target.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--color-border)";
            e.target.style.boxShadow = "none";
          }}
        />
      </label>

      <div className="mt-2">
        {loading && (
          <div
            className="text-sm"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            검색 중...
          </div>
        )}
        {!loading && results.length > 0 && (
          <ul
            className="mt-2 border rounded max-h-56 overflow-auto"
            style={{
              backgroundColor: "var(--color-background)",
              borderColor: "var(--color-border)",
            }}
          >
            {results.map((r) => (
              <li
                key={r.id}
                className="p-2 cursor-pointer transition-colors"
                style={{ color: "var(--color-foreground)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                onClick={() => handleSelect(r)}
              >
                <div className="font-medium text-sm">{r.place_name}</div>
                <div
                  className="text-xs"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  {r.road_address_name || r.address_name}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
