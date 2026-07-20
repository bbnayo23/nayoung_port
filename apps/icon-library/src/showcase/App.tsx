import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, NavLink } from 'react-router-dom';
import { StyledAppContainer, StyledHeader, StyledTopNav, StyledLogo, StyledNavLinks, StyledPageLoader } from './styled';

// 환경 변수로 dist 폴더 사용 여부 확인
const useDistFolder = import.meta.env.VITE_USE_DIST === 'true';

// 🔥 Lazy Loading - 라우트별 코드 스플리팅
const IconGallery = lazy(() => import('./pages/Gallery/IconGallery'));
const IconImportTest = lazy(() => import('./pages/ImportTest/IconImportTest'));
const UsageExamplePage = lazy(() => import('./pages/Usage/UsageExamplePage'));

// 로딩 컴포넌트
const PageLoader = () => (
  <StyledPageLoader>
    <div className="spinner" />
    <p>Loading...</p>
  </StyledPageLoader>
);

// 레이아웃 컴포넌트
const Layout = () => {
  return (
    <StyledAppContainer>
      <StyledHeader>
        <StyledTopNav>
          <StyledLogo>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Icons
          </StyledLogo>
          <StyledNavLinks>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              아이콘 갤러리
            </NavLink>
            {useDistFolder && (
              <NavLink to="/test" className={({ isActive }) => (isActive ? 'active' : '')}>
                빌드 테스트
              </NavLink>
            )}
            <NavLink to="/usage" className={({ isActive }) => (isActive ? 'active' : '')}>
              사용 예제
            </NavLink>
          </StyledNavLinks>
        </StyledTopNav>
      </StyledHeader>

      {/* Suspense로 lazy 컴포넌트 감싸기 */}
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </StyledAppContainer>
  );
};

// 라우터 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <IconGallery />
      },
      // ImportTest는 dist 폴더 사용 시에만 활성화
      ...(useDistFolder
        ? [
            {
              path: 'test',
              element: <IconImportTest />
            }
          ]
        : []),
      {
        path: 'usage',
        element: <UsageExamplePage />
      }
    ]
  }
], {
  // Vite base 에 맞춰 basename 을 잡는다. dev(base '/') → '/', 쇼케이스 빌드(base '/icons/') → '/icons'.
  // (하드코딩 '/icons' 는 dev 에서 URL '/' 와 안 맞아 라우터가 아무것도 렌더하지 않았다)
  basename: import.meta.env.BASE_URL.replace(/\/+$/, '') || '/',
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
