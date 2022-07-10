package com.tweetapp.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TagTest {

	private Tag tag;

	@BeforeEach
	void setUp() {
		tag = new Tag();
		tag.setTweetId("abc");
		List<String> userList = new ArrayList<>();
		userList.add("sasha");
		tag.setUsers(userList);
	}

	@Test
	void testAllGetterSetterConstructor() {
		assertEquals("abc", tag.getTweetId());
		assertEquals("sasha", tag.getUsers().get(0));
	}

}
