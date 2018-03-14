$(document).ready(function () {

    	$("#btnSubmit1,#btnSubmit2,#btnSubmit3,#btnSubmit4").click(function (event) {
	        //stop submit the form, I will post it manually.
	        event.preventDefault();
	        fire_ajax_submit(event);
    	});
	
});

function fire_ajax_submit(event) {
	
	var button;
	var form;
	var field;
	var err;
	
	switch(event.target.id) {
    case "btnSubmit1":
    	button = "#btnSubmit1";
        form = $('#fileUploadForm1')[0];
        field = "#first_image";
        err = "#err1";
        break;
    case "btnSubmit2":
    	button = "#btnSubmit2";
    	form = $('#fileUploadForm2')[0];
    	field = "#second_image";
    	err = "#err2";
        break;
    case "btnSubmit3":
    	button = "#btnSubmit3";
    	form = $('#fileUploadForm3')[0];
    	field = "#third_image";
    	err = "#err3";
        break;
    case "btnSubmit4":
    	button = "#btnSubmit4";
    	form = $('#fileUploadForm4')[0];
    	field = "#fourth_image";
    	err = "#err4";
        break;
} 

    // Get form
    var formData = new FormData(form); /* The FormData interface provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data". */
    
    /*for(pair of formData.entries())
		console.log(pair); // show key/value pairs contained in this object */
    
    $(button).prop("disabled", true);

    $.ajax({
        type: "POST", // Specifies the type of request. (GET or POST)
        enctype: 'multipart/form-data', /* No characters are encoded. This value is required when you are using forms that have a file upload control */
        url: "/api/upload/single", // Specifies the URL to send the request to. Default is the current page
        data: formData, // Specifies data to be sent to the server
        processData: false, //prevent jQuery from automatically transforming the data into a query string
        contentType: false, //The content type used when sending data to the server (application/x-www-form-urlencoded, multipart/form-data, or text/plain). Don't set header with contentType.
        cache: false, //A value indicating whether the browser should cache the requested pages. 
        timeout: 600000, /* Set a timeout (in milliseconds) for the request. A value of 0 means there will be no timeout. This will override any global timeout set with $.ajaxSetup(). The timeout period starts at the point the $.ajax call is made; if several other requests are in progress and the browser has no connections available, it is possible for a request to time out before it can be sent. */
        success: function (data) {
        	
        	if($(err).is(':visible')){
        		$(err).hide();
        	}
                    
        	$(field).children().addClass("remove-text");
        	$(field).css({
	            background: "url('data:image/png;charset=utf-8;base64,"+data+"'"+")",
	            backgroundRepeat: "no-repeat",
	            backgroundSize: "cover",
	            backgroundPosition: "center"
        	});

        	$(button).prop("disabled", false);
        },
        error: function (e) {

            $(err).show();
            
            if(e.status == 500){
            	$(err).text("The file exceeds its maximum permitted size of 1048576 bytes (1 MB).");
            }else {
                $(err).text(e.responseText);
            }
            
            $(button).prop("disabled", false);

        }
    });

}

function changeFieldsTo3() {
	
	$('#wizard').children().each(function(index) {
		$(this).addClass("fields3_" + (index+1));
	});
	
	$('#fileUploadForm4').addClass('hide-btn');

}

function changeFieldsTo4() {
	
	$('#wizard').children().each(function(index) {
		$(this).removeClass("fields3_" + (index+1));
	});
	
	$('#fileUploadForm4').removeClass('hide-btn');
}

function downloadCollage() {
	
	html2canvas($('#wizard'), {
		  onrendered: function(canvas) {
		    var img = canvas.toDataURL('image/jpeg');
		    window.open(img);
		  }
	});
}

/* Note */
/* html2canvas 
 * (from: https://html2canvas.hertzen.com/)
 * This script allows you to take "screenshots" of webpages or parts of it, 
 * directly on the users browser. The screenshot is based on the DOM and 
 * as such may not be 100% accurate to the real representation as it does not 
 * make an actual screenshot, but builds the screenshot based on the information 
 * available on the page. */