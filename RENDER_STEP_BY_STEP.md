# Render 개별 서비스 배포 - 단계별 가이드

## 🎯 현재 상황
- ✅ GitHub 저장소 연결 완료
- ⏭️ 다음: 각 서비스를 개별적으로 배포

## 📝 단계별 배포 방법

### 1단계: 프론트엔드 서비스 배포 (먼저!)

#### 1-1. 새 서비스 생성
1. Render 대시보드 상단의 **"New +"** 버튼 클릭
2. 드롭다운 메뉴에서 **"Web Service"** 선택

#### 1-2. 저장소 선택
1. "Connect a repository" 섹션에서
2. 이미 연결된 저장소 목록이 보입니다
3. **`NOWBRO00/Ssak3-`** 저장소를 클릭하여 선택

#### 1-3. 서비스 설정 입력
다음 정보를 입력합니다:

**기본 정보:**
- **Name**: `ssak3-frontend` (또는 원하는 이름)
- **Region**: 가장 가까운 지역 선택 (예: `Singapore`, `Oregon`)

**빌드 설정:**
- **Environment**: 드롭다운에서 **`Docker`** 선택 ⚠️ 중요!
- **Branch**: `main` (기본값)
- **Root Directory**: `ssak3/frontend` ⚠️ 중요! (프론트엔드 폴더 경로)
- **Dockerfile Path**: `Dockerfile` (자동으로 감지되지만 확인)

**고급 설정 (Advanced):**
- "Show advanced options" 클릭 (선택사항)
- **Docker Context**: 비워두거나 `.` 입력
- **Docker Command**: 비워두기

#### 1-4. 환경 변수 설정 (선택사항 - 나중에 추가 가능)
- "Environment Variables" 섹션에서
- "Add Environment Variable" 클릭
- 다음 변수 추가:
  ```
  REACT_APP_KAKAO_JAVASCRIPT_KEY=실제_JavaScript_키
  REACT_APP_KAKAO_REDIRECT_URI=https://ssak3-frontend.onrender.com/auth/kakao/callback
  ```
  (URL은 배포 후 받게 됩니다)

#### 1-5. 배포 시작
1. 하단의 **"Create Web Service"** 버튼 클릭
2. 배포가 자동으로 시작됩니다
3. "Events" 탭에서 빌드 진행 상황 확인
4. 배포 완료 후 URL 확인 (예: `https://ssak3-frontend.onrender.com`)

---

### 2단계: 백엔드 서비스 배포

#### 2-1. 다시 새 서비스 생성
1. Render 대시보드 상단의 **"New +"** 버튼 클릭
2. **"Web Service"** 선택

#### 2-2. 같은 저장소 선택
1. **`NOWBRO00/Ssak3-`** 저장소를 다시 선택
2. (같은 저장소를 사용하지만 다른 설정으로 배포)

#### 2-3. 서비스 설정 입력
다음 정보를 입력합니다:

**기본 정보:**
- **Name**: `ssak3-backend` (또는 원하는 이름)
- **Region**: 프론트엔드와 **같은 지역** 선택 (권장)

**빌드 설정:**
- **Environment**: **`Docker`** 선택 ⚠️ 중요!
- **Branch**: `main`
- **Root Directory**: `ssak3/backend` ⚠️ 중요! (백엔드 폴더 경로)
- **Dockerfile Path**: `Dockerfile` (자동 감지)

#### 2-4. 환경 변수 설정
"Environment Variables" 섹션에서:
```
KAKAO_CLIENT_ID=실제_REST_API_키
KAKAO_CLIENT_SECRET=실제_Client_Secret
KAKAO_REDIRECT_URI=https://ssak3-frontend.onrender.com/auth/kakao/callback
SERVER_PORT=8080
PORT=8080
```
⚠️ **중요**: `KAKAO_REDIRECT_URI`는 프론트엔드 배포 후 받은 실제 URL로 변경하세요!

#### 2-5. 배포 시작
1. **"Create Web Service"** 버튼 클릭
2. 배포 시작

---

## 🔍 확인 사항

### 각 서비스가 올바르게 설정되었는지 확인:

1. **프론트엔드 서비스**
   - Settings → Build & Deploy
   - Root Directory: `ssak3/frontend` ✅
   - Environment: `Docker` ✅

2. **백엔드 서비스**
   - Settings → Build & Deploy
   - Root Directory: `ssak3/backend` ✅
   - Environment: `Docker` ✅

---

## ⚠️ 주의사항

1. **Root Directory가 가장 중요합니다!**
   - 프론트엔드: `ssak3/frontend`
   - 백엔드: `ssak3/backend`
   - 이 경로가 틀리면 Dockerfile을 찾을 수 없습니다

2. **Environment는 반드시 Docker로 설정**
   - 기본값이 "Node"나 다른 것으로 되어 있을 수 있습니다
   - 반드시 "Docker"로 변경하세요

3. **각 서비스는 독립적입니다**
   - 두 개의 별도 Web Service로 배포됩니다
   - 각각 다른 URL을 받게 됩니다

---

## 🐛 문제 해결

### "Dockerfile not found" 에러
- Root Directory가 올바른지 확인
- `ssak3/frontend` 또는 `ssak3/backend`로 정확히 입력했는지 확인

### 빌드 실패
- Logs 탭에서 에러 메시지 확인
- 로컬에서 `docker compose up --build`로 먼저 테스트

### 환경 변수 문제
- 각 서비스의 Environment 탭에서 확인
- 변수 이름과 값이 정확한지 확인

---

## 📸 UI 위치 참고

Render 대시보드 구조:
```
상단 메뉴
├── Dashboard (홈)
├── Services (서비스 목록)
└── New + (새 서비스 생성) ← 여기 클릭!

서비스 설정 화면
├── 기본 정보 (Name, Region)
├── Build & Deploy (Environment, Root Directory)
├── Environment (환경 변수)
└── Create Web Service (배포 시작 버튼)
```

---

## ✅ 체크리스트

프론트엔드 배포:
- [ ] New + → Web Service 클릭
- [ ] 저장소 선택: `NOWBRO00/Ssak3-`
- [ ] Name: `ssak3-frontend`
- [ ] Environment: `Docker`
- [ ] Root Directory: `ssak3/frontend`
- [ ] Create Web Service 클릭
- [ ] 배포 완료 후 URL 확인

백엔드 배포:
- [ ] New + → Web Service 클릭
- [ ] 저장소 선택: `NOWBRO00/Ssak3-`
- [ ] Name: `ssak3-backend`
- [ ] Environment: `Docker`
- [ ] Root Directory: `ssak3/backend`
- [ ] 환경 변수 추가
- [ ] Create Web Service 클릭

---

이제 Render 대시보드에서 "New +" 버튼을 클릭하고 위의 단계를 따라하시면 됩니다!

