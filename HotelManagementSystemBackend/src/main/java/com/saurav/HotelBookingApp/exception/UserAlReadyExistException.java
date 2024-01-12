package com.saurav.HotelBookingApp.exception;

public class UserAlReadyExistException extends RuntimeException{
    public UserAlReadyExistException(String message){
        super(message);
    }
}
