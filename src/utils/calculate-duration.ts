import dayjs from "dayjs";

/**
 * 날짜 형식 변환: "2023.12" -> dayjs 객체
 */
const formatDate = (dateStr: string) => {
  if (!dateStr || !dateStr.includes(".")) {
    return dayjs().startOf("month");
  }
  const [year, month] = dateStr.split(".");
  return dayjs(`${year}-${month.padStart(2, "0")}-01`);
};

/**
 * 시작일과 종료일을 받아서 몇 개월 동안 진행했는지 계산하는 함수
 * @param from 시작일 (예: "2023.12")
 * @param to 종료일 (예: "2024.07" 또는 "" - 진행 중)
 * @returns 기간 문자열 (예: "7개월" 또는 "7개월+")
 */
export const calculateDuration = (from: string, to?: string): string => {
  const startDate = formatDate(from);
  const endDate = to ? formatDate(to) : dayjs().startOf("month"); // to가 없으면 현재 월
  const isOngoing = !to;

  // 개월 차이 계산
  const months = endDate.diff(startDate, "month"); // 월 단위 차이
  const totalMonths = months + 1; // 시작 월 포함

  // 0개월인 경우 1개월로 처리
  const finalMonths = totalMonths <= 0 ? 1 : totalMonths;

  return isOngoing ? `${finalMonths}개월+` : `${finalMonths}개월`;
};

/**
 * 날짜 범위를 포맷팅하는 함수 (날짜 표시 + 개월 계산)
 * @param from 시작일 (예: "2023.12")
 * @param to 종료일 (예: "2024.07" 또는 "" - 진행 중)
 * @returns 날짜 범위 문자열과 개월 정보를 포함한 객체
 */
export const formatDateRange = (from: string, to?: string): { dateRange: string; duration: string } => {
  // from과 to가 같으면 from만 표시
  const dateRange = to && from === to ? from : `${from} - ${to || "현재"}`;
  const duration = calculateDuration(from, to);

  return { dateRange, duration };
};
