package com.tweetapp.controller;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tweetapp.common.ApiResponse;
import com.tweetapp.model.Comment;
import com.tweetapp.model.Tag;
import com.tweetapp.model.Tweet;
import com.tweetapp.model.UpdateTweet;
import com.tweetapp.service.TweetUiService;

@RestController
@RequestMapping("api/v1.0/tweets")
public class TweetUiServiceController {

	public static final Logger LOGGER = LoggerFactory.getLogger(TweetUiServiceController.class);

	@Autowired
	TweetUiService tweetUiService;

	@GetMapping("/all")
	public ResponseEntity<ApiResponse> getAllTweet(@RequestHeader("Authorization") final String token) {
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("{}, Information: Calling Service to Fetch All Tweets ", this.getClass().getSimpleName());
		}
		return tweetUiService.getAllTweet(token);
	}

	@GetMapping("/user/all")
	public ResponseEntity<ApiResponse> getUsers(@RequestHeader("Authorization") final String token) {
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("{}, Information: Calling Service to Fetch All Users ", this.getClass().getSimpleName());
		}
		return tweetUiService.getUsers(token);
	}

	@GetMapping("/user/search/{username}")
	public ResponseEntity<ApiResponse> getUsers(@RequestHeader("Authorization") final String token,
			@PathVariable("username") String username) {
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("{}, Information: Calling Service to get User {}", this.getClass().getSimpleName(), username);
		}
		return tweetUiService.getUsers(token, username);
	}

	@GetMapping("/{username}")
	public ResponseEntity<ApiResponse> getTweets(@RequestHeader("Authorization") final String token,
			@PathVariable("username") String username) {
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("{}, Information: Calling Service to get tweets of User {}", this.getClass().getSimpleName(),
					username);
		}
		return tweetUiService.getTweets(token, username);
	}

	@PostMapping("/{username}/add")
	public ResponseEntity<ApiResponse> createNewTweet(@RequestHeader("Authorization") final String token,
			@Valid @RequestBody Tweet tweet, final BindingResult result) {
		if (result.hasErrors())
			return new ResponseEntity<>(new ApiResponse("Validations not passed "), HttpStatus.BAD_REQUEST);
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("{}, Information: Calling Service to add new tweet for User {}",
					this.getClass().getSimpleName(), tweet.getLoginId());
		}
		return tweetUiService.createNewTweet(token, tweet);
	}

	@PutMapping("/{username}/update/{id}")
	public ResponseEntity<ApiResponse> updateTweet(@RequestHeader("Authorization") final String token,
			@PathVariable("username") String username, @PathVariable("id") String id,
			@Valid @RequestBody UpdateTweet updateTweet, final BindingResult result) {
		if (result.hasErrors())
			return new ResponseEntity<>(new ApiResponse("Validations not passed"), HttpStatus.BAD_REQUEST);
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("{}, Information: Calling Service to update tweet with id {}", this.getClass().getSimpleName(),
					id);
		}
		return tweetUiService.updateTweet(token, username, id, updateTweet);
	}

	@DeleteMapping("/{username}/delete/{id}")
	public ResponseEntity<ApiResponse> deleteTweet(@RequestHeader("Authorization") final String token,
			@PathVariable("username") String username, @PathVariable("id") String id) {
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("{}, Information: Calling Service to delete tweet with id {}", this.getClass().getSimpleName(),
					id);
		}
		return tweetUiService.deleteTweet(token, username, id);
	}

	@PutMapping("/{username}/like/{id}")
	public ResponseEntity<ApiResponse> likeTweet(@RequestHeader("Authorization") final String token,
			@PathVariable("username") String username, @PathVariable("id") String id) {
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("{}, Information: Calling Service to like tweet with id {}", this.getClass().getSimpleName(),
					id);
		}
		return tweetUiService.likeTweet(token, username, id);
	}

	@PutMapping("/{username}/remove-like/{id}")
	public ResponseEntity<ApiResponse> removeLikeTweet(@RequestHeader("Authorization") final String token,
			@PathVariable("username") String username, @PathVariable("id") String id) {
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("{}, Information: Calling Service to remove like from tweet with id {}",
					this.getClass().getSimpleName(), id);
		}
		return tweetUiService.removeLikeTweet(token, username, id);
	}

	@PutMapping("/{username}/reply/{id}")
	public ResponseEntity<ApiResponse> replyTweet(@RequestHeader("Authorization") final String token,
			@PathVariable("username") String username, @PathVariable("id") String id,
			@Valid @RequestBody Comment comment, final BindingResult result) {
		if (result.hasErrors())
			return new ResponseEntity<>(new ApiResponse("Validations not passed."), HttpStatus.BAD_REQUEST);
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("{}, Information: Calling Service to add comment to a tweet with id {}",
					this.getClass().getSimpleName(), id);
		}

		return tweetUiService.replyTweet(token, username, id, comment);
	}

	@PutMapping("/tag")
	public ResponseEntity<ApiResponse> setTag(@RequestHeader("Authorization") final String token,
			@Valid @RequestBody Tag tag, final BindingResult result) {
		if (result.hasErrors())
			return new ResponseEntity<>(new ApiResponse("Validations not passed"), HttpStatus.BAD_REQUEST);
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("{}, Information: Calling Service to tag users on a tweet with id {}",
					this.getClass().getSimpleName(), tag.getTweetId());
		}
		return tweetUiService.setTag(token, tag);
	}

}
