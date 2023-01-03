/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function Content(props) {
  const { tags, content } = props.metaData;
  return (
    <div css={warpperStyle}>
      {tags.map((elem, index) => (<span key={index} css={tagStyle}>{elem}</span>))}
      <div css={contentStyle}>{content}</div>
    </div>
  );
}

const warpperStyle = css`
  background-color: #FFFFFF;
`;

const tagStyle = css`
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #15C39A;
  color: #FFFFFF;
  font-size: 15px;
  //margin-right: 5px;
  display: inline-block;
  border-radius: 3px;
  padding: .2em .5em .3em;
  font-weight: 600;
  margin: .25em 3px;
`;

const contentStyle = css`
  background-color: #FFFFFF;
`;