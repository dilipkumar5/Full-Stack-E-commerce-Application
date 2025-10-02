package com.ecommerce.project.exceptions;

public class NoCategoryPresentException extends RuntimeException {
    public NoCategoryPresentException() {
    }

    public NoCategoryPresentException(String message) {
        super(message);
    }
}
