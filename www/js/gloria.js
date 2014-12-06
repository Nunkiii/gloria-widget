

var gloria_metadata = function(){};


gloria_metadata.prototype= {
    status : {name : "Status", db_name : "status", type : "string", select : "single"},
    date : {name : "Date", db_name : "date", type : "date", select : "choice" , value : "2010:03:11", ui_opts : { editable: true}},
    user : {name: "User", db_name : "user", type : "string", select : "single", value : "Toto", ui_opts : { editable: true}},
    observer : {name: "Observer", db_name : "observer", type : "string", select : "single", ui_opts : { editable: true}},		    
    reservation_id : {name: "Reservation ID", db_name : "reservation_id", type : "double", select : "choice", ui_opts : { editable: true}},
    experiment : {name : "Experiment", db_name : "experiment", type : "string", select : "single", ui_opts : { editable: true}},
    telescop : {name : "Telescope", db_name : "telescop", type : "string", select : "single", ui_opts : { editable: true}},
    instrument : {name : "Instrument", db_name : "instrument", type : "string", select : "single", ui_opts : { editable: true}},
    filter : {name : "Filter", db_name : "filter", type : "string", select : "single", ui_opts : { editable: true}},
    target_name : {name : "Target name", db_name : "target_name", type : "string", select : "single", ui_opts : { editable: true}},
    exptime : {name : "Exposure time", db_name : "exptime", type : "double", select : "choice", ui_opts : { editable: true}},
    target_ra : {name : "Right ascension", db_name : "target_ra", type : "double", select : "choice", ui_opts : { editable: true}},
    target_dec : {name : "Declination", db_name : "target_dec", type : "double", select : "choice", ui_opts : { editable: true}}
};

var image_db_browser_templates = {
    
    gloria_view :  {
	//	name : "GLORIA Image DB",
//		type : "template",
	ui_opts: {child_view_type : "tabbed", root : true},
	elements : {
	    browser : {
		name : "Browse images",
		ui_opts: { root_classes : [], child_view_type : "div", render_name: false},
		intro : "Browse the GLORIA Image database",
		type : "template",
		template_name : "image_db_browser",
	    },
	    submit : {
		name : "Submit",
		intro : "Submit a new FITS image to the GLORIA database.",
		tpl_builder : "gloria_submit",
		ui_opts : { sliding : false, sliding_dir : "v", slided : true, child_view_type : "bar"},
		elements : {
		    source : {
			name : "FITS Image source",
			intro : " Choose an image file to import using one of the following sources :",
			ui_opts : { sliding: true, sliding_animate: false, slided : true, child_view_type : "radio",root_classes : ["inline"]},
			elements : {
			    local_file : {
				name : "Local FITS file",
				type : "local_file",
				value : "XXX",
				intro : "Choose a FITS file on your local filesystem",
				ui_opts : {type : "edit", editable : true, edited : true}
			    },
			    url : {
				name : "URL to FITS file",
				type : "url",
				intro : "Link to a downloadable FITS image file : ",
				download : true,
				ui_opts : {type : "edit", editable : true, edited : true}
			    }
			}
		    },
		    keys : {
			name : "Gloria Meta-Information", elements :  new gloria_metadata(), 
			ui_opts : {root_classes : ["inline"], sliding: true, slided : true},
			intro : "Enter the following required GLORIA keyword fields"
		    }
		}
	    },
	    about : { 
		name : "About", type : "html", url : "about_gloria.html", 
		ui_opts : { sliding : false, sliding_dir : "v", slided : true, root_classes : []} 
	    }
	}
    },

    image_db_browser : {
	//name : "DB Browser",
	tpl_builder : "image_db_browser",
	events : ["image_data"],
	elements : {
	    cnx : { 
		name : "DB status",
		type : "text",
		ui_opts: { root_classes : [], sliding : false, slided: true, in_root: false},
		elements : {
		    bytesread : { name : "Bytes read", type : "bytesize", value : 0, ui_opts : { in_root : true} },
		    nrecords : { name : "Selected records", type : "double", min : 0, step : 1, value : 0, ui_opts : { in_root : true}},
		    select : { name : "Image selection", elements :  new gloria_metadata(), ui_opts : { in_root : false}},
		    
		}
	    },
	    query : { 
		name : "Query",
		ui_opts: { root_classes : [], sliding : true, slided: false, in_root: false, child_view_type : "tabbed"},
		elements : {
		    
		    bytesread : { name : "Bytes read", type : "bytesize", value : 0, ui_opts : { root_classes : ["inline"], in_root : false} },
		    nrecords : { name : "Selected records", type : "double", min : 0, step : 1, value : 0, ui_opts : { root_classes : ["inline"], in_root :false}},
		    status : { name : "Log", type : "text", ui_opts : {root_classes : ["newline"], sliding:true, slided : false} },
		    select : { name : "Image selection", elements :  new gloria_metadata(), ui_opts : { sliding: true, slided: false, root_classes : ["inline"], in_root : false}},
		    
		}
	    },
	    controls : {
		//name : "Controls", 
		ui_opts : { child_classes : [], in_root : true, sliding : false, slided : true},
		elements : {
		    prev_page : {
			type : "action",
			name : "<<"
		    },
		    next_page : {
			type : "action",
			name : ">>"
		    }
		}
	    },
	    
	    mini_view : {
		//name : "Browse",
		ui_opts: { root_classes : [], child_classes : ["hscroll"],child_view_type : "div", sliding : false, slided : true, in_root : true}
	    },
	    detail_view : {
		name : "Selected",
		ui_opts: { root_classes : [], child_view_type : "bar", sliding : true, slided : true, in_root : false},
		elements : {
		    gl_viewer : {
			name : "GL View",
			type : "template",
			template_name : "geometry",
			
			ui_opts: {
			    //sliding: true,
			    //slided : false,
			    child_view_type : "div"
			},
			
			elements : {
			    layer : {
      				name : "Colors/Levels",
       				type : "template",
				template_name : "gl_image_layer",
				ui_opts: {
	     			    sliding: true, sliding_dir:"h", slided : false, root_classes : ["inline"], child_classes : ["inline"],child_view_type : "bar"
				}
			    }
			}
		    },
		    
		}
	    }
	}
    },
    
    img_view : {
	//name : "ImgView",      
	ui_opts: { root_classes : ["inline"], child_view_type : "div"},
	elements : {
	    picture : {  type: "image_url", ui_opts : {item_classes : ["newline"]}, 
			 value : "https://avatars3.githubusercontent.com/u/6526387?v=2&s=200" },
	    desc : {
		ui_opts: { root_classes : ["newline"], child_view_type : "div"}
	    } 
	}
    },
    img_detail : {
    elements : {
	user : { name : "User", type : "string", ui_opts : {root_classes : ["squeeze","newline"]}},
	date_obs : {name : "Observation date",type : "date", value : "2014:10:12", ui_opts : {root_classes : ["squeeze","newline"]} },
	experiment_type : { name : "Experiment type", type: "string", ui_opts : {root_classes : ["squeeze","newline"]} },
	telescop : { name : "Telescope", type : "string", ui_opts : {root_classes : ["squeeze","newline"]}},
	exptime : { name : "Exposure time", type : "double", ui_opts : {root_classes : ["squeeze","newline"]}},
	target_ra : { name : "RA", type : "double", ui_opts : {root_classes : ["squeeze","newline"]}},
	target_dec : { name : "DEC", type : "double", ui_opts : {root_classes : ["squeeze","newline"]}},
	
      actions : {
	elements : {
	  view : {
	    name : "View image",
	    type : "action"
	  },
	  download : {
	    name : "Download FITS image",
	    type : "action"
	  }
	}
      }
    }
  },
  
  img_sumary : {
    
  }
  
};

(function(){
    sadira.listen("ready",function(){
	console.log("adding gloria templates");
//    window.addEventListener("load",function(){
	tmaster.add_templates(image_db_browser_templates);

	
	// var gloria_tpl = tmaster.build_template("gloria_view"); 
	// gloria_tpl.xdone_node=document.getElementById("xdone");
	// var gloria_ui = create_ui({},gloria_tpl);
	
    });
})();
