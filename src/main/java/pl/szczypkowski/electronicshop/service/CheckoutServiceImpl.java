package pl.szczypkowski.electronicshop.service;

import org.springframework.stereotype.Service;
import pl.szczypkowski.electronicshop.dao.CustomerRepo;
import pl.szczypkowski.electronicshop.dto.Purchase;
import pl.szczypkowski.electronicshop.dto.PurchaseResponse;
import pl.szczypkowski.electronicshop.entity.Customer;
import pl.szczypkowski.electronicshop.entity.Order;
import pl.szczypkowski.electronicshop.entity.OrderItem;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepo customerRepo;

    public CheckoutServiceImpl(CustomerRepo customerRepo) {
        this.customerRepo = customerRepo;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        Order order = purchase.getOrder();

        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        order.setCustomerAddress(purchase.getCustomerAddress());

        Customer customer = purchase.getCustomer();

        String theEmail = customer.getEmail();

        Customer customerFromDB = customerRepo.findByEmail(theEmail);

        if(customerFromDB!=null)
        {
            customer=customerFromDB;
        }
        customer.add(order);

        customerRepo.save(customer);

        return new PurchaseResponse(orderTrackingNumber);
    }
    private String generateOrderTrackingNumber() {

        return UUID.randomUUID().toString();
    }
}
