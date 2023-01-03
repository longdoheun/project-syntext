/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

export default function Add() {
  return <div css={wrapper}>내가 만든 쿠키</div>;
}

const wrapper = css`
  width: 600px;
  height: 200px;
  background-color: aqua;
`;
