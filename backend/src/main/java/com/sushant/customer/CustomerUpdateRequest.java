package com.sushant.customer;

public record CustomerUpdateRequest(
        String name,
        String email,
        Integer age
) {
}
