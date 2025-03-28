package com.sushant.s3;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3Config {

    @Value("${AWS_REGION}")
    private String awsRegion;

    @Value("${AWS_S3_MOCK}")
    private boolean mock;

    @Value("${AWS_S3_BUCKET_CUSTOMER}")
    private String s3Bucket;

    @Bean
    public S3Client s3Client() {
        if (mock) {
            return new FakeS3();
        }
        return S3Client.builder()
                .region(Region.of(awsRegion))
                .build();
    }

}
