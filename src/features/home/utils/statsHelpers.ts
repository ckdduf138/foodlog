// 통계 계산 유틸리티
export const calculateAverage = (numbers: number[]): number => {
  return numbers.length > 0
    ? numbers.reduce((sum, num) => sum + num, 0) / numbers.length
    : 0;
};

export const calculatePercentage = (value: number, total: number): number => {
  return total > 0 ? Math.round((value / total) * 100) : 0;
};
