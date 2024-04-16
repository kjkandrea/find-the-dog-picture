import { PictureQuiz } from ".";

describe("PictureQuiz", () => {
  it("강아지 사진을 동작 시 정답", () => {
    cy.mount(<PictureQuiz />);

    cy.get("img[src*='dog']").parent().click().should("have.class", "correct");
    cy.contains("정답입니다!");
  });

  it("고양이 사진을 동작 시 오답", () => {
    cy.mount(<PictureQuiz />);

    cy.get("img[src*='cat']")
      .first()
      .parent()
      .click()
      .should("have.class", "wrong");
    cy.contains("오답입니다.");
  });
});
