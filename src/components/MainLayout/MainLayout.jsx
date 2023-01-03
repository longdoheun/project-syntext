import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

// outlet에 route의 하위 컴포넌트들이 들어감
export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
