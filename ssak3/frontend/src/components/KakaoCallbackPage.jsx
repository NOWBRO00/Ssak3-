import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CALLBACK_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export default function KakaoCallbackPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState(CALLBACK_STATUS.LOADING);
  const [message, setMessage] = useState("카카오 로그인 중입니다...");

  const code = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("code");
  }, [location.search]);

  const kakaoError = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("error");
  }, [location.search]);

  useEffect(() => {
    if (kakaoError) {
      setStatus(CALLBACK_STATUS.ERROR);
      setMessage(`카카오 인증이 거부되었습니다. (${kakaoError})`);
      return;
    }

    if (!code) {
      setStatus(CALLBACK_STATUS.ERROR);
      setMessage("카카오 인가 코드가 전달되지 않았습니다.");
      return;
    }

    const exchangeCode = async () => {
      try {
        setStatus(CALLBACK_STATUS.LOADING);
        setMessage("카카오 토큰을 발급받는 중입니다...");

        const response = await fetch("/api/auth/kakao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "카카오 로그인에 실패했습니다.");
        }

        const data = await response.json();

        if (data?.accessToken) {
          localStorage.setItem("ssak3.accessToken", data.accessToken);
        }
        if (data?.refreshToken) {
          localStorage.setItem("ssak3.refreshToken", data.refreshToken);
        }
        if (data?.profile) {
          localStorage.setItem("ssak3.profile", JSON.stringify(data.profile));
        }

        setStatus(CALLBACK_STATUS.SUCCESS);
        setMessage("카카오 로그인에 성공했습니다. 메인 화면으로 이동합니다.");

        setTimeout(() => {
          navigate("/welcome", { replace: true });
        }, 1000);
      } catch (error) {
        console.error("카카오 로그인 연동 실패:", error);
        setStatus(CALLBACK_STATUS.ERROR);
        setMessage(error.message || "카카오 로그인 처리 중 오류가 발생했습니다.");
      }
    };

    exchangeCode();
  }, [code, kakaoError, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        textAlign: "center",
        padding: "24px",
        backgroundColor: "#f8f8f8",
      }}
    >
      <h1 style={{ fontSize: "20px", marginBottom: "8px" }}>카카오 로그인</h1>
      <p style={{ fontSize: "16px", color: "#555" }}>{message}</p>
      {status === CALLBACK_STATUS.ERROR && (
        <button
          type="button"
          onClick={() => navigate("/login", { replace: true })}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#fee500",
            color: "#000",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          로그인 화면으로 돌아가기
        </button>
      )}
    </div>
  );
}








