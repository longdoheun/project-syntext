/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Content from '../components/Index/Content';
import { NotoSans } from '../styles/GlobalFonts';

export default function Index() {
  const [ bookmarks, setBookmarks ] = useState([]);
  const [ isScrollThrottling, setScrollIsThrottling ] = useState(false);

  const [ isDesktopLayout, setIsDesktopLayout ] = useState(window.innerWidth > 900 ? true : false);
  const [ isResizeThrottling, setResizeIsThrottling ] = useState(false);

  const gridRef = useRef(null);
  
  const desktopLayout = (
    <div>
      This is desktop layout!
    </div>
  );
  
  const mobileLayout = (
    <div ref={gridRef}>
      {bookmarks.map((contents, index) => <Content key={index} datas={contents}/>)}
    </div>
  );

  let lastScrollY = 0;

  const getBookmarksAndUpdate = (maxReqCount) => {
    if (isScrollThrottling) {
      return;
    }
    const config = {
      'Content-Type': 'application/json',
      params: {
        indexFrom: bookmarks.length,
        size: maxReqCount
      }
    };
    axios.get('http://localhost:7777/test/bookmarks', config)
      .then(res => {
        console.log(res);
        setBookmarks([...bookmarks, ...res.data]);
      })
      .catch(e => {
        console.log(e);
        console.log(`Request Error : ${e.response.data}`);
      });
  };

  const handleScroll = () => {
    const isScrollDown = window.scrollY > lastScrollY ? true : false;
    const currentScrollPosY = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;
    lastScrollY = window.scrollY;
    
    if (!isScrollThrottling && isScrollDown && ((currentScrollPosY + windowHeight >= fullHeight - 100) || (lastScrollY >= document.documentElement.scrollHeight * 0.7))) {
      setScrollIsThrottling(true);
      setTimeout(async () => {
        getBookmarksAndUpdate(3);
        setScrollIsThrottling(false);
      }, 300);
    }
  };

  const handleResize = () => {
    if (window.innerWidth > 900 && isDesktopLayout === false) {
      if (!isResizeThrottling) {
        setResizeIsThrottling(true);
        setTimeout(() => {
          setIsDesktopLayout(true);
          setResizeIsThrottling(false);    
        }, 300);
      }
    } else if (window.innerWidth <= 900 && isDesktopLayout === true) {
      if (!isResizeThrottling) {
        setResizeIsThrottling(true);
        setTimeout(() => {
          setIsDesktopLayout(false);
          setResizeIsThrottling(false);    
        }, 300);
      }
    }
  };

  useEffect(() => {
    getBookmarksAndUpdate(15);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [isDesktopLayout]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrollThrottling, bookmarks]);

  return (
    <>
      <div css={titleStlye}>북마크</div>
      <div css={subtitleStlye}>말뭉치들의 기록을 찾아보세요!</div>
      <input
        css={searchMenuBarStlye}
        type="text"
        placeholder="태그나 단어, 구문등을 입력해주세요"
      />
      {isDesktopLayout ? desktopLayout : mobileLayout}
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

/* NOTICE : No more used, delete later
const listContainerStyle = css`
  display: grid;
  align-items: start;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
  @media (max-width: 900px) {
    display: block;
  }
`;
*/