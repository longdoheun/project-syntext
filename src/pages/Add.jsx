/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import RoundInput from "../components/RoundInput";
import useInput from "../hooks/useInput";
import { NotoSans } from "../styles/GlobalFonts";

export default function Add() {
  const [inputValue, onChangeInput] = useInput({
    word: "",
    meaning: "",
    tags: "",
  });

  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(inputValue.tags.split(","));
  }, [inputValue.tags]);

  return (
    <div css={wrapper}>
      <h1>Plese write down your word!</h1>
      <section css={previewStyle}>
        <div>417</div>
        <div css={wordStyle}>{inputValue.word}</div>
        <div css={meanStyle}>{inputValue.meaning}</div>
        <div css={tagWrapper}>
          {tags.map((tag, index) => (
            <span key={index + tag} css={tagStyle}>
              {tag}
            </span>
          ))}
          <span css={tagStyle}>+</span>
        </div>
      </section>

      <section css={inputCon}>
        <RoundInput
          inputDesc={"단어 / 구문 입력"}
          inputName={"word"}
          inputPH={"단어나 구문을 입력하세요"}
          inputValue={inputValue.word}
          inputChange={onChangeInput}
        />
        <RoundInput
          inputDesc={"해석"}
          inputName={"meaning"}
          inputPH={"뜻 풀이를 입력하세요"}
          inputValue={inputValue.meaning}
          inputChange={onChangeInput}
        />
        <RoundInput
          inputDesc={"태그"}
          inputName={"tags"}
          inputPH={"','로 태그 구분하기"}
          inputValue={inputValue.tags}
          inputChange={onChangeInput}
        />
        <button css={btnStyle}>추가하기</button>
      </section>
    </div>
  );
}

const wrapper = css`
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  gap: 20px;
`;
//preview style
const previewStyle = css`
  ${NotoSans}
  width: 100%;
  background: #f6f6f6;
  /* border: 1px solid #8b8b8b; */
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const tagWrapper = css`
  margin-top: 10px;
  display: flex;
  gap: 3px;
`;
const tagStyle = css`
  ${NotoSans}
  font-size: 12px;
  color: #ffff;

  background-color: #242424;
  /* background-color: aqua; */
  line-height: 20px;
  padding: 0px 5px;
  border-radius: 2px;
  border: 1px solid #242424;
  text-align: center;
  align-items: center;
  transition: 0.2s all ease-in-out;
  &:hover {
    background-color: #ffffff;
    color: #242424;
  }
`;
const popupStyle = css`
  position: relative;
  display: flex;
`;

//
const wordStyle = css`
  ${NotoSans}
`;
const meanStyle = css`
  ${NotoSans}
  color: #8b8b8b;
  font-size: 12px;
`;

const btnStyle = css`
  border: 1px solid #242424;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  transition: 0.5s all ease-in-out;
  &:hover {
    background-color: #242424;
    color: #ffffff;
  }
`;

const inputCon = css`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
