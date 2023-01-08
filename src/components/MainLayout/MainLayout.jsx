import React from 'react';
import { Outlet } from 'react-router-dom';
import PageFrameLayout from './PageFrameLayout';
import Header from '../Header/Header';

/**
 * NOTICE : outlet에 route의 하위 컴포넌트들이 들어감
 */ 
export default function MainLayout() {
  return (
    <>
      <Header />
      <PageFrameLayout>
        <Outlet />
      </PageFrameLayout>
    </>
  );
}
