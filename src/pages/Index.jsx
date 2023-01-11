/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Content from '../components/Index/Content';
import { NotoSans } from '../styles/GlobalFonts';

export default function Index() {
  const [ bookmarks, setBookmarks ] = useState([]);
  const [ isThrottling, setIsThrottling ] = useState(false);

  const gridRef = useRef(null);

  const getBookmarksAndUpdate = (maxReqCount) => {
    if (isThrottling) {
      return;
    }
    const config = {
      'Content-Type': 'application/json',
      params: {
        indexFrom: bookmarks.length,
        size: maxReqCount
      }
    };
    axios.get('http://localhost:7777/test', config)
      .then(res => {
        console.log(res);
        setBookmarks([...bookmarks, ...res.data]);
        setIsThrottling(false);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleScroll = () => {
    const currentScrollPosY = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;
    
    let debugFlag = false;
    if (debugFlag) {
      console.log('window.scrollY : ' + window.scrollY);
      console.log('window.innerHeight : ' + windowHeight);
      console.log('document.documentElement.scrollTop : ' + document.documentElement.scrollTop);
      console.log('document.body.scrollHeight : ' + document.body.scrollHeight);
      console.log('document.documentElement.scrollHeight : ' + document.documentElement.scrollHeight);
    }
    
    if (!isThrottling && ((currentScrollPosY + windowHeight >= fullHeight - 100) || (window.scrollY >= document.documentElement.scrollHeight * 0.7))) {
      setIsThrottling(true);
      setTimeout(async () => {
        getBookmarksAndUpdate(3);
      }, 300);
    }
  };

  useEffect(() => {
    getBookmarksAndUpdate(15);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isThrottling, bookmarks]);

  return (
    <>
      <div css={titleStlye}>내가 기록했던 말뭉치들</div>
      <div css={subtitleStlye}>말뭉치들의 기록을 찾아보세요!</div>
      <input
        css={searchMenuBarStlye}
        type="text"
        placeholder="태그나 단어, 구문등을 입력해주세요"
      />
      <div css={listContainerStyle} ref={gridRef}>
        {bookmarks.map((contents, index) => <Content key={index} datas={contents}/>)}
      </div>
    </>
  );
};

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
  margin: 35px auto 25px auto;
  padding: 5px;
  border: 2px solid #bebebe;
  border-radius: 10px;
  ${NotoSans}
  font-size: 14px;
  font-weight: 400;
  color: #1e1e1e;
`;

const listContainerStyle = css`
  display: grid;
  align-items: start;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  @media (max-width: 900px) {
    display: block;
  }
`;