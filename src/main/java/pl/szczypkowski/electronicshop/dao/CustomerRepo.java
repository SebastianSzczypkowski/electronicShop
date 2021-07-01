package pl.szczypkowski.electronicshop.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.szczypkowski.electronicshop.entity.Customer;

public interface CustomerRepo extends JpaRepository<Customer, Long> {
    Customer findByEmail(String theEmail);
}
