package com.tweetapp.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class UpdateTweet {

	@NotNull
	@Size(min = 1, max = 144)
	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
