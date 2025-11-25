# 무료 배포 가이드

Ssak3 프로젝트를 무료로 배포하는 방법들을 정리했습니다.

## 🆓 무료 배포 옵션 비교

### 1. **Railway** ⭐ 추천
- **무료 티어**: $5 크레딧/월 (충분함)
- **장점**: 
  - Docker Compose 직접 지원
  - GitHub 연동 자동 배포
  - 설정 간단
  - HTTPS 자동 제공
- **단점**: 무료 티어는 제한적
- **URL**: https://railway.app

### 2. **Render**
- **무료 티어**: 제한적이지만 사용 가능
- **장점**: 
  - Docker 지원
  - GitHub 연동
  - HTTPS 자동
- **단점**: 무료 티어는 슬립 모드 (15분 비활성 시 중지)
- **URL**: https://render.com

### 3. **Fly.io**
- **무료 티어**: 3개 VM, 3GB 저장공간
- **장점**: 
  - Docker 지원
  - 전 세계 엣지 서버
  - 빠른 속도
- **단점**: 설정이 조금 복잡
- **URL**: https://fly.io

### 4. **Oracle Cloud (OCI) Always Free** ⭐ 장기 운영용
- **무료 티어**: 영구 무료 (제한적)
- **장점**: 
  - 완전 무료 (크레딧 소진 없음)
  - VM 인스턴스 제공
  - Docker 설치 가능
- **단점**: 
  - 설정이 복잡
  - 가입 절차가 까다로울 수 있음
- **URL**: https://www.oracle.com/cloud/free/

### 5. **Vercel/Netlify** (프론트엔드만)
- **무료 티어**: 매우 관대함
- **장점**: 
  - 프론트엔드 배포에 최적
  - 매우 빠른 CDN
  - GitHub 연동
- **단점**: 
  - 백엔드는 별도 필요
  - Docker Compose 미지원
- **URL**: 
  - Vercel: https://vercel.com
  - Netlify: https://netlify.com

## 🚀 추천 배포 방법

### 방법 1: Railway (가장 간단) ⭐

#### 1단계: Railway 가입
1. https://railway.app 접속
2. GitHub로 가입
3. "New Project" 클릭

#### 2단계: 프로젝트 연결
1. "Deploy from GitHub repo" 선택
2. 저장소 선택
3. Railway가 자동으로 `docker-compose.yml` 감지

#### 3단계: 환경 변수 설정
Railway 대시보드에서 환경 변수 추가:
```
KAKAO_CLIENT_ID=your_rest_api_key
KAKAO_CLIENT_SECRET=your_client_secret
KAKAO_REDIRECT_URI=https://your-app.railway.app/auth/kakao/callback
REACT_APP_KAKAO_JAVASCRIPT_KEY=your_javascript_key
REACT_APP_KAKAO_REDIRECT_URI=https://your-app.railway.app/auth/kakao/callback
SERVER_PORT=8080
```

#### 4단계: 배포 완료
- 자동으로 배포 시작
- HTTPS URL 자동 제공 (예: `https://your-app.railway.app`)

---

### 방법 2: Render (대안)

#### 1단계: Render 가입
1. https://render.com 접속
2. GitHub로 가입

#### 2단계: Web Service 생성
1. "New +" → "Web Service" 선택
2. GitHub 저장소 연결
3. 설정:
   - **Name**: ssak3
   - **Environment**: Docker
   - **Dockerfile Path**: (자동 감지)
   - **Docker Context**: . (루트)

#### 3단계: 환경 변수 설정
Render 대시보드에서 환경 변수 추가 (Railway와 동일)

#### 4단계: 배포
- 자동 배포 시작
- URL 제공 (예: `https://ssak3.onrender.com`)

---

### 방법 3: Oracle Cloud (완전 무료, 장기 운영)

#### 1단계: Oracle Cloud 가입
1. https://www.oracle.com/cloud/free/ 접속
2. 가입 (신용카드 필요하지만 과금 안 됨)

#### 2단계: VM 인스턴스 생성
1. Compute → Instances → Create Instance
2. Always Free Eligible 선택
3. Ubuntu 22.04 선택
4. SSH 키 생성 및 다운로드

#### 3단계: 서버 설정
```bash
# SSH 접속
ssh -i your-key.pem ubuntu@your-ip

# Docker 설치
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Docker Compose 설치
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 프로젝트 클론
git clone your-repo-url
cd Ssak3_front

# .env 파일 생성 및 설정
nano .env

# Docker 실행
docker compose up -d --build
```

#### 4단계: 방화벽 설정
- Security List에서 포트 80, 443, 3000, 8080 열기

---

## 📝 배포 전 체크리스트

### 1. 환경 변수 업데이트
배포 환경의 실제 URL로 리다이렉트 URI 변경:
```
# 로컬
KAKAO_REDIRECT_URI=http://localhost:3000/auth/kakao/callback

# 배포 환경
KAKAO_REDIRECT_URI=https://your-domain.com/auth/kakao/callback
```

### 2. 카카오 개발자 콘솔 설정
1. https://developers.kakao.com/ 접속
2. 내 애플리케이션 → 플랫폼 설정
3. Web 플랫폼 추가:
   - 사이트 도메인: `https://your-domain.com`
4. Redirect URI 등록:
   - `https://your-domain.com/auth/kakao/callback`

### 3. 도메인 연결 (선택사항)
- 무료 도메인: Freenom, No-IP 등
- 또는 Railway/Render에서 제공하는 서브도메인 사용

---

## 🔧 문제 해결

### 포트 충돌
- Railway/Render: 자동으로 포트 할당
- Oracle Cloud: 방화벽 규칙 확인

### 환경 변수 불일치
- 배포 플랫폼의 환경 변수 설정 확인
- 카카오 리다이렉트 URI가 배포 URL과 일치하는지 확인

### 빌드 실패
- 로그 확인: `docker compose logs`
- 로컬에서 먼저 테스트: `docker compose up --build`

---

## 💡 추천 순서

1. **빠른 테스트**: Railway (가장 간단)
2. **장기 운영**: Oracle Cloud (완전 무료)
3. **프론트엔드만**: Vercel + 백엔드 별도 (Railway 등)

---

## 📚 참고 자료

- [Railway 문서](https://docs.railway.app/)
- [Render 문서](https://render.com/docs)
- [Fly.io 문서](https://fly.io/docs/)
- [Oracle Cloud 문서](https://docs.oracle.com/en-us/iaas/Content/GSG/Concepts/baremetalintro.htm)

