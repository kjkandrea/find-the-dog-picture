import { usePictureQuizQuery } from "~/hooks";

export const PictureQuiz = () => {
  const { data } = usePictureQuizQuery(2);

  console.log(data);

  return <>PictureQuiz : {JSON.stringify(data)}</>;
};
