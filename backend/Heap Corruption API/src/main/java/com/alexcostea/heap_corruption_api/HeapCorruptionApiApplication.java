package com.alexcostea.heap_corruption_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HeapCorruptionApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(HeapCorruptionApiApplication.class, args);
    }

}
