package com.tweetapp.service;

import org.springframework.http.ResponseEntity;

import com.tweetapp.common.ApiResponse;
import com.tweetapp.model.Comment;
import com.tweetapp.model.Tag;
import com.tweetapp.model.Tweet;
import com.tweetapp.model.UpdateTweet;

public interface TweetUiService {

	public ResponseEntity<ApiResponse> getAllTweet(final String token);

	public ResponseEntity<ApiResponse> getUsers(final String token);

	public ResponseEntity<ApiResponse> getUsers(final String token, String username);

	public ResponseEntity<ApiResponse> getTweets(final String token, String username);

	public ResponseEntity<ApiResponse> createNewTweet(final String token, Tweet tweet);

	public ResponseEntity<ApiResponse> updateTweet(final String token, String username, String id,
			UpdateTweet updateTweet);

	public ResponseEntity<ApiResponse> deleteTweet(final String token, String username, String id);

	public ResponseEntity<ApiResponse> likeTweet(final String token, String username, String id);

	public ResponseEntity<ApiResponse> removeLikeTweet(final String token, String username, String id);

	public ResponseEntity<ApiResponse> replyTweet(final String token, String username, String id, Comment comment);

	public ResponseEntity<ApiResponse> setTag(final String token, Tag tag);

}
