/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import Content from '../components/Index/Content';
import { NotoSans } from '../styles/GlobalFonts';

const testDatas = [
  {
    tags: ['단어', '기초'],
    content: 'Apple',
  },
  {
    tags: ['단어', '테크', '전공'],
    content: 'Multi-Threaded',
  },
  {
    tags: ['구문', '기초'],
    content: ['I am a boy.'],
  },
  {
    tags: ['단어'],
    content: 'Orange',
  },
  {
    tags: ['구문'],
    content: 'I love you.',
  },
  {
    tags: ['구문', '장문'],
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

export default function Index() {
  const [list, setList] = useState(testDatas);
  return (
    <>
      <div css={titleStlye}>내가 기록했던 말뭉치들</div>
      <div css={subtitleStlye}>말뭉치들의 기록을 찾아보세요!</div>
      <input
        css={searchMenuBarStlye}
        type="text"
        placeholder="태그나 단어, 구문등을 입력해주세요"
      />
      {list.map((elem, index) => (
        <Content key={index} metaData={elem} />
      ))}
    </>
  );
}

const titleStlye = css`
  width: 100%;
  margin-top: 5px;
  ${NotoSans}
  text-align: left;
  font-size: 32px;
  font-weight: 600;
`;

const subtitleStlye = css`
  width: 100%;
  ${NotoSans}
  text-align: left;
  font-size: 16px;
  font-weight: 400;
`;

const searchMenuBarStlye = css`
  display: block;
  width: 100%;
  margin: 35px auto 15px auto;
  padding: 5px;
  border: 2px solid #bebebe;
  border-radius: 10px;
  ${NotoSans}
  font-size: 14px;
  font-weight: 400;
  color: #1e1e1e;
`;
