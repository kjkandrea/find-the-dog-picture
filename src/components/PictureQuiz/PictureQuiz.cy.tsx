import { PictureQuiz } from ".";

describe("PictureQuiz", () => {
  // TODO: 다음 문항 출력 테스트
  it("강아지 사진을 동작 시 정답 처리", () => {
    cy.mount(<PictureQuiz />);

    cy.get("img[src*='dog']").parent().click().should("have.class", "correct");
    cy.contains("정답입니다!");
  });
});
