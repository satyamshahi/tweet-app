package com.tweetapp.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class Tweet {

	private String id;
	@NotNull
	private String loginId;
	@NotNull
	private String avtar;
	@NotNull
	@Size(min = 1, max = 144)
	private String message;
	private LocalDateTime time;
	private List<String> isLikeList;
	private List<Comment> commentList;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAvtar() {
		return avtar;
	}

	public void setAvtar(String avtar) {
		this.avtar = avtar;
	}

	public String getLoginId() {
		return loginId;
	}

	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public LocalDateTime getTime() {
		return time;
	}

	public void setTime(LocalDateTime localDateTime) {
		this.time = localDateTime;
	}

	public List<String> getIsLikeList() {
		return isLikeList;
	}

	public void setIsLikeList(List<String> isLikeList) {
		this.isLikeList = isLikeList;
	}

	public List<Comment> getCommentList() {
		return commentList;
	}

	public void setCommentList(List<Comment> commentList) {
		this.commentList = commentList;
	}

}
