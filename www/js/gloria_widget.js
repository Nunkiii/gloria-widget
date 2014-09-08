//window.addEventListener("load", function(){

//alert("Abraacadabra!");

var image_db_browser_templates = {

  gloria_view :  {
    name : "GLORIA Widget",
    type : "template",
    template_name : "image_db_browser",
    
    ui_opts: {root_classes : ["inline"], item_classes : ["inline"], child_classes : ["inline"],  editable : false, 
	      sliding : false, sliding_dir : "h", slided : true, child_view_type : "bar"},
    //ui_opts: {sliding: true, sliding_dir:"h", root_classes : []},
    // elements : {
    //     layers : { 
    // 	name: "Layers", 
    elements : {
      // layer_config : {
      // 	name : "Image settings",
      // 	//type : "template",
      // 	//template_name : "gl_image_layer",
      // 	ui_opts: {
      // 	  sliding: true, sliding_dir:"h", slided : true, root_classes : ["inline"], child_classes : ["inline"],child_view_type : "tabbed"
      // 	}
	// },
	geometry : {
	    name : "Image setup",
	    type : "template",
	    template_name : "geometry",
	    ui_opts: {
		sliding: true,
		child_view_type : "div"
	    }
	},
	
	about : { name : "About", type : "html", url : "about_gloria.html", ui_opts : { sliding : true, sliding_dir : "v", slided : false, root_classes : ["inline"]} }
	
    }
  },
  

    image_db_browser : {
	name : "DB Browser",
	tpl_builder : "image_db_browser",
	elements : {
	    cnx : { 
		name : "DB status",
		ui_opts: { root_classes : ["inline"], sliding : true, slided: false},
		elements : {
		    bytesread : { name : "Bytes read", type : "bytesize", value : 0},
		    nrecords : { name : "Selected records", type : "double", min : 0, step : 1, value : 0}
		}
	    },
	    select : {
		ui_opts: { root_classes : ["inline"], child_view_type : "tabbed", sliding : true, slided : false},
		name : "Select",
		elements : {
		    status : {name : "Status"},
		    date : {
			elements : {
			    single_date : {
				name: "Single date", 
				type: "date", 
				value : "2014:12:11", 
				ui_opts : {editable : true }
			    },
			    date_range : {
				name: "Date range", 
				type: "labelled_vector", 
				vector_type : "date",
				value_labels : ["Start","End"], 
				value : ["2014:1:1","2015:1:1"], 
				ui_opts : {editable : true }
			    }
			}
		    },
		    user : {name: "User"},
		    observer : {name: "Observer"},		    
		    reservation_id : {name: "Reservation ID"},
		    experiment : {name : "Experiment"},
		    telescop : {name : "Telescope"},
		    instrument : {name : "Instrument"},
		    filter : {name : "Filter"},
		    target_name : {name : "Target name"},
		    exptime : {name : "Exposure time"},
		    coord : {
			name : "Coordinates",
			type: "labelled_vector", 
			vector_type : "date",
			value_labels : ["Ra","Dec"], 
			value : [0.0,0.0], 
			ui_opts : {editable : true }
		    }
		},
	    },
	    browser : {
		name : "Browse",
		ui_opts: { root_classes : [], child_view_type : "div", sliding : true, slided : true},
		elements : {
		    controls : {
			name : "Controls", 
			ui_opts : { child_classes : ["inline"]},
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
			ui_opts: { root_classes : [], child_classes : ["hscroll"],child_view_type : "div", sliding : false, slided : true}
		    },
		    detail_view : {
			//	 name : "Selected",
			ui_opts: { root_classes : [], child_view_type : "div", sliding : false, slided : true},
		    }
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

function update_template_values(tpl, data){
  
  for(var d in data){
    if(typeof tpl.elements[d]!='undefined')
    tpl.elements[d].set_value(data[d]);
  }
  
}

/*
"autoID": 36,
"datein": "2014-06-09T21:24:39.000Z",
"experiment_type": "night",
"user": "dmikusz@poczta.fm",
"experiment": "Default Night Experiment",
"reservation_id": 4776,
"file_url": "http://altamira.asu.cas.cz:8081/RTIDBRepository/FileServlet?format=FITS&uuid=0000000e00000001201406090000014682843208v001",
"file_name": "jwzzn7nlwgq4cxr.fits",
"file_path": "/data/gloria/",
"telescop": "D50",
"instrument": "main camera C0, IMG 4710",
"observer": "GLORIA  ",
"date_obs": "2014-06-09T21:24:32.000Z",
"exptime": 21.7,
"filter": "N       ",
"target_ra": 204.41511918620267,
"target_dec": -29.902533097070318,
"target_name": "unknown ",
"status": "ok",
"json_params": ""
*/

function load_gloria_widget(){
  
  var xd1 = new xdone();
  xd1.xdone_init({ server_root : "http://sadira.iasfbo.inaf.it/gloria-widget/XD-1/"});
  
}

var request = function (opts){
  //this.opts=opts;
  this.build_url_string=function(){
    this.url_string=opts.host+opts.cmd+"?req="+encodeURIComponent(JSON.stringify(opts.args));
    return this.url_string;
  }
  
  this.execute=function(cb){
    this.build_url_string();
    console.log("XHR QUERY");
    if(opts.json){
      json_query(this.url_string,cb,opts.xhr);
    }
    else{
      xhr_query(this.url_string,cb,opts.xhr);
    }
  }
  return this;
};

template_ui_builders.image_db_browser=function(ui_opts, tpl_item){

    var host = "http://sadira.iasfbo.inaf.it:9999/";
    //var host = "http://localhost:9999/";
    
    var ui=tpl_item.ui=ce("div"); 
    //ui.innerHTML="Hello db Browser !";
    ui.add_class("image_db_browser");
    
    var status=tpl_item.elements.cnx.ui_root;
    var browser  = tpl_item.elements.browser;
    var mini_view = browser.elements.mini_view;
    var detail_view = browser.elements.detail_view;

    var prev=browser.elements.controls.elements.prev_page;
    var next=browser.elements.controls.elements.next_page;

    var detailview;
    var doc_detail_template=tmaster.build_template("img_detail"); 
    var nb=tpl_item.elements.cnx.elements.bytesread;

    var download_progress = function(e){
	//console.log("progress !" + e.loaded);
	if (e.lengthComputable) {
	    var complete = e.loaded /e.total*100.0;
	    console.log(query + " progress " + complete);
	} else {
	    //console.log(query + " progress unknown bytes read " + xhr.response.length + " loaded " + e.loaded);
	    
	    // Unable to compute progress information since the total size is unknown
	}
	nb.set_value(e.loaded*1.0);
    }
    
    doc_detail_template.elements.actions.elements.view.onclick=function(){
	//alert("View image ID " + doc_detail_template.data.autoID);
	
	
	var op={
	    host : host,
	    cmd :  "gloria/get_image",
	    args: {id : doc_detail_template.data.autoID, decode : true},
	    json : false,
	    xhr :{ type :  "arraybuffer", progress : download_progress }
	}
	var rq= new request(op);

	nb.set_value(-100);
	rq.execute(function(error, data){
	    if(error){
		status.innerHTML+="FITS data query failed : " + error + "<br/>";
		return;
	    }
	    

	    status.innerHTML+="FITS data type "+ typeof(data) +" : byteLength " + data.byteLength + " length " + data.length + "<br/>";
	    //tpl_item.elements.cnx.elements.bytesread.set_value(data.byteLength);

	    
	    var dgm= new datagram();
	    dgm.deserialize(data);
	    
	    tpl_item.lay.setup_dgram_layer(dgm.header,dgm.data);
	    //tpl_item.lay.load_fits_data(data);
	});
    };

    doc_detail_template.elements.actions.elements.download.onclick=function(){
	
    };

    var request_position=0;
    var request_size=5;
    var buffer_size=20;

    


    var buffer=[];
    var nread_radius=3;

    buffer[0]={ data: null};
    for(var i=1;i<buffer_size;i++){
	var bi=buffer[i]={ data: null, prev : buffer[i-1]}; buffer[i-1].next=bi;
    }
    buffer[buffer_size-1].next=buffer[0];
    buffer[0].prev=buffer[buffer_size-1];


    next.onclick=function(){
	retrieve_metadata(0, request_size, function(error, data){
	    if(error!=null){
		status.innerHTML+="Request failed ! " + error + "<br/>";
		console.log("Request failed ! ");
		return;
	    }
	    n_query=data.n;
	    //console.log("Received " + JSON.stringify(data));
	    status.innerHTML+="Received : <pre>" + JSON.stringify(data,null,5) + "</pre><br/>";
	    var rows=data.data;
	    for(var i=0;i<rows.length;i++){
		var r=rows[i];
		var doc_template=add_mini_view(r);
		if(i==0)doc_template.clicked();
	    }
	    
	});
    }
    
    function retrieve_metadata(start, size, cb){
	var opts={
	    host : host,
	    cmd :  "gloria/query_images",
	    args :  { from : request_position, to : request_position+request_size-1},
	    json : true,
	    xhr : { progress : download_progress }
	};
	var r= new request(opts);
	r.execute(cb);
    };
    
    
    function add_mini_view(r, row_id){
	var doc_template =tmaster.build_template("img_view"); 
	doc_template.data=r;
	
	doc_template.clicked=function(){
	    if(typeof detailview=='undefined'){
		detailview = create_ui({ type: "short", root_classes : [] }, doc_detail_template,0 );
		detail_view.ui_childs.add_child(doc_detail_template, detailview);
	    }
	    update_template_values(doc_detail_template, this.data);
	    doc_detail_template.data=this.data;
	    
	}
	
	var docview = create_ui({ type: "short", root_classes : [] }, doc_template,0 );
	doc_template.elements.desc.ui_root.innerHTML="User: " + r.user + "<br/>Target: " + r.target_name + " (" + r.experiment_type + ") <br/>Date: " + r.datein;
	doc_template.elements.picture.set_value("http://sadira.iasfbo.inaf.it:9999/gloria/get_image?req="+encodeURIComponent((JSON.stringify({ type : "jpeg", id : doc_template.data.autoID }))));
	
	//docview.add_class("hscroll_item");
	
	mini_view.ui_childs.add_child(doc_template,docview);
	last_row_id=row_id;
	
	var vl=mini_view.ui_childs.div.children.length;
	console.log("N mini views =  " + vl );

	return doc_template;
    }
    
    var n_query=0;


    retrieve_metadata(0, request_size, function(error, data){
	if(error!=null){
	    status.innerHTML+="Request failed ! " + error + "<br/>";
	    console.log("Request failed ! ");
	    return;
	}
	n_query=data.n;
	//console.log("Received " + JSON.stringify(data));
	status.innerHTML+="Received : <pre>" + JSON.stringify(data,null,5) + "</pre><br/>";
	var rows=data.data;
	for(var i=0;i<rows.length;i++){
	    var r=rows[i];
	    var doc_template=add_mini_view(r);
	    if(i==0)doc_template.clicked();
	}

    });
    
    return ui;
}
