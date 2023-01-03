/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";

import React from "react";

export default function GlobalStyle() {
  return <Global styles={globalStyle} />;
}

const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
  }

  html {
    width: 100%;
    height: 100%;
  }
  body {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }
  #root {
    width: 100%;
    height: 100%;
  }

  input {
    font-family: "inter";
    font-size: 16px;
    line-height: 12px;
    background-color: transparent;
    outline: none;
    border: none;
  }
`;
