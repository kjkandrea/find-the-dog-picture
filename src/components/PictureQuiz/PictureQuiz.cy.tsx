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

  it("정답 혹은 오답 시 약 2초 후 다음 퀴즈로 넘어간다.", () => {
    cy.clock();
    cy.mount(<PictureQuiz />);
    cy.contains("퀴즈 1");
    pictureGrid().get("img").first().parent().click();
    cy.tick(2000);
    cy.contains("퀴즈 2");
  });

  it.only(`퀴즈는 2 * 2 그리드로 시작한다.
    정답을 2번 맞출 시마다 그리드의 크기가 1씩 증가한다. 
    그리드의 크기는 5 * 5 까지이다. 
  `, () => {
    cy.clock();
    cy.mount(<PictureQuiz />);

    Cypress._.times(10, (i) => {
      cy.log(`${i + 1} 번째 문제`);

      pictureGrid()
        .get("img")
        .should("have.length", Math.floor(i / 2 + 2) ** 2);

      pictureGrid().get("img[src*='dog']").parent().click();
      cy.tick(2000);
      cy.wait(100);
    });
  });

  function pictureGrid() {
    return cy.get("[data-testid='picture-grid']");
  }
});
