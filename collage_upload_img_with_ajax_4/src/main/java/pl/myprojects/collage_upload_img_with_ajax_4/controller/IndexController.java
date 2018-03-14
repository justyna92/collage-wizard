package pl.myprojects.collage_upload_img_with_ajax_4.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

	private static final String[] list = {"Spring Boot", "Thymeleaf", "Maven", "JavaScript", 
    		"jQuery", "jQuery.ajax", "HTML", "CSS", "Bootstrap"};
	
    @GetMapping("/")
    public String main() {
        return "upload";
    }
    
    @GetMapping("/technologies")
    public String about(Model model) {
    	
    	model.addAttribute("technologies", list);
    	
        return "technologies";
    }

}
