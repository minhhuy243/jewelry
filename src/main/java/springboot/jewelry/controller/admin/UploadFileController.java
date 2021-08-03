package springboot.jewelry.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UploadFileController {

    @GetMapping("/upload")
    public String uploadPage() {
        return "admin/test-upload";
    }
}
