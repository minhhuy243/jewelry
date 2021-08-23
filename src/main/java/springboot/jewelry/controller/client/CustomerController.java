package springboot.jewelry.controller.client;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CustomerController {

    @GetMapping("/customer/me")
    public String userMe() {
        return "client/customer/profile";
    }
}
