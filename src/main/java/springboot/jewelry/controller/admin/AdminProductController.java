package springboot.jewelry.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin/products")
public class AdminProductController {

    @GetMapping("")
    public String productsPage() {
        return "admin/product/products";
    }


    @GetMapping("/add")
    public String addProductPage() {
        return "admin/product/add";
    }

    @GetMapping("/edit")
    public String editProductpage() {
        return "admin/product/edit";
    }

}
