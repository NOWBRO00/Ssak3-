import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import WelcomePage from "./components/WelcomePage";
import MainPage from "./components/MainPage";
import MyPage from "./components/MyPage";
import ProductPostPage from "./components/ProductPostPage";
import ChatListPage from "./components/ChatListPage";
import ChatRoomPage from "./components/ChatRoomPage";
import BottomNav from "./components/BottomNav";
import SearchPage from "./components/SearchPage";
import KakaoCallbackPage from "./components/KakaoCallbackPage";
// ✅ 전역 미읽음 컨텍스트
import { UnreadProvider } from "./state/UnreadContext";

function App() {
  const isLoggedIn = true; // 개발 중엔 true, 나중엔 상태로 교체

  return (
    <UnreadProvider>
      <BrowserRouter>
        <Routes>
          {/* 기본 진입 → 로그인 */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/kakao/callback" element={<KakaoCallbackPage />} />
          <Route path="/welcome" element={<WelcomePage />} />

          {/* 메인 */}
          <Route
            path="/home"
            element={isLoggedIn ? <MainPage /> : <Navigate to="/login" replace />}
          />

          {/* 마이페이지 */}
          <Route
            path="/mypage"
            element={isLoggedIn ? <MyPage /> : <Navigate to="/login" replace />}
          />

          {/* 상품등록 */}
          <Route
            path="/post"
            element={isLoggedIn ? <ProductPostPage /> : <Navigate to="/login" replace />}
          />

          {/* 채팅 목록 */}
          <Route
            path="/chat"
            element={
              isLoggedIn ? (
                <ChatListPage BottomNavComponent={BottomNav} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* 채팅방 */}
          <Route
            path="/chat/:roomId"
            element={
              isLoggedIn ? (
                <ChatRoomPage BottomNavComponent={BottomNav} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* ✅ 검색페이지 추가 */}
          <Route
            path="/search"
            element={isLoggedIn ? <SearchPage /> : <Navigate to="/login" replace />}
          />

          {/* 나머지 → 로그인 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </UnreadProvider>
  );
}

export default App;
