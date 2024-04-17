import { QuizReport as IQuizReport } from "~/hooks";
import { QuizReport } from ".";

describe("QuizReport", () => {
  it(`격자의 크기마다 사진을 선택하는대에 걸린 평균 시간과 정답률을 표기한다.
      총 정답 수, 오답 수, 정답률을 표기한다.
      정답률은 소수점 두 자리까지 표기한다.
  `, () => {
    const quizReport: IQuizReport = {
      quizSolveLogs: [
        {
          quizId: 1,
          squareMatrix: 2,
          timestamp: "2024-04-17T06:32:35.504Z",
          correct: true,
          answer: 1,
        },
        {
          quizId: 2,
          squareMatrix: 2,
          timestamp: "2024-04-17T06:32:39.367Z",
          correct: true,
          answer: 0,
        },
        {
          quizId: 3,
          squareMatrix: 3,
          timestamp: "2024-04-17T06:32:43.168Z",
          correct: false,
          answer: 8,
        },
        {
          quizId: 4,
          squareMatrix: 3,
          timestamp: "2024-04-17T06:32:47.901Z",
          correct: true,
          answer: 7,
        },
        {
          quizId: 5,
          squareMatrix: 3,
          timestamp: "2024-04-17T06:32:57.100Z",
          correct: true,
          answer: 2,
        },
        {
          quizId: 6,
          squareMatrix: 4,
          timestamp: "2024-04-17T06:33:02.000Z",
          correct: false,
          answer: 9,
        },
        {
          quizId: 7,
          squareMatrix: 4,
          timestamp: "2024-04-17T06:33:11.467Z",
          correct: true,
          answer: 3,
        },
        {
          quizId: 8,
          squareMatrix: 4,
          timestamp: "2024-04-17T06:33:15.034Z",
          correct: false,
          answer: 6,
        },
        {
          quizId: 9,
          squareMatrix: 4,
          timestamp: "2024-04-17T06:33:19.633Z",
          correct: true,
          answer: 3,
        },
        {
          quizId: 10,
          squareMatrix: 5,
          timestamp: "2024-04-17T06:33:33.432Z",
          correct: true,
          answer: 14,
        },
      ],
    };

    cy.mount(<QuizReport quizReport={quizReport} />);

    const total = quizReport.quizSolveLogs.reduce(
      (acc, { correct }) => {
        if (correct) {
          acc.correct += 1;
        } else {
          acc.wrong += 1;
        }
        return acc;
      },
      {
        correct: 0,
        wrong: 0,
      },
    );

    const correctRate = (total.correct / (total.correct + total.wrong)) * 100;
    const roundedCorrectRate = Math.round(correctRate * 100) / 100;

    cy.get("[data-testid='total-correct']").contains(total.correct);
    cy.get("[data-testid='total-wrong']").contains(total.wrong);
    cy.get("[data-testid='correct-rate'").contains(`${roundedCorrectRate}%`);
  });
});
