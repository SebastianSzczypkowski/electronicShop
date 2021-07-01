package pl.szczypkowski.electronicshop.service;

import pl.szczypkowski.electronicshop.dto.Purchase;
import pl.szczypkowski.electronicshop.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
