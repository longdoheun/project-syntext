/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Content from '../components/Index/Content';
import { NotoSans } from '../styles/GlobalFonts';

export default function Index() {
  const [ bookmarks, setBookmarks ] = useState([]);

  const [ isDesktopLayout, setIsDesktopLayout ] = useState(window.innerWidth > 900 ? true : false);
  const [ isScrollThrottling, setScrollIsThrottling ] = useState(false);
  const [ isResizeThrottling, setResizeIsThrottling ] = useState(false);

  const [ gridCol1Datas, setGridCol1Datas ] = useState([]);
  const [ gridCol2Datas, setGridCol2Datas ] = useState([]);
  const [ gridCol3Datas, setGridCol3Datas ] = useState([]);
  const [ renderedCount, setReneredCount ] = useState(0);

  const layoutRef = useRef(null);
  const gridRefs = useRef([]);

  const [ data, setData ] = useState(0);
  
  useEffect(() => {
    console.log('gridRefs.current');
    console.log(gridRefs.current);
  });

  const setRef1 = useCallback((node) => {
    gridRefs.current[0] = node;
    console.log(gridRefs.current);
    if (node !== null) {
      setData(data + 1);
      if (!bookmarks || (typeof bookmarks[renderedCount] === 'undefined') || (window.innerWidth <= 900)) {
        console.log('early exist for no bookmarks or mobile height!');
        return;
      }
      if (!gridRefs.current[0] || !gridRefs.current[1] || !gridRefs.current[0]) {
        console.log('early exist for no grid refs!');
        return;
      }
      const gridSizes = [
        gridRefs.current[0].scrollHeight,
        gridRefs.current[1].scrollHeight,
        gridRefs.current[2].scrollHeight
      ];
      switch (gridSizes.indexOf(Math.min(...gridSizes))) {
        case 0:
          setGridCol1Datas([...gridCol1Datas, bookmarks[renderedCount]]);
          setReneredCount(renderedCount + 1);
          break;
        case 1:
          setGridCol2Datas([...gridCol2Datas, bookmarks[renderedCount]]);
          setReneredCount(renderedCount + 1);
          break;
        case 2:
          setGridCol3Datas([...gridCol3Datas, bookmarks[renderedCount]]);
          setReneredCount(renderedCount + 1);
          break;
        default:
          break;
      }
    } else {
      console.log('ref attached!');
    }
  }, [layoutRef, bookmarks]);

  const setRef2 = useCallback((node) => {
    gridRefs.current[0] = node;
    console.log(gridRefs.current);
    if (node !== null) {
      setData(data + 1);
      if (!bookmarks || (typeof bookmarks[renderedCount] === 'undefined') || (window.innerWidth <= 900)) {
        console.log('early exist for no bookmarks or mobile height!');
        return;
      }
      if (!gridRefs.current[0] || !gridRefs.current[1] || !gridRefs.current[0]) {
        console.log('early exist for no grid refs!');
        return;
      }
      const gridSizes = [
        gridRefs.current[0].scrollHeight,
        gridRefs.current[1].scrollHeight,
        gridRefs.current[2].scrollHeight
      ];
      switch (gridSizes.indexOf(Math.min(...gridSizes))) {
        case 0:
          setGridCol1Datas([...gridCol1Datas, bookmarks[renderedCount]]);
          setReneredCount(renderedCount + 1);
          break;
        case 1:
          setGridCol2Datas([...gridCol2Datas, bookmarks[renderedCount]]);
          setReneredCount(renderedCount + 1);
          break;
        case 2:
          setGridCol3Datas([...gridCol3Datas, bookmarks[renderedCount]]);
          setReneredCount(renderedCount + 1);
          break;
        default:
          break;
      }
    } else {
      console.log('ref attached!');
    }
  }, [layoutRef, bookmarks]);

  const setRef3 = useCallback((node) => {
    gridRefs.current[0] = node;
    console.log(gridRefs.current);
    if (node !== null) {
      setData(data + 1);
      if (!bookmarks || (typeof bookmarks[renderedCount] === 'undefined') || (window.innerWidth <= 900)) {
        console.log('early exist for no bookmarks or mobile height!');
        return;
      }
      if (!gridRefs.current[0] || !gridRefs.current[1] || !gridRefs.current[0]) {
        console.log('early exist for no grid refs!');
        return;
      }
      const gridSizes = [
        gridRefs.current[0].scrollHeight,
        gridRefs.current[1].scrollHeight,
        gridRefs.current[2].scrollHeight
      ];
      switch (gridSizes.indexOf(Math.min(...gridSizes))) {
        case 0:
          setGridCol1Datas([...gridCol1Datas, bookmarks[renderedCount]]);
          setReneredCount(renderedCount + 1);
          break;
        case 1:
          setGridCol2Datas([...gridCol2Datas, bookmarks[renderedCount]]);
          setReneredCount(renderedCount + 1);
          break;
        case 2:
          setGridCol3Datas([...gridCol3Datas, bookmarks[renderedCount]]);
          setReneredCount(renderedCount + 1);
          break;
        default:
          break;
      }
    } else {
      console.log('ref attached!');
    }
  }, [layoutRef, bookmarks]);

  const desktopLayout = (
    <div ref={layoutRef} css={desktopLayoutStyle}>
      <div ref={setRef1} id="gird-col-1">{!gridCol1Datas ? null : gridCol1Datas.map((data, index) => <Content key={index} datas={data} />)}</div>
      <div ref={setRef2} id="grid-col-3">{!gridCol2Datas ? null : gridCol2Datas.map((data, index) => <Content key={index} datas={data} />)}</div>
      <div ref={setRef3} id="gird-col-2">{!gridCol3Datas ? null : gridCol3Datas.map((data, index) => <Content key={index} datas={data} />)}</div>
    </div>
  );
  
  const mobileLayout = (
    <div ref={layoutRef}>
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
        setBookmarks([...bookmarks, ...res.data]);
      })
      .catch(e => {
        //console.log(e);
        //console.log(`Request Error : ${e.response.data}`);
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

  useEffect(() => {
    getBookmarksAndUpdate(15);
  }, []);
  
  useEffect(() => {
    if ((typeof bookmarks[renderedCount] === 'undefined') || (window.innerWidth <= 900)) {
      return;
    }
    /**
     *  
     * NOTICE : Critical point
     * when resizing is occured from mobile size to desktop in window size's boundery(+-900px),
     * ref of grid1, 2, 3 is undefined. so undefined reference error occured.
     * 
     */
    if (!gridRefs.current[0] || !gridRefs.current[1] || !gridRefs.current[0]) {
      return;
    }
    const gridSizes = [
      gridRefs.current[0].scrollHeight,
      gridRefs.current[1].scrollHeight,
      gridRefs.current[2].scrollHeight
    ];
    switch (gridSizes.indexOf(Math.min(...gridSizes))) {
      case 0:
        setGridCol1Datas([...gridCol1Datas, bookmarks[renderedCount]]);
        setReneredCount(renderedCount + 1);
        break;
      case 1:
        setGridCol2Datas([...gridCol2Datas, bookmarks[renderedCount]]);
        setReneredCount(renderedCount + 1);
        break;
      case 2:
        setGridCol3Datas([...gridCol3Datas, bookmarks[renderedCount]]);
        setReneredCount(renderedCount + 1);
        break;
      default:
        break;
    }
  }, [bookmarks, renderedCount]);

  useEffect(() => {
    if (layoutRef.current.scrollHeight < window.innerHeight) {
      getBookmarksAndUpdate(3);
    }
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
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
      />
      {isDesktopLayout ? data : null}
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