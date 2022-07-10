package com.tweetapp.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.tweetapp.model.ValidationResponse;



@FeignClient(value="tweet-authentication-service", url = "http://localhost:8082")
public interface AuthenticationServiceClient {

	@PostMapping("/api/v1.0/tweets/validate")
	public ResponseEntity<ValidationResponse> validateAndReturnUser(@RequestHeader("Authorization") final String token);
	
}
