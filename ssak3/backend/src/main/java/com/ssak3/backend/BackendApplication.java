package com.ssak3.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.ssak3.backend.config.KakaoProperties;

/**
 * Spring Boot 애플리케이션의 진입점입니다.
 *
 * <p>{@link EnableConfigurationProperties}를 통해 {@link KakaoProperties}를
 * 스프링 컨텍스트에 등록하여 환경 변수 기반의 카카오 설정 값을 사용할 수 있도록 합니다.</p>
 */
@SpringBootApplication
@EnableConfigurationProperties(KakaoProperties.class)
public class BackendApplication {

	/**
	 * 애플리케이션을 실행합니다.
	 *
	 * @param args 실행 시 전달되는 인자
	 */
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
