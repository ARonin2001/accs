import { createBrowserRouter } from "react-router";
import { AuthLogin } from "../components/auth/AuthLogin/AuthLogin";
import { ClearLayout } from "../layouts/ClearLayout/ClearLayout";
import { MainLayout } from "../layouts/MainLayout/MainLayout";
import { AuthPage } from "../pages/AuthPage/AuthPage";
import { CoursesPage } from "../pages/CoursePage/CoursesPage";
import { LessonPage } from "../pages/LessonsPage/LessonPage";
import { LessonsPage } from "../pages/LessonsPage/LessonsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "courses",
        Component: CoursesPage,
      },
      {
        path: "courses/:courseId",
        Component: LessonsPage,
      },
      {
        path: "lesson/:id",
        Component: LessonPage,
      },
    ],
  },
  {
    path: "auth",
    Component: ClearLayout,
    children: [
      {
        Component: AuthPage,
        children: [
          {
            index: true,
            Component: AuthLogin,
          },
        ],
      },
    ],
  },
]);
