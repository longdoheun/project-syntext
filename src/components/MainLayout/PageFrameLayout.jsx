/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function PageFrameLayout({ children }) {
  return <div css={pageFrameStyle}>{children}</div>;
}

const pageFrameStyle = css`
  width: 650px;
  height: 100%;
  @media (max-width: 900px) {
    width: 90%;
  }
`;
