package com.tweetapp.model;

import java.util.List;

import javax.validation.constraints.NotNull;

public class Tag {

	@NotNull
	private String tweetId;
	@NotNull
	private List<String> users;

	public Tag() {
		super();
	}

	public Tag(String tweetId, List<String> users) {
		super();
		this.tweetId = tweetId;
		this.users = users;
	}

	public String getTweetId() {
		return tweetId;
	}

	public void setTweetId(String tweetId) {
		this.tweetId = tweetId;
	}

	public List<String> getUsers() {
		return users;
	}

	public void setUsers(List<String> users) {
		this.users = users;
	}

}
