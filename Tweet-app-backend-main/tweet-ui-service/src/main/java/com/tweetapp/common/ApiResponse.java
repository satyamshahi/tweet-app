package com.tweetapp.common;

public class ApiResponse {

	private Boolean success;
	private Object data;
	private Object error;

	public ApiResponse(Boolean success, Object data) {
		super();
		this.success = success;
		this.data = data;
	}

	public ApiResponse(Object error) {
		super();
		this.error = error;
	}

	public ApiResponse() {
		super();
	}

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public Object getError() {
		return error;
	}

	public void setError(Object error) {
		this.error = error;
	}

}
