/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState, useRef } from "react";
import RoundInput from "../components/RoundInput";
import useInput from "../hooks/useInput";
import usePrev from "../hooks/usePrev";
import { NotoSans } from "../styles/GlobalFonts";
import { returnMarginalWidth } from "../utils/langDetection";

const RECORD_NUM_TEST = 417;

export default function Add() {
  const [wordInfos, onChangeInput] = useInput({
    word: "",
    meaning: "",
    tags: "",
  });

  const myRef = useRef();
  const [tagWidth, setTagWidth] = useState(5);
  const [tag, setTag] = useState("");
  const prevTag = usePrev(tag);

  useEffect(() => {
    if (tag.length > prevTag.length)
      return setTagWidth(
        myRef.current.offsetWidth + returnMarginalWidth(tag) || 10
      );
    if (tag.length < prevTag.length)
      return setTagWidth(
        myRef.current.offsetWidth - returnMarginalWidth(prevTag)
      );
  }, [tag]);

  const [tags, setTags] = useState([]);

  const onChangeTag = (e) => {
    setTag(e.target.value);
  };

  const setTagArr = (e) => {
    console.log(e.key);
    if (e.key === " ") {
      setTags([...tags, tag]);
      setTag("");
      setTagWidth(10);
    }

    if (tag === "" && e.keyCode === 8) {
      setTags(tags.slice(0, tags.length - 1));
    }
  };
  useEffect(() => {
    setTag("");
  }, [tags]);

  /**
   * TODO : Fix bugs (blank tag)
   */
  useEffect(() => {
    setTags(wordInfos.tags.split(","));
  }, [wordInfos.tags]);

  return (
    <div css={wrapper}>
      {/* <h1 css={titleStyle}>Plese write down your word!</h1> */}
      <section css={previewStyle}>
        <div>{RECORD_NUM_TEST}</div>
        <RoundInput
          inputDesc={"단어 / 구문 입력"}
          inputName={"word"}
          inputPH={"단어나 구문을 입력하세요"}
          inputValue={wordInfos.word}
          inputChange={onChangeInput}
        />
        <RoundInput
          inputDesc={"해석"}
          inputName={"meaning"}
          inputPH={"뜻 풀이를 입력하세요"}
          inputValue={wordInfos.meaning}
          inputChange={onChangeInput}
        />
        <div css={tagWrapper}>
          {tags.map(
            (tag, index) =>
              tag && (
                <span key={index + tag} css={tagStyle}>
                  {tag}
                </span>
              )
          )}
          <span css={tagStyle}>
            <input
              ref={myRef}
              type="text"
              maxLength={8}
              css={tagInputStyle(tagWidth)}
              name="tag"
              value={tag}
              onChange={onChangeTag}
              onKeyDown={setTagArr}
            />
          </span>
        </div>
      </section>
      <section css={previewStyle}>
        {/*<div>{RECORD_NUM_TEST}</div>
        <div css={wordStyle}>{wordInfos.word}</div>
        <div css={meanStyle}>{wordInfos.meaning}</div>
        <div css={tagWrapper}>
          {tags.map((tag, index) => (
            <span key={index + tag} css={tagStyle}>
              {tag}
            </span>
          ))}
          <span css={tagStyle}>+</span>
        </div>
      </section>
      <section css={inputConStyle}>
        <RoundInput
          inputDesc={"단어 / 구문 입력"}
          inputName={"word"}
          inputPH={"단어나 구문을 입력하세요"}
          inputValue={wordInfos.word}
          inputChange={onChangeInput}
        />
        <RoundInput
          inputDesc={"해석"}
          inputName={"meaning"}
          inputPH={"뜻 풀이를 입력하세요"}
          inputValue={wordInfos.meaning}
          inputChange={onChangeInput}
        />
        <RoundInput
          inputDesc={"태그"}
          inputName={"tags"}
          inputPH={"쉼표(,) 로 태그 구분하기"}
          inputValue={wordInfos.tags}
          inputChange={onChangeInput}
        /> */}
        <button css={btnStyle}>추가하기</button>
      </section>
    </div>
  );
}

const tagInputStyle = (width) => css`
  width: ${width}px;
  color: #fff;
`;

const titleStyle = css`
  ${NotoSans}
`;

const wrapper = css`
  /* width: 600px; */
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  gap: 20px;
`;

const previewStyle = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  ${NotoSans}
  background: #f6f6f6;
`;

const tagWrapper = css`
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  margin-top: 10px;
`;

const tagStyle = css`
  padding: 0px 5px;
  /* border: 1px solid #242424; */
  border-radius: 2px;
  align-items: center;
  line-height: 20px;
  background-color: #242424;
  background-color: #15c39a;
  ${NotoSans}
  font-size: 12px;
  color: #ffff;
  text-align: center;
  transition: 0.2s all ease-in-out;
  /* &:hover {
    background-color: #ffffff;
    color: #242424;
  } */
`;

const wordStyle = css`
  ${NotoSans}
  font-size: 32px;
`;

const meanStyle = css`
  ${NotoSans}
  font-size: 20px;
  color: #8b8b8b;
`;

const btnStyle = css`
  width: 100%;
  background-color: #242424;
  padding: 10px;
  border: 1px solid #242424;
  border-radius: 5px;
  color: #ffffff;
  transition: 0.5s all ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: #ffffff;
    color: #242424;
  }
`;

const inputConStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 50px;
`;
