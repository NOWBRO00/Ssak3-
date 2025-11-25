# 멀티 스테이지 빌드를 사용하여 최종 이미지 크기 최적화

# Stage 1: 빌드 단계
FROM node:18-alpine AS build
WORKDIR /app

# 빌드 타임 환경변수 (docker-compose에서 주입)
ARG REACT_APP_KAKAO_JAVASCRIPT_KEY
ARG REACT_APP_KAKAO_REDIRECT_URI

# 환경변수 설정
ENV REACT_APP_KAKAO_JAVASCRIPT_KEY=$REACT_APP_KAKAO_JAVASCRIPT_KEY
ENV REACT_APP_KAKAO_REDIRECT_URI=$REACT_APP_KAKAO_REDIRECT_URI

# package.json과 package-lock.json 복사 (의존성 캐싱을 위해)
COPY package*.json ./

# 의존성 설치
RUN npm ci

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# Stage 2: 실행 단계 (Nginx를 사용하여 정적 파일 서빙)
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# 빌드된 파일 복사
COPY --from=build /app/build .

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]

