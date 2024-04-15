import { usePictureQuizQuery } from "~/hooks";
import styled from "@emotion/styled";

export const PictureQuiz = () => {
  const { data } = usePictureQuizQuery(2);

  if (!data) return null;

  return (
    <Grid>
      {data.grid.map((row, i) => (
        <Row key={i}>
          {row.map((imageURL) => (
            <Clickable key={imageURL}>
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
  &:hover {
    z-index: 1;
    outline: 2px solid red;
  }
`;

const Image = styled.img`
  display: block;
`;
