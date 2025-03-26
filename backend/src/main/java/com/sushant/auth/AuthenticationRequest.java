package com.sushant.auth;

public record AuthenticationRequest(
        String username,
        String password
) {
}
