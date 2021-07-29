package springboot.jewelry.controller.client;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AuthController {

    @GetMapping("/login")
    public String loginPage() {
        return "client/auth/login";
    }

    @GetMapping("/register")
    public String registerPage() {
        return "client/auth/register";
    }
}
