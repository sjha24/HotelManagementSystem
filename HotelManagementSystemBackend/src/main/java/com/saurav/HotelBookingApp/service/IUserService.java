package com.saurav.HotelBookingApp.service;

import com.saurav.HotelBookingApp.model.User;

import java.util.List;

public interface IUserService {
    void registerUser(User user);
    List<User> getUsers();
    void deleteUser(String email);
    User getUser(String email);
}
