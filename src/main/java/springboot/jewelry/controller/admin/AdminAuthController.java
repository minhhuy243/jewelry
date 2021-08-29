package springboot.jewelry.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminAuthController {

    @GetMapping("/admin/login")
    public String loginAdminPage() {
        return "admin/auth/login";
    }
}
