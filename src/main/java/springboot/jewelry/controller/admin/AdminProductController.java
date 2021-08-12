package springboot.jewelry.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/product")
public class AdminProductController {

    @GetMapping("/add")
    public String addProductPage() {
        return "admin/product/add";
    }
}
