/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Content from "../components/Index/Content";

const testDatas = [
  {
    tags: [ '단어', '기초'],
    content: 'Apple'
  },
  {
    tags: [ '단어', '테크' ],
    content: 'Multi Thread'
  },
  {
    tags: [ '구문' ],
    content: [ 'I am a boy.' ]
  },
  {
    tags: [ '단어' ],
    content: 'HI3'
  },
  {
    tags: [ '구문' ],
    content: 'I love you.'
  }
];

export default function Index() {
  return (
    <div css={warpperStyle}>
      <span css={titleStyle}>단어, 구문 리스트</span>
      {testDatas.map((elem, index) => (<Content key={index} metaData={elem}/>))}
    </div>
  );
}

const warpperStyle = css`
  background-color: #FFFFFF;
`;

const titleStyle = css`
  background-color: #FFFFFF;
`;