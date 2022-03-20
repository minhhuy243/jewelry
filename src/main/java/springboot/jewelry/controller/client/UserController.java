package springboot.jewelry.controller.client;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @GetMapping("/user/me")
    public String userMe() {
        return "client/user/profile";
    }
}
