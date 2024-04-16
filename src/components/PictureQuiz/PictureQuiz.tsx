import { usePictureQuizQuery } from "~/hooks";
import { palette } from "~/const";
import styled from "@emotion/styled";

export const PictureQuiz = () => {
  const { data } = usePictureQuizQuery(2);

  if (!data) return null;

  const handleClick = (index: number) => {
    console.log(index);
  };

  return (
    <Grid>
      {data.grid.map((row, i) => (
        <Row key={i}>
          {row.map((imageURL, j) => (
            <Clickable
              key={imageURL}
              onClick={() => handleClick(i * row.length + j)}
            >
              <Image src={imageURL} alt="unknown image" />
            </Clickable>
          ))}
        </Row>
      ))}
    </Grid>
  );
};

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
  .correct {
    z-index: 1;
    border: 2px solid ${palette.positive.primary};
  }
`;

const Image = styled.img`
  display: block;
`;
