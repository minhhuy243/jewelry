package springboot.jewelry.controller.client;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
//        ModelAndView mav = new ModelAndView("client/home/home.html");
//        return mav;
        model.addAttribute("LAYOUT_TITLE", "BLUX");
        model.addAttribute("CONTENT_TITLE", "TRANG CHU");
        return "client/home/home";
    }
}
