package pl.szczypkowski.electronicshop.dto;

import lombok.Data;
import pl.szczypkowski.electronicshop.entity.Address;
import pl.szczypkowski.electronicshop.entity.Customer;
import pl.szczypkowski.electronicshop.entity.Order;
import pl.szczypkowski.electronicshop.entity.OrderItem;

import java.util.Set;
@Data
public class Purchase {
    private Customer customer;
    private Address customerAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
