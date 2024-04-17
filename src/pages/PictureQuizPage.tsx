import { PictureQuiz } from "~/components";
import { useQuizReport } from "~/hooks";
import { useNavigate } from "react-router-dom";

export const PictureQuizPage = () => {
  const { submit, add: onSolved } = useQuizReport();
  const navigate = useNavigate();

  const onComplete = () => {
    submit();
    navigate("/result");
  };

  return <PictureQuiz onComplete={onComplete} onSolved={onSolved} />;
};
