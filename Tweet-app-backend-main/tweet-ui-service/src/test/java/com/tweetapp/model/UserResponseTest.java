package com.tweetapp.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserResponseTest {

	private UserResponse userResponse;

	@BeforeEach
	void setUp() {
		userResponse = new UserResponse();
		userResponse.setAvtar("avtar1");
		userResponse.setLoginId("sam");
		userResponse.setName("Samar");
	}

	@Test
	void testAllGetterSetter() {
		assertEquals("avtar1", userResponse.getAvtar());
		assertEquals("sam", userResponse.getLoginId());
		assertEquals("Samar", userResponse.getName());
	}

}
