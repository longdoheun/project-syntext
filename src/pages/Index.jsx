/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from 'react';
import Content from "../components/Index/Content";

const testDatas = [
  {
    tags: [ '단어', '기초'],
    content: 'Apple'
  },
  {
    tags: [ '단어', '테크', '전공' ],
    content: 'Multi-Threaded'
  },
  {
    tags: [ '구문', '기초' ],
    content: [ 'I am a boy.' ]
  },
  {
    tags: [ '단어' ],
    content: 'Orange'
  },
  {
    tags: [ '구문' ],
    content: 'I love you.'
  },
  {
    tags: [ '구문', '장문' ],
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
];

export default function Index() {
  const [ list, setList ] = useState(testDatas);

  return (
    <div css={warpperStyle}>
      <span css={titleStyle}>단어, 구문 리스트</span>
      {list.map((elem, index) => (<Content key={index} metaData={elem}/>))}
    </div>
  );
}

const warpperStyle = css`
  background-color: #FFFFFF;
  width: 650px;
`;

const titleStyle = css`

`;