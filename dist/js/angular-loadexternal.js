function load_js_file(filename) {
        var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
		if (typeof fileref != "undefined") {
			document.getElementsByTagName("head")[0].appendChild(fileref)
		}
    }
	
function load_css_file(filename) {
        //if filename is an external CSS file
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
		if (typeof fileref != "undefined") {
			document.getElementsByTagName("head")[0].appendChild(fileref)
		}
    }