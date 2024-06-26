import { QuizReport as IQuizReport } from "~/hooks";

interface QuizReportProps {
  quizReport: IQuizReport;
}

/**
 * @spec
 *
 * * 격자의 크기마다 사진을 선택하는대에 걸린 평균 시간과 정답률을 표기합니다.
 *   * 정답률은 소수점 두 자리까지 표기합니다.
 * * 총 정답 수, 오답 수, 정답률을 표기합니다.
 * * 시작 시간, 종료 시간, 총 게임 시간 을 표기합니다.
 */
export const QuizReport = ({ quizReport }: QuizReportProps) => (
  <>{JSON.stringify(quizReport)}</>
);
