# ========================================================================
# 개발용 설정

# # Node.js 이미지를 베이스로 사용
# FROM node:22-alpine

# # 작업 디렉토리 설정
# WORKDIR /app

# # package.json과 package-lock.json만 복사
# COPY package*.json ./

# # linux 환경에 필요한 추가 파일 설치
# # windows, mac 환경에서는 사용하지 않음.
# RUN npm install @rollup/rollup-linux-x64-gnu --save-optional

# # 의존성 설치
# RUN npm ci

# # SvelteKit 소스 코드 복사
# COPY . .

# # 해당 값을 포트 오픈 하지 않아도 정상 연결 됨.
# # EXPOSE 5173

# # 개발 서버 실행 (프로덕션 빌드가 아니므로 dev 모드)
# CMD ["npm", "run", "dev"]


# ========================================================================
# 배포용 설정
# Node.js 최신 LTS (Alpine 기반) 이미지 사용
FROM node:22-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 필수 의존성 설치
RUN npm ci

# SvelteKit 소스 코드 복사
COPY . .

# SvelteKit 프로덕션 빌드
RUN npm run build

# 실행 포트 설정
EXPOSE 3000

# 프로덕션 모드 실행
CMD ["node", "build"]
