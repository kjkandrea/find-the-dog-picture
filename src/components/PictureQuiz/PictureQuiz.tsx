import { useQuiz } from "~/hooks";
import { palette } from "~/const";
import styled from "@emotion/styled";

export const PictureQuiz = () => {
  const { quiz, solve, feedback, step } = useQuiz();

  if (!quiz) return null;

  return (
    <Root>
      <QuizTitle>퀴즈 {step}</QuizTitle>
      <Description>강아지를 찾아주세요.</Description>
      {feedback && (
        <FeedbackTypography>
          {feedback?.correct ? "정답입니다!" : "오답입니다."}
        </FeedbackTypography>
      )}
      <Grid data-testid="picture-grid">
        {quiz.grid.map((row, i) => (
          <Row key={i}>
            {row.map((imageURL, j) => {
              const uniqueIndex = i * row.length + j;

              return (
                <Clickable
                  key={uniqueIndex}
                  onClick={() => solve(uniqueIndex)}
                  className={(() => {
                    if (!feedback || feedback?.answer !== uniqueIndex) return;
                    return feedback?.correct ? "correct" : "wrong";
                  })()}
                >
                  <Image src={imageURL} alt="unknown image" />
                </Clickable>
              );
            })}
          </Row>
        ))}
      </Grid>
    </Root>
  );
};

const Root = styled.div``;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Clickable = styled.button`
  &.correct {
    background-color: ${palette.positive.primary};
  }

  &.wrong {
    background-color: ${palette.negative.primary};
  }

  &.correct,
  &.wrong {
    z-index: 1;

    img {
      opacity: 0.8;
    }
  }
`;

const Image = styled.img`
  display: block;
`;

const QuizTitle = styled.h2``;

const Description = styled.p``;

const FeedbackTypography = styled.p``;
