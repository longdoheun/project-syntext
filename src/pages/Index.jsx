/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Content from '../components/Index/Content';
import { NotoSans } from '../styles/GlobalFonts';

export default function Index() {
  const [ bookmarks, setBookmarks ] = useState([]);
  const [ isDesktopLayout, setIsDesktopLayout ] = useState(window.innerWidth > 900);
  const [ isScrollThrottling, setScrollIsThrottling ] = useState(false);
  const [ isResizeThrottling, setResizeIsThrottling ] = useState(false);
  const [ renderedCount, setReneredCount ] = useState(0);
  const [ gridDatas, setGridDatas ] = useState([[], [], []]);
  const [ girdRerenderFlag, setGridRerenderFlag ] = useState(0);
  const [ searchQuery, setSearchQuery ] = useState('');
  const [ lastInputValue, setLastInputValue ] = useState('');
  const [ isTypeing, setIsTyping ] = useState(false);
  const [ isPossibleToSendReq, setIsPossibleToSendReq ] = useState(true);
  const [ requestFailedCount, setRequestFailedCount ] = useState(0);
  
  const layoutRef = useRef(null);
  const gridRefs = useRef([]);

  const girdRefCallbackCol1 = useCallback((node) => {
    gridRefs.current[0] = node;
    if (node !== null) {
      if (!!searchQuery || (!searchQuery && !!lastInputValue)) {
        /**
         * NOTICE : Cause some bugs when search by some words mmakes result with none in mobile display 
         * -> switching from mobile to desktop resize makes bugs
         */
        setGridDatas([[], [], []]);
        /**
         * NOTICE : Double dependency tracking on useEffect
         * -> change this code later
         */
        setReneredCount(0);
      }
      setGridRerenderFlag(girdRerenderFlag ? 0 : 1);
    }
    setLastInputValue(searchQuery);
  }, [layoutRef, isDesktopLayout, bookmarks, searchQuery]);

  const girdRefCallbackCol2 = useCallback((node) => {
    gridRefs.current[1] = node;
  }, [layoutRef, bookmarks, searchQuery]);

  const girdRefCallbackCol3 = useCallback((node) => {
    gridRefs.current[2] = node;
  }, [layoutRef, bookmarks, searchQuery]);

  const desktopLayout = (
    <div ref={layoutRef} css={desktopLayoutStyle}>
      <div ref={girdRefCallbackCol1}>{!gridDatas[0] ? null : gridDatas[0].map((data, index) => <Content key={index} datas={data} />)}</div>
      <div ref={girdRefCallbackCol2}>{!gridDatas[1] ? null : gridDatas[1].map((data, index) => <Content key={index} datas={data} />)}</div>
      <div ref={girdRefCallbackCol3}>{!gridDatas[2] ? null : gridDatas[2].map((data, index) => <Content key={index} datas={data} />)}</div>
    </div>
  );

  const mobileLayout = (
    <div ref={layoutRef}>
      {bookmarks.filter((value) => value.content.includes(searchQuery)).map((contents, index) => <Content key={index} datas={contents}/>)}
    </div>
  );

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
    axios.get('http://localhost:7777/bookmark/testuser01/', config)
      .then(res => {
        setBookmarks([...bookmarks, ...res.data]);
      })
      .catch(e => {
        setRequestFailedCount(requestFailedCount + 1);
        console.log(e);
        console.log(`Request Error : ${e.response.data}`);
      });
  };

  const handleScroll = () => {
    if (isPossibleToSendReq && !isScrollThrottling && (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight * 0.6)) {
      setScrollIsThrottling(true);
      setTimeout(async () => {
        setScrollIsThrottling(false);
        getBookmarksAndUpdate(6);
      }, 300);
    }
  };

  const handleResize = () => {
    if (window.innerWidth > 900 && isDesktopLayout === false) {
      if (!isResizeThrottling) {
        setResizeIsThrottling(true);
        setTimeout(async () => {
          setIsDesktopLayout(true);
          setResizeIsThrottling(false);
        }, 300);
      }
    } else if (window.innerWidth <= 900 && isDesktopLayout === true) {
      if (!isResizeThrottling) {
        setResizeIsThrottling(true);
        setTimeout(async () => {
          setIsDesktopLayout(false);
          setResizeIsThrottling(false);
        }, 300);
      }
    }
  };

  const handleTyping = (e) => {
    const currentInputValue = e.target.value;
    if (!isTypeing) {
      setTimeout(() => {
        setSearchQuery(!!currentInputValue ? currentInputValue : '');
      }, 300);
    }
  };

  useEffect(() => {
    getBookmarksAndUpdate(30);
  }, []);
  
  useEffect(() => {
    if ((typeof bookmarks[renderedCount] === 'undefined') || (window.innerWidth <= 900)) {
      return;
    }
    if (!gridRefs.current[0] || !gridRefs.current[1] || !gridRefs.current[0]) {
      return;
    }
    if (!bookmarks[renderedCount].content.includes(searchQuery)) {
      setReneredCount(renderedCount + 1);
      return;
    }
    const gridSizes = [
      gridRefs.current[0].scrollHeight,
      gridRefs.current[1].scrollHeight,
      gridRefs.current[2].scrollHeight
    ];
    switch (gridSizes.indexOf(Math.min(...gridSizes))) {
      case 0:
        setGridDatas([
          [...gridDatas[0], bookmarks[renderedCount]], [...gridDatas[1]], [...gridDatas[2]]
        ]);
        setReneredCount(renderedCount + 1);
        break;
      case 1:
        setGridDatas([
          [...gridDatas[0]], [...gridDatas[1], bookmarks[renderedCount]], [...gridDatas[2]]
        ]);
        setReneredCount(renderedCount + 1);
        break;
      case 2:
        setGridDatas([
          [...gridDatas[0]], [...gridDatas[1]], [...gridDatas[2], bookmarks[renderedCount]]
        ]);
        setReneredCount(renderedCount + 1);
        break;
      default:
        break;
    }
  }, [girdRerenderFlag, renderedCount]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    if (isPossibleToSendReq && requestFailedCount >= 3) {
      setIsPossibleToSendReq(false);
      setTimeout(async () => {
        setIsPossibleToSendReq(true);
        requestFailedCount(0);
      }, 5000);
    }
    /**
     * NOTICE : Makes too much server connection - fix later
     */
    if (isPossibleToSendReq && !isScrollThrottling && (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight * 0.6)) {
      //getBookmarksAndUpdate(6);
      setTimeout(async () => {
        getBookmarksAndUpdate(6);
      }, 300);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    }
  });
  
  return (
    <>
      <div css={titleStlye}>북마크</div>
      <div css={subtitleStlye}>말뭉치들의 기록을 찾아보세요!</div>
      <input
        css={searchMenuBarStlye}
        type="text"
        placeholder="태그나 단어, 구문등을 입력해주세요"
        onChange={handleTyping}
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

const desktopLayoutStyle = css`
  display: grid;
  align-items: start;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
`;