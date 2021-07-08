package pl.szczypkowski.electronicshop.controller;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.szczypkowski.electronicshop.dto.Purchase;
import pl.szczypkowski.electronicshop.dto.PurchaseResponse;
import pl.szczypkowski.electronicshop.service.CheckoutService;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase)
    {
        PurchaseResponse purchaseResponse=checkoutService.placeOrder(purchase);
        return purchaseResponse;
    }
}
