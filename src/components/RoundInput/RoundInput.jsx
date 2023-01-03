/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

export default function RoundInput({
  inputDesc,
  inputName,
  inputValue,
  inputPH,
  inputChange,
}) {
  return (
    <div css={containerStyle}>
      {inputDesc ? <p css={descStyle}>{inputDesc}</p> : null}
      <label css={labelStyle}>
        <input
          css={inputStyle}
          name={inputName}
          value={inputValue}
          placeholder={inputPH}
          onChange={inputChange}
        />
      </label>
    </div>
  );
}

//inputsylte
const labelStyle = css`
  border: 1px solid #8b8b8b;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  transition: 0.2s all ease-in-out;
  &:hover {
    border-color: #242424;
  }
`;

const containerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const inputStyle = css`
  font-size: 16px;
  width: 100%;
`;

const descStyle = css`
  font-family: "inter";
  font-size: 12px;
  font-weight: 600;
`;
