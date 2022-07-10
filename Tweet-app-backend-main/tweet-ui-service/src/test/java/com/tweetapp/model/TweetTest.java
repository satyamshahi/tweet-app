package com.tweetapp.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TweetTest {

	private Tweet tweet;

	@BeforeEach
	public void setUp() {
		tweet = new Tweet();
		tweet.setId("abc");
		tweet.setLoginId("sasha");
		tweet.setMessage("hey, anyone up for game?");
		tweet.setAvtar("avtar1");
		tweet.setTime(LocalDateTime.MIN);
		List<String> isLikeList = new ArrayList<>();
		isLikeList.add("sarah");
		tweet.setIsLikeList(isLikeList);
		Comment comment = new Comment();
		comment.setCommentMessage("yeah");
		comment.setCommentor("sarah");
		comment.setTime(LocalDateTime.MIN);
		List<Comment> commentList = new ArrayList<>();
		commentList.add(comment);
		tweet.setCommentList(commentList);
	}

	@Test
	public void testAllGetterSetter() {
		assertEquals("abc", tweet.getId());
		assertEquals("sasha", tweet.getLoginId());
		assertEquals("hey, anyone up for game?", tweet.getMessage());
		assertEquals("avtar1", tweet.getAvtar());
		assertEquals(LocalDateTime.MIN, tweet.getTime());
		assertEquals("sarah", tweet.getIsLikeList().get(0));
		assertEquals("yeah", tweet.getCommentList().get(0).getCommentMessage());
		assertEquals("sarah", tweet.getCommentList().get(0).getCommentor());
		assertEquals(LocalDateTime.MIN, tweet.getCommentList().get(0).getTime());
	}
}
