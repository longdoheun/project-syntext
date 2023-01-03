/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function AppLayout(props) {
  const { children } = props;
  return <div css={warpperStyle}>{children}</div>;
}

const warpperStyle = css`
  width: 650px;
  height: 100%;
  @media (max-width: 900px) {
    width: 90%;
  }
`;
