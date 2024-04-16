import { PictureQuiz } from ".";

describe("PictureQuiz", () => {
  it("강아지 사진을 동작 시 정답", () => {
    cy.mount(<PictureQuiz />);

    pictureGrid()
      .get("img[src*='dog']")
      .parent()
      .click()
      .should("have.class", "correct");
    cy.contains("정답입니다!");
  });

  it("고양이 사진을 동작 시 오답", () => {
    cy.mount(<PictureQuiz />);

    pictureGrid()
      .get("img[src*='cat']")
      .first()
      .parent()
      .click()
      .should("have.class", "wrong");
    cy.contains("오답입니다.");
  });

  it.only("정답 혹은 오답 시 약 2초 후 다음 퀴즈로 넘어감", () => {
    cy.mount(<PictureQuiz />);
    cy.contains("퀴즈 1");
    pictureGrid().get("img").first().parent().click();
    cy.wait(2000);
    cy.contains("퀴즈 2");
  });

  function pictureGrid() {
    return cy.get("[data-testid='picture-grid']");
  }
});
