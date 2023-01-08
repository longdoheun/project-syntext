/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export default function RoundInput({
  inputDesc,
  inputName,
  inputValue,
  inputPH,
  inputChange
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

const labelStyle = css`
  width: 100%;
  padding: 10px;
  border: 1px solid #8b8b8b;
  border-radius: 5px;
  transition: 0.2s all ease-in-out;
  &:hover {
    border-color: #242424;
  }
`;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
`;

const inputStyle = css`
  width: 100%;  
  font-size: 16px;
`;

const descStyle = css`
  font-family: 'inter';
  font-size: 12px;
  font-weight: 600;
`;
