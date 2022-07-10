/**
 * 
 */
package com.tweetapp.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.tweetapp.model.Comment;
import com.tweetapp.model.Tag;
import com.tweetapp.model.Tweet;
import com.tweetapp.model.UserResponse;

@FeignClient(value = "tweet-update-service", url = "http://localhost:6200")
public interface UpdateServiceClient {

	@PostMapping("/add-tweet")
	public ResponseEntity<String> addTweet(@RequestBody Tweet tweet);

	@GetMapping("/all-users")
	public ResponseEntity<List<UserResponse>> allUsers();

	@GetMapping("/{loginId}/search-user")
	public ResponseEntity<List<UserResponse>> findUser(@PathVariable String loginId);

	@GetMapping("/tweets")
	public ResponseEntity<List<Tweet>> tweets();

	@GetMapping("/{loginId}/tweets")
	public ResponseEntity<List<Tweet>> tweets(@PathVariable String loginId);

	@PutMapping("/update-tweet/{id}")
	public ResponseEntity<String> updateTweet(@RequestBody String updatedTweet, @PathVariable String id);

	@DeleteMapping("/{loginId}/delete-tweet/{id}")
	public ResponseEntity<String> deleteTweet(@PathVariable String loginId, @PathVariable String id);

	@PutMapping("/{loginId}/like/{id}")
	public ResponseEntity<String> likeTweet(@PathVariable String loginId, @PathVariable String id);

	@PutMapping("/{loginId}/dislike/{id}")
	public ResponseEntity<String> dislikeTweet(@PathVariable String loginId, @PathVariable String id);

	@PostMapping("/reply/{id}")
	public ResponseEntity<String> replyTweet(@RequestBody Comment comment, @PathVariable String id);

	@GetMapping("/{loginId}/tagged-tweets")
	public ResponseEntity<Tag> taggedTweets(@PathVariable String loginId);

}
