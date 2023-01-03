/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Content from "../components/Index/Content";

export default function AppLayout(props) {
  const { children } = props;
  return (
    <div css={warpperStyle}>
      {children}
    </div>
  );
}

const warpperStyle = css`
  @media (max-width: 900px) {
    width: 90%;
  }
`;