package springboot.jewelry.controller.client;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/{category-slug}")
public class ProductController {

    @GetMapping("")
    public String productPage() {
        return "client/product/products";
    }

    @GetMapping("/{slug}")
    public String productDetailPage() {
        return "client/product/detail";
    }

}
