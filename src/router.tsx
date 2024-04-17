import { createBrowserRouter, Outlet } from "react-router-dom";
import { DefaultLayout } from "~/layouts";
import { NotFoundPage, PictureQuizPage, QuizReportPage } from "~/pages";

export const router = createBrowserRouter([
  {
    element: (
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    ),
    children: [
      {
        path: "/",
        element: <PictureQuizPage />,
      },
      {
        path: "/result",
        element: <QuizReportPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
