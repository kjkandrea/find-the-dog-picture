import { QuizReport as IQuizReport } from "~/hooks";
import { QuizReport } from ".";

describe("QuizReport", () => {
  it(`격자의 크기마다 사진을 선택하는대에 걸린 평균 시간과 정답률을 표기한다.
      총 정답 수, 오답 수, 정답률을 표기한다.
      정답률은 소수점 두 자리까지 표기한다.
  `, () => {
    const quizReport: IQuizReport = {
      quizSolveLogs: [
        { quizId: 2, squareMatrix: 2, correct: true, answer: 1 },
        { quizId: 3, squareMatrix: 2, correct: true, answer: 2 },
        { quizId: 4, squareMatrix: 3, correct: true, answer: 6 },
        { quizId: 5, squareMatrix: 3, correct: true, answer: 5 },
        { quizId: 6, squareMatrix: 4, correct: false, answer: 6 },
        { quizId: 7, squareMatrix: 4, correct: true, answer: 11 },
        { quizId: 8, squareMatrix: 4, correct: true, answer: 0 },
        { quizId: 9, squareMatrix: 5, correct: false, answer: 7 },
        { quizId: 10, squareMatrix: 5, correct: true, answer: 13 },
        { quizId: 11, squareMatrix: 5, correct: false, answer: 17 },
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
