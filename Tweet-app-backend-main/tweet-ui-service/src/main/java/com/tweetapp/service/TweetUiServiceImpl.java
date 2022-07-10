package com.tweetapp.service;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.tweetapp.client.AuthenticationServiceClient;
import com.tweetapp.client.UpdateServiceClient;
import com.tweetapp.common.ApiResponse;
import com.tweetapp.model.Comment;
import com.tweetapp.model.Tag;
import com.tweetapp.model.Tweet;
import com.tweetapp.model.UpdateTweet;
import com.tweetapp.model.UserResponse;
import com.tweetapp.model.ValidationResponse;

import feign.FeignException;

@Service
public class TweetUiServiceImpl implements TweetUiService {

	@Autowired
	UpdateServiceClient updateServiceClient;

	@Autowired
	AuthenticationServiceClient authenticationServiceClient;

	public static final Logger LOGGER = LoggerFactory.getLogger(TweetUiServiceImpl.class);
	@Autowired
	private KafkaTemplate<String, Tag> kafkaTemplate;

	@Value("${kafka-topic}")
	private String topic;

	public ResponseEntity<ApiResponse> getAllTweet(final String token) {
		try {
			ValidationResponse validationResponse = jwtTokenValidation(token);
			if (validationResponse != null && validationResponse.getIsSuccess().booleanValue()) {
				if (LOGGER.isDebugEnabled()) {
					LOGGER.debug("{}, Information: Fetching All Tweets ", this.getClass().getSimpleName());
				}
				ResponseEntity<List<Tweet>> response = updateServiceClient.tweets();

				return new ResponseEntity<>(new ApiResponse(true, response.getBody()), response.getStatusCode());
			} else {
				return createUnauthorizedResponse(validationResponse);
			}
		} catch (FeignException e) {
			return createFeignExceptionResponse(e);
		} catch (RuntimeException e) {

			return createRuntimeExceptionResponse(e);
		}
	}

	public ResponseEntity<ApiResponse> getUsers(final String token) {
		try {
			ValidationResponse validationResponse = jwtTokenValidation(token);
			if (validationResponse != null && validationResponse.getIsSuccess()) {
				if (LOGGER.isDebugEnabled()) {
					LOGGER.debug("{}, Information: Fetching Users ", this.getClass().getSimpleName());
				}
				ResponseEntity<List<UserResponse>> response = updateServiceClient.allUsers();
				return new ResponseEntity<>(new ApiResponse(true, response.getBody()), response.getStatusCode());
			} else {
				return createUnauthorizedResponse(validationResponse);
			}
		} catch (FeignException e) {
			return createFeignExceptionResponse(e);
		} catch (RuntimeException e) {
			return createRuntimeExceptionResponse(e);
		}
	}

	public ResponseEntity<ApiResponse> getUsers(final String token, String username) {
		try {
			ValidationResponse validationResponse = jwtTokenValidation(token);
			if (validationResponse != null && validationResponse.getIsSuccess()) {
				if (LOGGER.isDebugEnabled()) {
					LOGGER.debug("{}, Information: Fetching Users ", this.getClass().getSimpleName());
				}
				ResponseEntity<List<UserResponse>> response = updateServiceClient.findUser(username);
				return new ResponseEntity<>(new ApiResponse(true, response.getBody()), response.getStatusCode());
			} else {
				return createUnauthorizedResponse(validationResponse);
			}
		} catch (FeignException e) {
			return createFeignExceptionResponse(e);
		} catch (RuntimeException e) {
			return createRuntimeExceptionResponse(e);
		}
	}

	public ResponseEntity<ApiResponse> getTweets(final String token, String username) {
		try {
			ValidationResponse validationResponse = jwtTokenValidation(token);
			if (validationResponse != null && validationResponse.getIsSuccess()) {
				if (LOGGER.isDebugEnabled()) {
					LOGGER.debug("{}, Information: Fetching Tweets ", this.getClass().getSimpleName());
				}
				ResponseEntity<List<Tweet>> response = updateServiceClient.tweets(username);
				return new ResponseEntity<>(new ApiResponse(true, response.getBody()), response.getStatusCode());
			} else {
				return createUnauthorizedResponse(validationResponse);
			}
		} catch (FeignException e) {
			return createFeignExceptionResponse(e);
		} catch (RuntimeException e) {
			return createRuntimeExceptionResponse(e);
		}
	}

	public ResponseEntity<ApiResponse> createNewTweet(final String token, Tweet tweet) {
		try {
			ValidationResponse validationResponse = jwtTokenValidation(token);
			if (validationResponse != null && validationResponse.getIsSuccess()) {
				tweet.setLoginId(validationResponse.getUserId());
				tweet.setTime(LocalDateTime.now());
				if (LOGGER.isDebugEnabled()) {
					LOGGER.debug("{}, Information: Creating Tweet ", this.getClass().getSimpleName());
				}
				ResponseEntity<String> response = updateServiceClient.addTweet(tweet);
				return new ResponseEntity<>(new ApiResponse(true, response.getBody()), response.getStatusCode());
			} else {
				return createUnauthorizedResponse(validationResponse);
			}
		} catch (FeignException e) {
			return createFeignExceptionResponse(e);
		} catch (RuntimeException e) {
			return createRuntimeExceptionResponse(e);
		}
	}

	public ResponseEntity<ApiResponse> updateTweet(final String token, String username, String id,
			UpdateTweet updateTweet) {
		try {
			ValidationResponse validationResponse = jwtTokenValidation(token);
			if (validationResponse != null && validationResponse.getIsSuccess()) {
				if (LOGGER.isDebugEnabled()) {
					LOGGER.debug("{}, Information: Updating Tweet ", this.getClass().getSimpleName());
				}
				ResponseEntity<String> response = updateServiceClient.updateTweet(updateTweet.getMessage(), id);
				return new ResponseEntity<>(new ApiResponse(true, response.getBody()), response.getStatusCode());
			} else {
				return createUnauthorizedResponse(validationResponse);
			}
		} catch (FeignException e) {
			return createFeignExceptionResponse(e);
		} catch (RuntimeException e) {
			return createRuntimeExceptionResponse(e);
		}
	}

	public ResponseEntity<ApiResponse> deleteTweet(final String token, String username, String id) {
		try {
			ValidationResponse validationResponse = jwtTokenValidation(token);
			if (validationResponse != null && validationResponse.getIsSuccess()) {
				if (LOGGER.isDebugEnabled()) {
					LOGGER.debug("{}, Information: Deleting Tweet ", this.getClass().getSimpleName());
				}
				ResponseEntity<String> response = updateServiceClient.deleteTweet(username, id);
				return new ResponseEntity<>(new ApiResponse(true, response.getBody()), response.getStatusCode());
			} else {
				return createUnauthorizedResponse(validationResponse);
			}
		} catch (FeignException e) {
			return createFeignExceptionResponse(e);
		} catch (RuntimeException e) {
			return createRuntimeExceptionResponse(e);
		}
	}

	public ResponseEntity<ApiResponse> likeTweet(final String token, String username, String id) {
		try {
			ValidationResponse validationResponse = jwtTokenValidation(token);
			if (validationResponse != null && validationResponse.getIsSuccess()) {
				if (LOGGER.isDebugEnabled()) {
					LOGGER.debug("{}, Information: Adding Like to the Tweet ", this.getClass().getSimpleName());
				}
				ResponseEntity<String> response = updateServiceClient.likeTweet(username, id);
				return new ResponseEntity<>(new ApiResponse(true, response.getBody()), response.getStatusCode());
			} else {
				return createUnauthorizedResponse(validationResponse);
			}
		} catch (FeignException e) {
			return createFeignExceptionResponse(e);
		} catch (RuntimeException e) {
			return createRuntimeExceptionResponse(e);
		}
	}

	public ResponseEntity<ApiResponse> removeLikeTweet(final String token, String username, String id) {
		try {
			ValidationResponse validationResponse = jwtTokenValidation(token);
			if (validationResponse != null && validationResponse.getIsSuccess()) {
				if (LOGGER.isDebugEnabled()) {
					LOGGER.debug("{}, Information: removing Like from the Tweet ", this.getClass().getSimpleName());
				}
				ResponseEntity<String> response = updateServiceClient.dislikeTweet(username, id);
				return new ResponseEntity<>(new ApiResponse(true, response.getBody()), response.getStatusCode());
			} else {
				return createUnauthorizedResponse(validationResponse);
			}
		} catch (FeignException e) {
			return createFeignExceptionResponse(e);
		} catch (RuntimeException e) {
			return createRuntimeExceptionResponse(e);
		}
	}

	public ResponseEntity<ApiResponse> replyTweet(final String token, String username, String id, Comment comment) {
		try {
			ValidationResponse validationResponse = jwtTokenValidation(token);
			if (validationResponse != null && validationResponse.getIsSuccess()) {
				if (LOGGER.isDebugEnabled()) {
					LOGGER.debug("{}, Information: Adding comment to the Tweet ", this.getClass().getSimpleName());
				}
				comment.setTime(LocalDateTime.now());
				ResponseEntity<String> response = updateServiceClient.replyTweet(comment, id);
				return new ResponseEntity<>(new ApiResponse(true, response.getBody()), response.getStatusCode());
			} else {
				return createUnauthorizedResponse(validationResponse);
			}
		} catch (FeignException e) {
			return createFeignExceptionResponse(e);
		} catch (RuntimeException e) {
			return createRuntimeExceptionResponse(e);
		}
	}

	private ResponseEntity<ApiResponse> createUnauthorizedResponse(ValidationResponse validationResponse) {
		ApiResponse apiResponse = new ApiResponse();
		apiResponse.setError(validationResponse.getMessage().toString());
		apiResponse.setSuccess(false);
		return new ResponseEntity<>(apiResponse, validationResponse.getCode());
	}

	private ResponseEntity<ApiResponse> createFeignExceptionResponse(FeignException e) {
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("{}, Information: Throwing FeignException with message {}", this.getClass().getSimpleName(),
					e.getMessage());
		}
		ApiResponse apiResponse = new ApiResponse();
		apiResponse.setError(e.contentUTF8().equals("") ? e.getMessage() : e.contentUTF8());
		apiResponse.setSuccess(false);
		HttpStatus status = e.status() == -1 ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.valueOf(e.status());
		return new ResponseEntity<>(apiResponse, status);
	}

	private ResponseEntity<ApiResponse> createRuntimeExceptionResponse(RuntimeException e) {
		if (LOGGER.isDebugEnabled()) {
			LOGGER.debug("{}, Information: Throwing RuntimeException with message {}", this.getClass().getSimpleName(),
					e.getMessage());
		}
		ApiResponse apiResponse = new ApiResponse();
		apiResponse.setError(e.getMessage());
		apiResponse.setSuccess(false);
		return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	private ValidationResponse jwtTokenValidation(String token) {
		try {
			if (LOGGER.isDebugEnabled()) {
				LOGGER.debug("{}, Information: Validating JWT token", this.getClass().getSimpleName());
			}
			return authenticationServiceClient.validateAndReturnUser(token).getBody();
		} catch (FeignException.Unauthorized e) {
			if (LOGGER.isDebugEnabled()) {
				LOGGER.debug("{}, Information: Throwing FeignException.Unauthorized with message {}",
						this.getClass().getSimpleName(), e.getMessage());
			}
			ValidationResponse validationResponse = new ValidationResponse();
			validationResponse.setIsSuccess(false);
			validationResponse.setMessage("JWT Token is Not Valid");
			validationResponse.setCode(HttpStatus.valueOf(e.status()));
			return validationResponse;
		} catch (FeignException e) {
			if (LOGGER.isDebugEnabled()) {
				LOGGER.debug("{}, Information: Throwing FeignException with message {}",
						this.getClass().getSimpleName(), e.getMessage());
			}
			ValidationResponse validationResponse = new ValidationResponse();
			validationResponse.setIsSuccess(false);
			validationResponse.setMessage("Exception occurred while invoking authentication Api");
			validationResponse.setCode(HttpStatus.INTERNAL_SERVER_ERROR);
			return validationResponse;
		}
	}

	@Override
	public ResponseEntity<ApiResponse> setTag(String token, Tag tag) {
		try {
			ValidationResponse validationResponse = jwtTokenValidation(token);
			if (validationResponse != null && validationResponse.getIsSuccess()) {
				kafkaTemplate.send(topic, tag);
				return new ResponseEntity<>(new ApiResponse(true, "tags sent"), HttpStatus.OK);
			} else {
				return createUnauthorizedResponse(validationResponse);
			}
		} catch (RuntimeException e) {
			return createRuntimeExceptionResponse(e);
		}
	}

}
