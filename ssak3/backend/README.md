# Backend

Spring Boot 기반 카카??로그???�동 ?�버?�니??

## ?�행 방법

1. ?�수 ?�경 변???�정
   - KAKAO_CLIENT_ID
   - KAKAO_CLIENT_SECRET (?�택)
   - KAKAO_REDIRECT_URI (기본�? http://localhost:3000/auth/kakao/callback)
2. ?�존???�치 �?빌드
   `powershell
   cd backend
   .\gradlew.bat build
   `
3. 개발 ?�버 ?�행
   `powershell
   .\gradlew.bat bootRun
   `

## ?�공 API

| HTTP | URL              | ?�명                    |
| ---- | ---------------- | ----------------------- |
| POST | /api/auth/kakao | 카카???��? 코드�?받아 ?�체 ?�큰�??�로?�을 반환 |

?�청 ?�시:

`http
POST /api/auth/kakao
Content-Type: application/json

{
  "code": "KAKAO_AUTHORIZATION_CODE"
}
`

?�답 ?�시:

`json
{
  "accessToken": "access-589d8b9c-f13d-4f6b-9f2f-9a9b01234567",
  "refreshToken": "refresh-6cc11363-84a6-4c34-8b1d-70f0f2a12345",
  "profile": {
    "id": 1234567890,
    "nickname": "?�길??,
    "email": "hong@kakao.com",
    "profileImageUrl": "https://...",
    "thumbnailImageUrl": "https://..."
  }
}
`

> ?�️ ?�재 ccessToken/efreshToken?� UUID�??�성???�시 값입?�다. ?�서비스?�서??JWT ?�으�?교체?�세??
