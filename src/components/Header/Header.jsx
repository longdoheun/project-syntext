/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function Header() {
  return <div css={headerStyle}>Header</div>;
}

const headerStyle = css`
  background-color: aliceblue;
  width: 100%;
  height: 50px;
`;
