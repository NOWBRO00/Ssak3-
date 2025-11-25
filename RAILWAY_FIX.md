# Railway 배포 문제 해결 가이드

Railway는 `docker-compose.yml`을 직접 지원하지 않습니다. 각 서비스를 **개별적으로** 배포해야 합니다.

## ✅ 올바른 배포 방법

### 방법 1: 각 서비스를 개별적으로 배포 (권장)

#### 1단계: 백엔드 서비스 배포

1. Railway 대시보드에서 **"New Service"** 클릭
2. **"GitHub Repo"** 선택
3. 저장소 선택: `NOWBRO00/Ssak3-`
4. **중요**: Settings → Source에서:
   - **Root Directory**: `ssak3/backend` 설정
   - **Dockerfile Path**: `Dockerfile` (자동 감지됨)
5. **서비스 이름**: `backend` 또는 `ssak3-backend`

#### 2단계: 프론트엔드 서비스 배포

1. Railway 대시보드에서 다시 **"New Service"** 클릭
2. **"GitHub Repo"** 선택
3. **같은 저장소** 선택: `NOWBRO00/Ssak3-`
4. **중요**: Settings → Source에서:
   - **Root Directory**: `ssak3/frontend` 설정
   - **Dockerfile Path**: `Dockerfile` (자동 감지됨)
5. **서비스 이름**: `frontend` 또는 `ssak3-frontend`

#### 3단계: 환경 변수 설정

**백엔드 서비스:**
- Settings → Variables에서 추가:
```
KAKAO_CLIENT_ID=실제_값
KAKAO_CLIENT_SECRET=실제_값
KAKAO_REDIRECT_URI=https://your-frontend-url.railway.app/auth/kakao/callback
SERVER_PORT=8080
PORT=8080
```

**프론트엔드 서비스:**
- Settings → Variables에서 추가:
```
REACT_APP_KAKAO_JAVASCRIPT_KEY=실제_값
REACT_APP_KAKAO_REDIRECT_URI=https://your-frontend-url.railway.app/auth/kakao/callback
```

#### 4단계: Public URL 생성

1. **프론트엔드 서비스**의 Settings → Networking
2. **"Generate Domain"** 클릭
3. 생성된 URL을 백엔드의 `KAKAO_REDIRECT_URI`에 반영

---

### 방법 2: Railway CLI 사용 (고급)

Railway CLI를 사용하면 더 세밀한 제어가 가능합니다:

```bash
# Railway CLI 설치
npm i -g @railway/cli

# 로그인
railway login

# 프로젝트 초기화
railway init

# 백엔드 배포
cd ssak3/backend
railway up

# 프론트엔드 배포 (새 터미널)
cd ssak3/frontend
railway up
```

---

## 🔧 현재 문제 해결

### 문제: "Error creating build plan with Railpack"

**원인**: Railway가 프로젝트 루트에서 Railpack을 사용하려고 시도함

**해결책**: 
1. 기존 서비스 삭제
2. 위의 "방법 1"대로 각 서비스를 개별적으로 생성
3. 각 서비스의 Root Directory를 올바르게 설정

---

## 📝 Railway 설정 요약

### 백엔드 서비스
- **Root Directory**: `ssak3/backend`
- **Dockerfile**: `ssak3/backend/Dockerfile` (자동 감지)
- **Port**: `8080`

### 프론트엔드 서비스
- **Root Directory**: `ssak3/frontend`
- **Dockerfile**: `ssak3/frontend/Dockerfile` (자동 감지)
- **Port**: `80` (Nginx)
- **Public URL**: 생성 필요

---

## ⚠️ 주의사항

1. **서비스 간 통신**: Railway에서 각 서비스는 독립적인 URL을 가집니다
2. **CORS 설정**: 백엔드에서 프론트엔드 도메인을 허용해야 합니다
3. **환경 변수**: 각 서비스마다 별도로 설정해야 합니다

---

## 🔗 참고

- [Railway 문서 - Root Directory](https://docs.railway.app/deploy/builds#root-directory)
- [Railway 문서 - Docker](https://docs.railway.app/deploy/dockerfiles)

