# Ssak3

싹쓰리 프로젝트 - 카카오 로그인 기반 중고거래 플랫폼

## 프로젝트 구조

```
ssak3/
├── backend/     # Spring Boot 백엔드
└── frontend/    # React 프론트엔드
```

## 기술 스택

### Backend
- Spring Boot 3.5.7
- Java 17
- Gradle

### Frontend
- React 19.1.1
- React Router DOM 7.9.2

## 환경 설정

### Backend
1. `ssak3/backend/.env` 파일 생성
2. 다음 환경 변수 설정:
   ```
   KAKAO_CLIENT_ID=your_rest_api_key
   KAKAO_CLIENT_SECRET=your_client_secret
   KAKAO_REDIRECT_URI=http://localhost:3000/auth/kakao/callback
   ```

### Frontend
1. `ssak3/frontend/.env` 파일 생성
2. 다음 환경 변수 설정:
   ```
   REACT_APP_KAKAO_JAVASCRIPT_KEY=your_javascript_key
   REACT_APP_KAKAO_REDIRECT_URI=http://localhost:3000/auth/kakao/callback
   ```

## 실행 방법

### Backend
```bash
cd ssak3/backend
./gradlew bootRun
```

### Frontend
```bash
cd ssak3/frontend
npm install
npm start
```

## 주요 기능

- 카카오 OAuth 로그인
- 사용자 인증 및 토큰 관리

