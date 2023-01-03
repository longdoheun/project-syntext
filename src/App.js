/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import Add from "./pages/Add";
import Daily from "./pages/Daily";
import Main from "./pages/Main";
import Memory from "./pages/Memory";

function App() {
  return (
    <div css={AppStyle}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/add" element={<Add />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/daily" element={<Daily />} />
        </Route>
      </Routes>
    </div>
  );
}

const AppStyle = css`
  width: 100%;
  height: 100%;
`;

export default App;
