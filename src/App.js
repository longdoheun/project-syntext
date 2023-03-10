/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import Add from "./pages/Add";
import Daily from "./pages/Daily";
import Index from "./pages/Index";
import Memory from "./pages/Memory";
import NotFound from './pages/NotFound';

function App() {
  return (
    <div css={AppStyle}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/add" element={<Add />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

const AppStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

export default App;
