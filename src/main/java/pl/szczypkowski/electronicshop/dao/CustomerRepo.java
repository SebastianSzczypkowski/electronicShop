package pl.szczypkowski.electronicshop.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import pl.szczypkowski.electronicshop.entity.Customer;

@CrossOrigin(origins = "http://localhost:4200")
public interface CustomerRepo extends JpaRepository<Customer, Long> {
    Customer findByEmail(String theEmail);
}
