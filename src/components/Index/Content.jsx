/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { NotoSans } from '../../styles/GlobalFonts';

export default function Content(props) {
  const { tags, content } = props.datas;
  return (
    <div css={warpperStyle}>
      {tags.map((elem, index) => (<span key={index} css={tagStyle}>{elem}</span>))}
      <div css={contentStyle}>{content}</div>
    </div>
  );
};

const warpperStyle = css`
  ${NotoSans}
  background-color: #F6F6F6;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;

const tagStyle = css`
  display: inline-block;
  margin: .25em 2px;
  padding: .2em .5em;
  background-color: #15C39A;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 500;
  border-radius: 3px;
`;

const contentStyle = css`
  margin: 5px 5px 0.3em;
  font-size: 14px;
`;