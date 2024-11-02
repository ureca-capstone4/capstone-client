import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { LoginScreen } from "./screens/LoginScreen";
import { SignUpScreen } from "./screens/SignUpScreen";

import { SelectProfile } from "./screens/SelectProfile";
import { CreateProfile } from "./screens/CreateProfile";
import { KidDetail } from "./screens/KidDetail";
import { TestPage } from "./screens/TestPage";

import { MainPage } from "./screens/MainPage";

import { BookDetail } from "./screens/BookDetail";
import { AddBook } from "./screens/AddBook";

import { Draw } from "./screens/Draw";

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
    path: "/login_screen",
    element: <LoginScreen />,
  },
  {
    path: "/signup_screen",
    element: <SignUpScreen />,
  },

  {
    path: "/kid_detail",
    element: <KidDetail />,
  },
  {
    path: "/select_profile",
    element: <SelectProfile />,
  },
  {
    path: "/create_profile",
    element: <CreateProfile />,
  },
  {
    path: "/test_page",
    element: <TestPage />,
  },

  {
    path: "/main_page",
    element: <MainPage />,
  },

  
  {
    path: "/book_detail",
    element: <BookDetail />,
  },
  {
    path: "/add_book",
    element: <AddBook />,
  },

  {
    path: "/draw",
    element: <Draw />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};