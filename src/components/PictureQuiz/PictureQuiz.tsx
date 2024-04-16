import { usePictureQuizQuery, useSubmitPictureQuizMutation } from "~/hooks";
import { palette } from "~/const";
import styled from "@emotion/styled";

export const PictureQuiz = () => {
  const { data } = usePictureQuizQuery(2);
  const { data: feedback, mutate } = useSubmitPictureQuizMutation();

  if (!data) return null;

  const handleClickAnswer = (index: number) => {
    mutate({
      quizId: data.id,
      answer: index,
    });
  };

  return (
    <Root>
      {feedback?.correct && "정답입니다!"}
      <Grid>
        {data.grid.map((row, i) => (
          <Row key={i}>
            {row.map((imageURL, j) => {
              const uniqueIndex = i * row.length + j;

              return (
                <Clickable
                  key={uniqueIndex}
                  onClick={() => handleClickAnswer(uniqueIndex)}
                  className={
                    feedback?.correct &&
                    feedback?.answer === uniqueIndex &&
                    "correct"
                  }
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
  background: red;
  &.correct {
    z-index: 1;
    background-color: ${palette.positive.primary};

    img {
      opacity: 0.8;
    }
  }
`;

const Image = styled.img`
  display: block;
`;
