# Render 배포 가이드

Render를 사용하여 Ssak3 프로젝트를 무료로 배포하는 단계별 가이드입니다.

## 📋 사전 준비

1. **GitHub 저장소 준비** ✅
   - 저장소: `https://github.com/NOWBRO00/Ssak3-.git`
   - Docker 설정 파일들이 모두 푸시되어 있음

2. **카카오 개발자 콘솔 준비**
   - 배포 후 URL을 등록해야 합니다

## 🚀 배포 단계

### 1단계: Render 가입 및 프로젝트 생성

1. **Render 가입**
   - https://render.com 접속
   - "Get Started for Free" 클릭
   - GitHub로 로그인

2. **New Web Service 생성**
   - 대시보드에서 "New +" 클릭
   - "Web Service" 선택

3. **GitHub 저장소 연결**
   - "Connect account" 또는 저장소 선택
   - 저장소: `NOWBRO00/Ssak3-` 선택
   - "Connect" 클릭

### 2단계: 서비스 배포 방법

Render는 `docker-compose.yml`을 직접 지원하지 않으므로, **각 서비스를 개별적으로 배포**해야 합니다.

#### 방법 A: 백엔드 서비스 배포

1. **New Web Service** 클릭
2. GitHub 저장소 연결: `NOWBRO00/Ssak3-`
3. 설정:
   - **Name**: `ssak3-backend`
   - **Environment**: `Docker`
   - **Region**: 가장 가까운 지역
   - **Branch**: `main`
   - **Root Directory**: `ssak3/backend`
   - **Dockerfile Path**: `Dockerfile` (자동 감지)

#### 방법 B: 프론트엔드 서비스 배포

1. 다시 **New Web Service** 클릭
2. 같은 저장소 선택: `NOWBRO00/Ssak3-`
3. 설정:
   - **Name**: `ssak3-frontend`
   - **Environment**: `Docker`
   - **Region**: 같은 지역 선택
   - **Branch**: `main`
   - **Root Directory**: `ssak3/frontend`
   - **Dockerfile Path**: `Dockerfile` (자동 감지)

#### 고급 설정 (Advanced)

1. **Docker Command**: 비워두기 (docker-compose.yml 사용)

2. **Docker Context**: `.` (프로젝트 루트)

### 3단계: 환경 변수 설정

각 서비스마다 별도로 환경 변수를 설정해야 합니다.

#### 백엔드 서비스 환경 변수

백엔드 서비스의 "Environment" 탭에서 추가:

```
KAKAO_CLIENT_ID=실제_REST_API_키
KAKAO_CLIENT_SECRET=실제_Client_Secret
KAKAO_REDIRECT_URI=https://ssak3-frontend.onrender.com/auth/kakao/callback
SERVER_PORT=8080
PORT=8080
```

#### 프론트엔드 서비스 환경 변수

프론트엔드 서비스의 "Environment" 탭에서 추가:

```
REACT_APP_KAKAO_JAVASCRIPT_KEY=실제_JavaScript_키
REACT_APP_KAKAO_REDIRECT_URI=https://ssak3-frontend.onrender.com/auth/kakao/callback
```

**참고**: 프론트엔드 URL은 배포 후 받게 됩니다. 먼저 프론트엔드를 배포하고 URL을 받은 후, 백엔드 환경 변수를 업데이트하세요.

### 4단계: 배포 시작

1. 각 서비스에서 **"Create Web Service"** 클릭
2. 배포가 자동으로 시작됩니다
3. **프론트엔드를 먼저 배포**하는 것을 권장합니다 (URL을 받기 위해)
4. 로그를 확인하여 빌드 진행 상황 모니터링

### 5단계: Public URL 확인 및 업데이트

1. **프론트엔드 서비스** 배포 완료 후
2. 대시보드에서 프론트엔드 URL 확인 (예: `https://ssak3-frontend.onrender.com`)
3. **백엔드 서비스**의 환경 변수 업데이트:
   - `KAKAO_REDIRECT_URI`를 프론트엔드 URL로 변경
   - "Save Changes" 클릭 (자동 재배포)

### 6단계: 카카오 개발자 콘솔 설정

배포가 완료되면 프론트엔드 URL을 받게 됩니다 (예: `https://ssak3-frontend.onrender.com`)

1. **플랫폼 등록**
   - https://developers.kakao.com/ 접속
   - 내 애플리케이션 → 앱 설정 → 플랫폼
   - Web 플랫폼 추가:
     - 사이트 도메인: `https://ssak3.onrender.com`

2. **Redirect URI 등록**
   - 내 애플리케이션 → 제품 설정 → 카카오 로그인 → Redirect URI
   - `https://ssak3.onrender.com/auth/kakao/callback` 추가

3. **환경 변수 업데이트**
   - Render 대시보드 → Environment → 환경 변수 수정
   - `KAKAO_REDIRECT_URI`와 `REACT_APP_KAKAO_REDIRECT_URI`를 실제 Render URL로 업데이트
   - "Save Changes" 클릭
   - 자동으로 재배포됩니다

## ⚠️ Render의 제한사항

### 무료 티어 제한

1. **슬립 모드**
   - 15분간 요청이 없으면 서비스가 슬립 모드로 전환됩니다
   - 첫 요청 시 약 30초~1분 정도 깨어나는 시간이 필요합니다

2. **빌드 시간**
   - 무료 티어는 빌드 시간 제한이 있습니다
   - Docker Compose 빌드는 시간이 걸릴 수 있습니다

3. **월 사용량**
   - 무료 티어는 제한적입니다
   - 사용량 모니터링 필요

## 🔧 문제 해결

### Docker Compose 인식 문제

Render가 `docker-compose.yml`을 인식하지 못하는 경우:

1. **수동 설정**
   - Settings → Build & Deploy
   - Build Command: `docker-compose up --build -d`
   - Start Command: `docker-compose up`

2. **또는 개별 서비스 배포**
   - 백엔드와 프론트엔드를 별도의 Web Service로 배포
   - 각각의 Dockerfile 사용

### 포트 문제

- Render는 자동으로 포트를 할당합니다
- `$PORT` 환경 변수를 사용하도록 Dockerfile 수정 필요할 수 있습니다

### 빌드 실패

- Logs 탭에서 에러 확인
- 로컬에서 먼저 테스트: `docker compose up --build`

## 📝 Render vs Railway 비교

| 기능 | Render | Railway |
|------|--------|---------|
| Docker Compose | ✅ 지원 | ❌ 미지원 |
| 무료 티어 | ✅ (슬립 모드) | ✅ ($5 크레딧) |
| 설정 난이도 | ⭐⭐ 쉬움 | ⭐⭐⭐ 보통 |
| 자동 배포 | ✅ | ✅ |

## 🔗 참고 자료

- [Render 공식 문서](https://render.com/docs)
- [Render Docker 가이드](https://render.com/docs/docker)
- [Render 환경 변수](https://render.com/docs/environment-variables)

## 💡 팁

1. **도메인 연결**
   - Settings → Custom Domains에서 자신의 도메인 연결 가능

2. **자동 배포**
   - GitHub에 푸시하면 자동으로 재배포됩니다

3. **로그 확인**
   - Logs 탭에서 실시간 로그 확인 가능

4. **서비스 상태**
   - 대시보드에서 서비스 상태 모니터링

