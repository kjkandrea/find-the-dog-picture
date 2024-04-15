import { usePictureQuizQuery } from "~/hooks";

export const PictureQuiz = () => {
  const { data } = usePictureQuizQuery(2);

  if (!data) return null;

  return (
    <div>
      {data.grid.map((row) =>
        row.map((imageURL) => (
          <img key={imageURL} src={imageURL} alt="unknown image" />
        )),
      )}
    </div>
  );
};
