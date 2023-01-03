/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

export default function Add() {
  return (
    <div css={wrapper}>
      <div>내가 만든 구문</div>
      <div>i wish i had expressed!</div>
    </div>
  );
}

const wrapper = css`
  width: 600px;
  height: 200px;
  background-color: aqua;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
