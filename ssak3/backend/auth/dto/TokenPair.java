package com.ssak3.backend.auth.dto;

/**
 * 내부 JWT 혹은 세션 토큰을 표현하는 DTO.
 * 현재는 샘플 구현으로 UUID 문자열을 사용합니다.
 */
public record TokenPair(
		String accessToken,
		String refreshToken
) {
}










