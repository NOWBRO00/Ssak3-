# Docker 배포 가이드

이 문서는 Ssak3 프로젝트를 Docker를 사용하여 배포하는 방법을 설명합니다.

## 📋 사전 요구사항

1. **Docker 설치**
   - Windows: [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
   - Mac: [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)
   - Linux: [Docker Engine](https://docs.docker.com/engine/install/)

2. **Docker Compose 설치** (Docker Desktop에는 기본 포함됨)

## 🚀 빠른 시작

### 1. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 필요한 환경 변수를 설정하세요:

```bash
# .env.example을 참고하여 .env 파일 생성
cp .env.example .env
```

`.env` 파일 내용:
```
KAKAO_CLIENT_ID=your_kakao_client_id_here
KAKAO_CLIENT_SECRET=your_kakao_client_secret_here
KAKAO_REDIRECT_URI=http://localhost:3000/auth/kakao/callback
SERVER_PORT=8080
```

### 2. Docker 이미지 빌드 및 실행

```bash
# 프로젝트 루트에서 실행
docker-compose up --build
```

또는 백그라운드에서 실행하려면:

```bash
docker-compose up -d --build
```

### 3. 서비스 접속

- **프론트엔드**: http://localhost:3000
- **백엔드 API**: http://localhost:8080

## 📁 프로젝트 구조

```
Ssak3_front/
├── docker-compose.yml          # 전체 서비스 오케스트레이션
├── .env                        # 환경 변수 (생성 필요)
├── .env.example                # 환경 변수 예시
├── ssak3/
│   ├── backend/
│   │   ├── Dockerfile          # 백엔드 Docker 이미지 정의
│   │   ├── .dockerignore       # Docker 빌드 제외 파일
│   │   └── ...
│   └── frontend/
│       ├── Dockerfile          # 프론트엔드 Docker 이미지 정의
│       ├── nginx.conf          # Nginx 설정 파일
│       ├── .dockerignore       # Docker 빌드 제외 파일
│       └── ...
└── DOCKER_DEPLOYMENT.md        # 이 문서
```

## 🔧 주요 명령어

### Docker Compose 명령어

```bash
# 서비스 시작 (빌드 포함)
docker-compose up --build

# 백그라운드에서 시작
docker-compose up -d

# 서비스 중지
docker-compose down

# 서비스 중지 및 볼륨 삭제
docker-compose down -v

# 로그 확인
docker-compose logs -f

# 특정 서비스 로그만 확인
docker-compose logs -f backend
docker-compose logs -f frontend

# 서비스 재시작
docker-compose restart

# 특정 서비스만 재시작
docker-compose restart backend
```

### Docker 명령어 (개별 서비스)

```bash
# 백엔드만 빌드
docker build -t ssak3-backend ./ssak3/backend

# 프론트엔드만 빌드
docker build -t ssak3-frontend ./ssak3/frontend

# 실행 중인 컨테이너 확인
docker ps

# 컨테이너 내부 접속
docker exec -it ssak3-backend sh
docker exec -it ssak3-frontend sh

# 이미지 목록 확인
docker images

# 사용하지 않는 이미지 삭제
docker image prune -a
```

## 🐛 문제 해결

### 포트 충돌

포트 8080 또는 3000이 이미 사용 중인 경우:

1. `docker-compose.yml`에서 포트를 변경:
```yaml
ports:
  - "8081:8080"  # 호스트:컨테이너
```

2. 또는 사용 중인 프로세스 종료

### 환경 변수 문제

- `.env` 파일이 프로젝트 루트에 있는지 확인
- 환경 변수 이름이 정확한지 확인 (대소문자 구분)
- Docker Compose를 재시작: `docker-compose down && docker-compose up --build`

### 빌드 실패

```bash
# 캐시 없이 다시 빌드
docker-compose build --no-cache

# 특정 서비스만 캐시 없이 빌드
docker-compose build --no-cache backend
```

### 로그 확인

```bash
# 모든 서비스 로그
docker-compose logs

# 실시간 로그
docker-compose logs -f

# 특정 서비스 로그
docker-compose logs backend
```

## 🌐 프로덕션 배포

프로덕션 환경에서는 다음 사항을 고려하세요:

### 1. 환경 변수 관리
- `.env` 파일 대신 환경 변수 관리 도구 사용 (예: AWS Secrets Manager, HashiCorp Vault)
- 민감한 정보는 절대 코드에 포함하지 않기

### 2. HTTPS 설정
- Nginx에 SSL 인증서 설정
- Let's Encrypt 사용 고려

### 3. 리버스 프록시
- Nginx 또는 Traefik 같은 리버스 프록시 사용
- 도메인 설정 및 DNS 구성

### 4. 데이터베이스 (필요시)
- PostgreSQL, MySQL 등 데이터베이스 추가
- 데이터 영속성을 위한 볼륨 마운트

### 5. 모니터링 및 로깅
- 로그 수집 도구 (예: ELK Stack, Loki)
- 모니터링 도구 (예: Prometheus, Grafana)

### 6. 보안
- 방화벽 설정
- 컨테이너 보안 스캔
- 최신 보안 패치 적용

## 📝 추가 설정

### Nginx 커스터마이징

`ssak3/frontend/nginx.conf` 파일을 수정하여 Nginx 설정을 변경할 수 있습니다.

### 백엔드 JVM 옵션

`ssak3/backend/Dockerfile`의 ENTRYPOINT를 수정하여 JVM 옵션을 추가할 수 있습니다:

```dockerfile
ENTRYPOINT ["java", "-Xmx512m", "-Xms256m", "-jar", "app.jar"]
```

## 🔗 참고 자료

- [Docker 공식 문서](https://docs.docker.com/)
- [Docker Compose 공식 문서](https://docs.docker.com/compose/)
- [Spring Boot Docker 가이드](https://spring.io/guides/gs/spring-boot-docker/)
- [React Docker 가이드](https://mherman.org/blog/dockerizing-a-react-app/)


