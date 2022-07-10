package com.tweetapp.model;

import org.springframework.http.HttpStatus;

public class ValidationResponse {

	private String userId;
	private String message;
	private Boolean isSuccess;
	// @JsonIgnore
	private HttpStatus code;

	public ValidationResponse(String userId, String message, Boolean isSuccess) {
		super();
		this.userId = userId;
		this.message = message;
		this.isSuccess = isSuccess;
	}

	public ValidationResponse() {
		super();
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Boolean getIsSuccess() {
		return isSuccess;
	}

	public void setIsSuccess(Boolean isSuccess) {
		this.isSuccess = isSuccess;
	}

	public HttpStatus getCode() {
		return code;
	}

	public void setCode(HttpStatus code) {
		this.code = code;
	}

}
