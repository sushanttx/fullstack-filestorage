package com.sushant;

import com.sushant.customer.Customer;
import com.sushant.customer.CustomerRepository;
import com.sushant.customer.Gender;
import com.sushant.s3.S3Buckets;
import com.sushant.s3.S3Service;
//import io.github.cdimascio.dotenv.Dotenv;
//import jakarta.annotation.PostConstruct;
import net.datafaker.Faker;
//import com.github.javafaker.Name;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Random;

@SpringBootApplication
public class Main {

    public static void main(String[] args) {
//        Dotenv dotenv = Dotenv.load();
        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner runner(
            CustomerRepository customerRepository,
            PasswordEncoder passwordEncoder,
            S3Service s3Service,
            S3Buckets s3Buckets) {
        return args -> {
//            logEnvironmentVariables();
            createRandomCustomer(customerRepository, passwordEncoder);

//             testBucketUploadAndDownload(s3Service, s3Buckets);
        };
    }

    private static void testBucketUploadAndDownload(S3Service s3Service,
                                                    S3Buckets s3Buckets) {
        s3Service.putObject(
                s3Buckets.getCustomer(),
                "foo/bar/jamila",
                "Hello World".getBytes()
        );

        byte[] obj = s3Service.getObject(
                s3Buckets.getCustomer(),
                "foo/bar/jamila"
        );

        System.out.println("Hooray: " + new String(obj));
    }

    private static void createRandomCustomer(CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        var faker = new Faker();
        Random random = new Random();
//        Name name = faker.name();
        String firstName = faker.name().firstName();
        String lastName = faker.name().lastName();
        int age = random.nextInt(16, 99);
        Gender gender = age % 2 == 0 ? Gender.MALE : Gender.FEMALE;
        String email = firstName.toLowerCase() + "." + lastName.toLowerCase() + "@gmail.com";
        Customer customer = new Customer(
                firstName +  " " + lastName,
                email,
                passwordEncoder.encode("password"),
                age,
                gender);
        customerRepository.save(customer);
        System.out.println(email);
    }
//    @PostConstruct
//    public void logEnvironmentVariables() {
//        System.out.println("RDS_HOST: " + System.getenv("RDS_HOST"));
//        System.out.println("RDS_DB_NAME: " + System.getenv("RDS_DB_NAME"));
//        System.out.println("RDS_USERNAME: " + System.getenv("RDS_USERNAME"));
//        System.out.println("RDS_PASSWORD: " + System.getenv("RDS_PASSWORD"));
//    }


}
