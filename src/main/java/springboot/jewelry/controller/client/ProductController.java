package springboot.jewelry.controller.client;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/product")
public class ProductController {

    @GetMapping("")
    public String productPage(Model model) {
        return "client/product/product";
    }

    @GetMapping("/{product-id}")
    public String productDetailPage(@PathVariable("product-id") int id) {
        return "client/product/detail";
    }
}
