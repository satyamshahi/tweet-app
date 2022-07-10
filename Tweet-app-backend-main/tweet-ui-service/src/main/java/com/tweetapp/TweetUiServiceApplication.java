package com.tweetapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class TweetUiServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TweetUiServiceApplication.class, args);
	}

}
