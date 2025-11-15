package com.ssak3.backend.auth.service;

import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.ssak3.backend.auth.client.KakaoOAuthClient;
import com.ssak3.backend.auth.dto.KakaoProfile;
import com.ssak3.backend.auth.dto.KakaoTokenResponse;
import com.ssak3.backend.auth.dto.KakaoUserResponse;
import com.ssak3.backend.auth.dto.LoginResponse;
import com.ssak3.backend.auth.dto.TokenPair;

import lombok.RequiredArgsConstructor;

/**
 * 카카오 OAuth 기반 인증 흐름을 캡슐화한 서비스입니다.
 *
 * <p>컨트롤러로부터 인가 코드를 전달받아 토큰 발급 및 사용자 프로필 조회를 수행하고,
 * 서비스용 토큰을 생성해 반환합니다.</p>
 */
@Service
@RequiredArgsConstructor
public class AuthService {

	private static final Logger log = LoggerFactory.getLogger(AuthService.class);

	private final KakaoOAuthClient kakaoOAuthClient;

	/**
	 * 카카오 인가 코드를 기반으로 로그인 절차를 수행합니다.
	 *
	 * @param code 카카오에서 발급한 인가 코드
	 * @return 액세스 토큰/리프레시 토큰 및 사용자 프로필 정보를 포함한 응답
	 */
	public LoginResponse loginWithKakao(String code) {
		log.info("카카오 로그인 서비스 시작 - code={}", code);
		KakaoTokenResponse tokenResponse = kakaoOAuthClient.requestToken(code);
		log.info("카카오 토큰 발급 성공 - accessToken={}, refreshToken={}", tokenResponse.accessToken(), tokenResponse.refreshToken());
		KakaoUserResponse userResponse = kakaoOAuthClient.requestUserProfile(tokenResponse.accessToken());
		log.info("카카오 사용자 정보 조회 성공 - id={}", userResponse.id());

		KakaoProfile profile = toProfile(userResponse);
		TokenPair tokens = issueToken(profile);

		log.info("임시 토큰 발급 완료 - accessToken={}, refreshToken={}", tokens.accessToken(), tokens.refreshToken());
		return new LoginResponse(tokens.accessToken(), tokens.refreshToken(), profile);
	}

	/**
	 * 카카오 사용자 응답을 우리 서비스에서 사용하는 프로필 객체로 변환합니다.
	 *
	 * @param userResponse 카카오 사용자 정보 응답
	 * @return 변환된 {@link KakaoProfile}
	 */
	private KakaoProfile toProfile(KakaoUserResponse userResponse) {
		String nickname = Optional.ofNullable(userResponse)
				.map(KakaoUserResponse::kakaoAccount)
				.map(KakaoUserResponse.KakaoAccount::profile)
				.map(KakaoUserResponse.Profile::nickname)
				.filter(StringUtils::hasText)
				.orElse("카카오 사용자");

		String profileImage = Optional.ofNullable(userResponse)
				.map(KakaoUserResponse::kakaoAccount)
				.map(KakaoUserResponse.KakaoAccount::profile)
				.map(KakaoUserResponse.Profile::profileImageUrl)
				.orElse(null);

		String thumbnailImage = Optional.ofNullable(userResponse)
				.map(KakaoUserResponse::kakaoAccount)
				.map(KakaoUserResponse.KakaoAccount::profile)
				.map(KakaoUserResponse.Profile::thumbnailImageUrl)
				.orElse(null);

		String email = Optional.ofNullable(userResponse)
				.map(KakaoUserResponse::kakaoAccount)
				.map(KakaoUserResponse.KakaoAccount::email)
				.filter(StringUtils::hasText)
				.orElse(null);

		return new KakaoProfile(userResponse.id(), nickname, email, profileImage, thumbnailImage);
	}

	/**
	 * 우리 서비스에서 사용할 임시 토큰을 발급합니다.
	 *
	 * <p>현재는 데모용으로 UUID 기반 토큰을 생성하고 있으며,
	 * 운영 환경에서는 JWT 등 실사용 토큰 발급 로직으로 교체해야 합니다.</p>
	 *
	 * @param profile 로그인한 사용자 프로필
	 * @return 발급된 액세스/리프레시 토큰 정보
	 */
	private TokenPair issueToken(KakaoProfile profile) {
		// TODO: 운영 환경에서는 JWT 또는 세션 기반 토큰 발급 로직으로 교체하세요.
		return new TokenPair(
				"access-" + UUID.randomUUID(),
				"refresh-" + UUID.randomUUID()
		);
	}
}





