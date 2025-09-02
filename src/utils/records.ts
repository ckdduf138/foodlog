// 별점 관련 유틸리티
export const getRatingText = (rating: number): string => {
  const ratingTexts = {
    1: "별로예요",
    2: "그저 그래요",
    3: "괜찮아요",
    4: "맛있어요",
    5: "정말 맛있어요!",
  };
  return ratingTexts[rating as keyof typeof ratingTexts] || "";
};

export const getRatingColor = (rating: number): string => {
  if (rating >= 4) return "text-green-600";
  if (rating >= 3) return "text-yellow-600";
  if (rating >= 2) return "text-orange-600";
  return "text-red-600";
};

// 검색 관련 유틸리티
export const highlightSearchTerm = (
  text: string,
  searchTerm: string
): string => {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
};

export type SearchableRecord = {
  foodName?: string;
  restaurantName?: string;
  location?: { address?: string } | string;
  review?: string;
  tags?: string[];
};

export const createSearchIndex = (
  records: SearchableRecord[]
): Map<string, SearchableRecord[]> => {
  const index = new Map<string, SearchableRecord[]>();

  records.forEach((record) => {
    const locationAddress =
      typeof record.location === "string"
        ? record.location
        : record.location?.address || "";

    const searchableText = [
      record.foodName || "",
      record.restaurantName || "",
      locationAddress,
      record.review || "",
      ...(record.tags || []),
    ]
      .join(" ")
      .toLowerCase();

    const words = searchableText.split(/\s+/);
    words.forEach((word) => {
      if (word.length > 1) {
        if (!index.has(word)) {
          index.set(word, []);
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        index.get(word)!.push(record);
      }
    });
  });

  return index;
};

export const searchRecords = (
  searchTerm: string,
  index: Map<string, SearchableRecord[]>,
  allRecords: SearchableRecord[]
): SearchableRecord[] => {
  if (!searchTerm) return allRecords;

  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  const matchingRecords = new Set<SearchableRecord>();

  for (const [word, records] of index.entries()) {
    if (word.includes(lowerCaseSearchTerm)) {
      records.forEach((record) => matchingRecords.add(record));
    }
  }

  return Array.from(matchingRecords);
};
