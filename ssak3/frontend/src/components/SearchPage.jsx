import React, { useState } from "react";
import flamel1 from "../image/flamel-ai-edit-1982838-2-2-4.png";
import flamel2 from "../image/flamel-ai-edit-1982838-2-2-3.png";
import group115 from "../image/Group 23.png";
import vector33 from "../image/vector-33.png";
import "../styles/SearchPage.css";

import BottomNav from "./BottomNav";

// ✅ 하트 아이콘 (SVG)
function HeartIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("바람막이");

  // ✅ 임시 최근검색어 3개만
  const [recent, setRecent] = useState(["자전거", "아이폰", "상품권"]);

  const [filters, setFilters] = useState(["의류", "남성", "중고"]);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortType, setSortType] = useState("인기순");
  const [products] = useState([
    {
      id: 1,
      title: "썸플레이스 후드 바람막이 중고",
      price: 52800,
      seller: "닉네임12345",
      likes: 11,
      status: "available",
      img: "https://via.placeholder.com/120x120?text=상품1",
    },
    {
      id: 2,
      title: "썸플레이스 후드 바람막이 중고",
      price: 52800,
      seller: "닉네임12345",
      likes: 11,
      status: "soldout",
      img: "https://via.placeholder.com/120x120?text=판매완료",
    },
  ]);

  const handleInputChange = (e) => setSearchTerm(e.target.value);
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setRecent((prev) =>
      prev.includes(searchTerm) ? prev : [searchTerm, ...prev.slice(0, 2)]
    );
    // TODO: 실제 검색 호출
  };

  const handleRemoveFilter = (tag) =>
    setFilters((prev) => prev.filter((f) => f !== tag));

  const handleSortSelect = (type) => {
    setSortType(type);
    setSortOpen(false);
    // TODO: 실제 정렬 적용
  };

  return (
    <div className="search-screen">
      <div className="search-frame">
        {/* 상단바 */}
        <header className="sp-topbar">
          <button className="sp-back" aria-label="뒤로가기" onClick={() => window.history.back()}>
            <img src={vector33} alt="" />
          </button>
          <img className="sp-logo" src={group115} alt="logo" />
          <div className="sp-mascot">
            <img className="mascot-1" src={flamel1} alt="" />
            <img className="mascot-2" src={flamel2} alt="" />
          </div>
        </header>

        {/* 검색창 */}
        <form className="sp-searchbar" onSubmit={handleSearch}>
          <input
            className="sp-input"
            type="text"
            placeholder="원하시는 물건이 있으신가요?"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button className="sp-searchbtn" type="submit" aria-label="검색">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2b0c0b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>

        {/* 최근검색어 */}
        <section className="sp-section">
          <div className="sp-section-title">최근 검색어</div>
          <div className="chips">
            {recent.map((r) => (
              <span key={r} className="chip">{r}</span>
            ))}
          </div>
        </section>

        {/* 필터칩 */}
        <section className="sp-section">
          <div className="chips">
            {filters.map((f) => (
              <span key={f} className="chip filter">
                {f}
                <button className="chip-x" onClick={() => handleRemoveFilter(f)} aria-label="필터 제거">
                  ×
                </button>
              </span>
            ))}
          </div>
        </section>

        {/* 상품 개수 + 정렬 */}
        <div className="sp-list-header">
          <div className="left">
            <span className="label">상품</span>
            <span className="count">{products.length}</span>
          </div>
          <button className="right" onClick={() => setSortOpen(true)}>
            <span className="sort">{sortType}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M7 10l5 5 5-5" stroke="#442323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* 상품 목록 */}
        <div className="sp-product-list">
          {products.map((p) => (
            <article key={p.id} className="sp-card">
              <div className="thumb">
                <img src={p.img} alt={p.title} />
                {p.status === "soldout" && <div className="sold">판매완료</div>}
              </div>
              <div className="info">
                <div className="category">의류</div>
                <h3 className="title">{p.title}</h3>
                <div className="price">{p.price.toLocaleString()}원</div>
                <div className="meta">
                  <span className="seller">{p.seller}</span>
                  <span className="likes">
                    <HeartIcon />
                    {p.likes}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 정렬 바텀시트 */}
        {sortOpen && (
          <div className="sheet-backdrop" onClick={() => setSortOpen(false)}>
            <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
              <button className="sheet-item" onClick={() => handleSortSelect("인기순")}>인기순</button>
              <button className="sheet-item" onClick={() => handleSortSelect("최신순")}>최신순</button>
              <button className="sheet-item" onClick={() => handleSortSelect("거래 가능")}>거래 가능</button>
              <button className="sheet-item close" onClick={() => setSortOpen(false)}>닫기</button>
            </div>
          </div>
        )}

        {/* 하단 여유 + 네비 */}
        <div className="sp-bottom-space" />
        <BottomNav />
      </div>
    </div>
  );
}
