// 통계 계산 유틸리티
export const calculateAverage = (numbers: number[]): number => {
  return numbers.length > 0
    ? numbers.reduce((sum, num) => sum + num, 0) / numbers.length
    : 0;
};

export const calculatePercentage = (value: number, total: number): number => {
  return total > 0 ? Math.round((value / total) * 100) : 0;
};

/**
 * 연속 기록 일수 계산
 * @param dates - 기록된 날짜 배열 (Date 또는 ISO string)
 * @returns 연속 기록 일수
 */
export const calculateStreakDays = (dates: (Date | string)[]): number => {
  if (dates.length === 0) return 0;

  // Date 객체로 변환하고 날짜만 비교하기 위해 시간을 00:00:00으로 설정
  const normalizedDates = dates
    .map((date) => {
      const d = typeof date === 'string' ? new Date(date) : date;
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    })
    .sort((a, b) => b.getTime() - a.getTime()); // 최신순 정렬

  // 중복 제거 (같은 날짜에 여러 기록이 있을 수 있음)
  const uniqueDates = Array.from(
    new Set(normalizedDates.map((d) => d.getTime()))
  ).map((time) => new Date(time));

  if (uniqueDates.length === 0) return 0;

  // 오늘 날짜
  const today = new Date();
  const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // 가장 최근 기록 날짜
  const latestDate = uniqueDates[0];

  // 가장 최근 기록이 오늘이거나 어제가 아니면 연속 기록이 끊김
  const daysDiff = Math.floor(
    (todayNormalized.getTime() - latestDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDiff > 1) {
    return 0; // 연속 기록 끊김
  }

  // 연속 일수 계산
  let streakDays = 1;
  let currentDate = latestDate;

  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = uniqueDates[i];
    const diff = Math.floor(
      (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diff === 1) {
      // 연속된 날짜
      streakDays++;
      currentDate = prevDate;
    } else {
      // 연속 끊김
      break;
    }
  }

  return streakDays;
};
