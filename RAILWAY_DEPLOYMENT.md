# Railway 배포 가이드

Railway를 사용하여 Ssak3 프로젝트를 무료로 배포하는 단계별 가이드입니다.

## 📋 사전 준비

1. **GitHub 저장소 준비**
   - 프로젝트가 GitHub에 푸시되어 있어야 합니다
   - `.env` 파일은 `.gitignore`에 포함되어 있어야 합니다 (보안)

2. **카카오 개발자 콘솔 준비**
   - 배포 후 URL을 등록해야 합니다

## 🚀 배포 단계

### 1단계: Railway 가입 및 프로젝트 생성

1. **Railway 가입**
   - https://railway.app 접속
   - "Start a New Project" 클릭
   - GitHub로 로그인

2. **프로젝트 생성**
   - "Deploy from GitHub repo" 선택
   - 저장소 선택 (Ssak3_front)
   - "Deploy Now" 클릭

### 2단계: 서비스 설정

Railway는 `docker-compose.yml`을 자동으로 감지하여 두 개의 서비스를 생성합니다:
- `backend` 서비스
- `frontend` 서비스

각 서비스를 개별적으로 설정해야 합니다.

#### 백엔드 서비스 설정

1. **서비스 선택**
   - Railway 대시보드에서 `backend` 서비스 클릭

2. **환경 변수 설정**
   - Settings → Variables 탭
   - 다음 환경 변수 추가:

```
KAKAO_CLIENT_ID=실제_REST_API_키
KAKAO_CLIENT_SECRET=실제_Client_Secret
KAKAO_REDIRECT_URI=https://your-app.railway.app/auth/kakao/callback
SERVER_PORT=8080
```

3. **포트 설정**
   - Settings → Networking
   - Port: `8080` (또는 Railway가 자동 할당한 포트)
   - Public URL 생성 (선택사항)

#### 프론트엔드 서비스 설정

1. **서비스 선택**
   - Railway 대시보드에서 `frontend` 서비스 클릭

2. **환경 변수 설정**
   - Settings → Variables 탭
   - 다음 환경 변수 추가:

```
REACT_APP_KAKAO_JAVASCRIPT_KEY=실제_JavaScript_키
REACT_APP_KAKAO_REDIRECT_URI=https://your-app.railway.app/auth/kakao/callback
```

3. **포트 설정**
   - Settings → Networking
   - Port: `80` (Nginx 기본 포트)
   - **Public URL 생성** (필수) - 이것이 메인 접속 주소입니다

### 3단계: 카카오 개발자 콘솔 설정

1. **플랫폼 등록**
   - https://developers.kakao.com/ 접속
   - 내 애플리케이션 → 앱 설정 → 플랫폼
   - Web 플랫폼 추가:
     - 사이트 도메인: `https://your-app.railway.app`

2. **Redirect URI 등록**
   - 내 애플리케이션 → 제품 설정 → 카카오 로그인 → Redirect URI
   - `https://your-app.railway.app/auth/kakao/callback` 추가

3. **환경 변수 업데이트**
   - Railway에서 `KAKAO_REDIRECT_URI`를 실제 Railway URL로 업데이트
   - Railway에서 `REACT_APP_KAKAO_REDIRECT_URI`도 업데이트

### 4단계: 배포 확인

1. **배포 상태 확인**
   - Railway 대시보드에서 각 서비스의 Deployments 탭 확인
   - "Active" 상태가 되면 배포 완료

2. **로그 확인**
   - 각 서비스의 Logs 탭에서 로그 확인
   - 에러가 있으면 확인 및 수정

3. **접속 테스트**
   - 프론트엔드 Public URL로 접속
   - 예: `https://your-app.railway.app`

## 🔧 문제 해결

### 백엔드와 프론트엔드 연결 문제

Railway에서 각 서비스는 독립적인 URL을 가집니다. 프론트엔드에서 백엔드로 API 호출 시:

1. **nginx.conf 수정 필요**
   - 프론트엔드의 `nginx.conf`에서 백엔드 URL을 Railway 백엔드 URL로 변경
   - 또는 환경 변수로 백엔드 URL 주입

2. **CORS 설정**
   - 백엔드에서 프론트엔드 도메인을 허용하도록 CORS 설정

### 포트 문제

Railway는 자동으로 포트를 할당합니다. 환경 변수 `PORT`를 사용하도록 수정이 필요할 수 있습니다.

### 빌드 실패

- Logs 탭에서 에러 확인
- 로컬에서 `docker compose up --build`로 먼저 테스트

## 💰 비용 관리

- Railway 무료 티어: $5 크레딧/월
- 사용량 모니터링: Settings → Usage
- 크레딧 소진 시 알림 설정 가능

## 📝 추가 팁

1. **자동 배포**
   - GitHub에 푸시하면 자동으로 재배포됩니다
   - Settings → Source에서 브랜치 선택 가능

2. **환경별 설정**
   - Production과 Development 환경 분리 가능
   - 각 환경마다 다른 환경 변수 설정

3. **도메인 연결**
   - Settings → Networking → Custom Domain
   - 자신의 도메인 연결 가능

## 🔗 참고 자료

- [Railway 공식 문서](https://docs.railway.app/)
- [Railway Docker 가이드](https://docs.railway.app/deploy/dockerfiles)

