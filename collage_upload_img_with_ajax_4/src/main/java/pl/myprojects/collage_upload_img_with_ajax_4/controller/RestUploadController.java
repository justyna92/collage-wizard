package pl.myprojects.collage_upload_img_with_ajax_4.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController // @Controller + @ResponseBody
public class RestUploadController {

	// file upload
	@PostMapping("/api/upload/single")
	public ResponseEntity<?> uploadFileMulti(@RequestParam("file") MultipartFile uploadfile) throws IOException {

		if (!uploadfile.getContentType().equalsIgnoreCase("image/jpg")
				&& !uploadfile.getContentType().equalsIgnoreCase("image/jpeg")
				&& !uploadfile.getContentType().equalsIgnoreCase("image/png")) {

			return new ResponseEntity<>("Incorrect file extension. Select a jpg, jpeg or png file.", HttpStatus.UNSUPPORTED_MEDIA_TYPE);

		} else {
			
			byte[] bytes = uploadfile.getBytes();

			bytes = Base64.encodeBase64(bytes);

			HttpHeaders headers = new HttpHeaders();
			
			List<MediaType> medias = new ArrayList<MediaType>();
			medias.add(MediaType.APPLICATION_OCTET_STREAM);
			
			headers.setAccept(medias);

			return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
		}

	}

}
