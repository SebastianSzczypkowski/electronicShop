package pl.szczypkowski.electronicshop.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pl.szczypkowski.electronicshop.entity.Order;

@RepositoryRestResource
public interface OrderRepo extends JpaRepository<Order,Long> {
    Page<Order> findByCustomerEmailOrderByDateCreatedDesc(@Param("email") String email, Pageable pagable);
}
