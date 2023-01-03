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
      <p css={descStyle}>{inputDesc}</p>
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
  border: 1px solid #242424;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
`;

const containerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const inputStyle = css`
  width: 100%;
`;

const descStyle = css`
  font-family: "inter";
  font-size: 12px;
  font-weight: 600;
`;
