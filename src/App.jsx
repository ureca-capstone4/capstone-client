import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AddBook } from "./screens/AddBook";
import { BookDetail } from "./screens/BookDetail";
import { CreateProfile } from "./screens/CreateProfile";
import { LoginScreen } from "./screens/LoginScreen";
import { MainPage } from "./screens/MainPage";
import { SelectProfile } from "./screens/SelectProfile";
import { SignUpScreen } from "./screens/SignUpScreen";
import { Draw } from "./screens/Draw";
import { TestPage } from "./screens/TestPage";
import { KidDetail } from "./screens/KidDetail";

const router = createBrowserRouter([
  {
    path: "",
    element: <LoginScreen />,
  },
  {
    path: "/*",
    element: <LoginScreen />,
  },
  {
    path: "/kid_detail",
    element: <KidDetail />,
  },
  {
    path: "/test_page",
    element: <TestPage />,
  },
  {
    path: "/add_book",
    element: <AddBook />,
  },
  {
    path: "/book_detail",
    element: <BookDetail />,
  },
  {
    path: "/main_page",
    element: <MainPage />,
  },
  {
    path: "/draw",
    element: <Draw />,
  },
  {
    path: "/create_profile",
    element: <CreateProfile />,
  },
  {
    path: "/select_profile",
    element: <SelectProfile />,
  },
  {
    path: "/login_screen",
    element: <LoginScreen />,
  },
  {
    path: "/signup_screen",
    element: <SignUpScreen />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};