package com.saurav.HotelBookingApp.service;
import com.saurav.HotelBookingApp.model.Role;
import com.saurav.HotelBookingApp.model.User;
import java.util.List;

public interface IRoleService {
    List<Role> getRoles();
    Role createRole(Role theRole);

    void deleteRole(Long id);
    Role findByName(String name);

    User removeUserFromRole(Long userId, Long roleId);
    User assignRoleToUser(Long userId, Long roleId);
    Role removeAllUsersFromRole(Long roleId);
}
