import { useCallback, useState } from "react";

interface ReverseGeocodeResult {
  address: string | null;
  loading: boolean;
  error: string | null;
}

export const useReverseGeocode = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddress = useCallback(async (latitude: number, longitude: number) => {
    const key = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
    if (!key) {
      setError("Kakao API key is not configured.");
      return { address: null, loading: false, error: "no-key" } as ReverseGeocodeResult;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${encodeURIComponent(
        String(longitude)
      )}&y=${encodeURIComponent(String(latitude))}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `KakaoAK ${key}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`${res.status} ${text}`);
      }

      const data = await res.json();
      // Kakao coord2address 응답 구조에 따라 주소 추출
      const documents = data.documents;
      if (documents && documents.length > 0) {
        const addr = documents[0].address;
        const roadAddr = documents[0].road_address;
        const resolved =
          (roadAddr && roadAddr.address_name) || (addr && addr.address_name) || null;
        setAddress(resolved);
        setLoading(false);
        return { address: resolved, loading: false, error: null } as ReverseGeocodeResult;
      }

      setAddress(null);
      setLoading(false);
      setError("주소를 찾지 못했습니다.");
      return { address: null, loading: false, error: "not-found" } as ReverseGeocodeResult;
    } catch (err: unknown) {
      setLoading(false);
      let message = "Unknown error";
      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === "string") {
        message = err;
      }
      setError(message);
      return { address: null, loading: false, error: message } as ReverseGeocodeResult;
    }
  }, []);

  return { address, loading, error, fetchAddress } as const;
};

export default useReverseGeocode;
