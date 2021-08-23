package springboot.jewelry.controller.client;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/products")
public class ProductController {

    @GetMapping("")
    public String productPage() {
        return "client/product/products";
    }

    @GetMapping("/{product-id}")
    public String productDetailPage(@PathVariable("product-id") int id) {
        return "client/product/detail";
    }
}
