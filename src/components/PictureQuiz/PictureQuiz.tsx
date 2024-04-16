import { usePictureQuizQuery, useSubmitPictureQuizMutation } from "~/hooks";
import { palette } from "~/const";
import styled from "@emotion/styled";

export const PictureQuiz = () => {
  const { data } = usePictureQuizQuery(2);
  const { data: feedback, mutate } = useSubmitPictureQuizMutation();

  console.log(feedback);

  if (!data) return null;

  const handleClickAnswer = (index: number) => {
    mutate({
      quizId: data.id,
      answer: index,
    });
  };

  return (
    <Root>
      {feedback?.correct ? "정답입니다!" : "오답입니다."}
      <Grid>
        {data.grid.map((row, i) => (
          <Row key={i}>
            {row.map((imageURL, j) => {
              const uniqueIndex = i * row.length + j;

              return (
                <Clickable
                  key={uniqueIndex}
                  onClick={() => handleClickAnswer(uniqueIndex)}
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
