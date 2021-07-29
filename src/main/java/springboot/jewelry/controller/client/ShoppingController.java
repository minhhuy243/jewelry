package springboot.jewelry.controller.client;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ShoppingController {

    @GetMapping("/cart")
    public String cartPage() {
        return "client/shopping/cart";
    }

    @GetMapping("/checkout")
    public String checkoutPage() {
        return "client/shopping/checkout";
    }
}
