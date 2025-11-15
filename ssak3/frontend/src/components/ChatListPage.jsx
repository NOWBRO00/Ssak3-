import React, { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ChatListPage.css";

// 전역 미읽음 컨텍스트
import { useUnread } from "../state/UnreadContext";

const mockChats = [
  {
    id: "c1",
    peer: { nickname: "닉네임123" },
    lastMessage: "아직 판매 하고 계신가요?",
    lastMessageAt: "2025-11-03T07:00:00Z",
    unreadCount: 0,
  },
  {
    id: "c2",
    peer: { nickname: "닉네임1나ㅏ나ㅏㅏ23" },
    lastMessage: "제가 사겠습니다 팔아주세요",
    lastMessageAt: "2025-10-01T02:12:00Z",
    unreadCount: 4,
  },
];

function formatKoreanDate(iso) {
  const d = new Date(iso);
  const now = new Date();
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();

  if (sameDay) {
    const h = d.getHours().toString().padStart(2, "0");
    const m = d.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  }
  if (d.getFullYear() === now.getFullYear()) {
    return `${d.getMonth() + 1}월 ${d.getDate()}일`;
  }
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export default function ChatListPage({ BottomNavComponent }) {
  const nav = useNavigate();
  const chats = mockChats;

  // ✅ 전역 미읽음 합계
  const { setUnreadTotal } = useUnread();
  const unreadTotal = useMemo(
    () => chats.reduce((sum, c) => sum + (c.unreadCount || 0), 0),
    [chats]
  );

  // 목록이 바뀔 때마다 전역 합계 반영
  useEffect(() => {
    setUnreadTotal(unreadTotal);
  }, [unreadTotal, setUnreadTotal]);

  return (
    <div className="chat-shell">
      <div className="chat-frame">
        <header className="chat-topbar">
          <button className="back-btn" onClick={() => nav(-1)} aria-label="뒤로가기">
            ←
          </button>
          <h1>1:1 대화 목록</h1>
          <span />
        </header>

        <main className="chat-main">
          <ul className="chat-list">
            {chats.map((c) => (
              <li
                key={c.id}
                className="chat-item"
                role="button"
                aria-label={`${c.peer.nickname} 채팅방으로 이동`}
                // ✅ 라우터 수정 없이 쿼리스트링으로 방 ID 전달
                onClick={() => nav(`/chat/${c.id}`)}
              >
                <div className="avatar" />

                <div className="chat-content">
                  <div className="chat-row-1">
                    <span className="nickname">{c.peer.nickname}</span>
                  </div>
                  <div
                    className={
                      c.unreadCount > 0 ? "last-message unread" : "last-message"
                    }
                  >
                    {c.lastMessage}
                  </div>
                </div>

                {/* ✅ 오른쪽 메타: 날짜 위, 배지 아래 (간격 확보) */}
                <div className="right-meta">
                  <span className="date">{formatKoreanDate(c.lastMessageAt)}</span>
                  {c.unreadCount > 0 && (
                    <span className="badge">{c.unreadCount}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </main>

        {/* ✅ 하단 네비게이션 (전역 unreadTotal을 BottomNav가 직접 읽음) */}
        {BottomNavComponent ? <BottomNavComponent /> : null}
      </div>
    </div>
  );
}
