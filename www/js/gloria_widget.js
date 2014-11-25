//window.addEventListener("load", function(){

//alert("Abraacadabra!");


function setup_query_template (tpl) {

    function setup_single(it){
	var it_tpl=it.tpl={ type : it.db_type};
	it.select_mode="single";
	var ui=create_ui({ type: "edit", root_classes : [] }, it_tpl,0 );
	if(typeof it.sel_ui === 'undefined'){
	    it.sel_ui=ui;
	    it.ui_root.appendChild(ui);
	}else{
	    it.ui_root.replaceChild(ui,it.sel_ui);
	    it.sel_ui=ui;
	}

    };

    function setup_multi(it){
	var it_tpl=it.tpl={ type: "labelled_vector",  vector_type : it.db_type, value_labels : ["Start","End"], value : [0,0] };
	var ui=create_ui({ type: "edit", root_classes : [] }, it_tpl,0 );
	it.select_mode="range";

	if(typeof it.sel_ui === 'undefined'){
	    it.sel_ui=ui;
	    it.ui_root.appendChild(ui);
	}else{
	    it.ui_root.replaceChild(ui, it.sel_ui);
	    it.sel_ui=ui;
	}
    }
    
    for (var field in tpl){

	var it=tpl[field];
	//console.log("Field " + field);
	var sp=cc("span",it.ui_root, true); //cc("span",sp).innerHTML="Enabled : ";
	var enable_check=it.enabled=cc("input",sp); enable_check.type="checkbox";
	
	switch(it.select){
	case 'single':
	    setup_single(it);
	    break;
	case 'choice':
	    var selbox=cc("span",it.ui_root); 
	    var lab=cc("label", selbox); lab.innerHTML="Single";
	    var single_sel=cc("input",lab); 
	    single_sel.type="radio";
	    single_sel.checked="checked";
	    single_sel.name="sel";
	    single_sel.it=it;

	    var lab=cc("label", selbox); lab.innerHTML="Range";
	    var multi_sel=cc("input",lab); 
	    multi_sel.type="radio"; 
	    multi_sel.name="sel";
	    multi_sel.it=it;

	    single_sel.onclick=function(){
		setup_single(this.it);
	    }
	    multi_sel.onclick=function(){
		setup_multi(this.it);
	    }
	    setup_single(it);
	    break;
	default:
	    break;
	};

    }
}


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

//function load_gloria_widget(){
  
//  var xd1 = new xdone();
//  xd1.xdone_init({ server_root : "http://sadira.iasfbo.inaf.it/gloria-widget/XD-1/"});
  
//}


template_ui_builders.image_db_browser=function(ui_opts, tpl_item){

  console.log("GLORIA widget building "+tpl_item.name);

    var host = "http://sadira.iasfbo.inaf.it/";
    //var host = "http://localhost/";
    
    var ui=tpl_item.ui=ce("div"); 
    //ui.innerHTML="Hello db Browser !";
    //ui.add_class("image_db_browser");
    
    var layer=tpl_item.elements.layer;
    var status=tpl_item.elements.cnx;

    var browser  = tpl_item.elements.browser;
    var submit  = tpl_item.elements.submit;
    var submit_keys  = submit.elements.keys.elements;
    
    submit_keys.telescop.ui_root.add_class("disabled");
    submit_keys.status.ui_root.add_class("disabled");
    submit_keys.date.ui_root.add_class("disabled");
    submit_keys.observer.ui_root.add_class("disabled");
    submit_keys.instrument.ui_root.add_class("disabled");
    submit_keys.filter.ui_root.add_class("disabled");
    submit_keys.target_name.ui_root.add_class("disabled");
    submit_keys.target_ra.ui_root.add_class("disabled");
    submit_keys.target_dec.ui_root.add_class("disabled");
    submit_keys.exptime.ui_root.add_class("disabled");

    var mini_view = browser.elements.mini_view;
    var detail_view = browser.elements.detail_view;

    var prev=browser.elements.controls.elements.prev_page;
    var next=browser.elements.controls.elements.next_page;

    var page_info=cc("span", browser.elements.controls.ui_childs.div, true);

    var select = browser.elements.query.elements.select;
    setup_query_template(select.elements);
    setup_query_template(select.elements);

    function build_query(){

	var q={};
	
	for (var e in select.elements){
	    var it=select.elements[e]; 
	    if(it.enabled.checked){
		console.log(e + " enabled ! mode " + it.select_mode + " V=" + it.tpl.value );
		switch(it.select_mode){
		case 'single' : 
		    q[e]={ single : it.tpl.value};
		    break;
		case 'range' :
		    q[e]={ range : it.tpl.value};
		    break;
		default : 
		    break;
		};
	    }

	}
	
	console.log("New query is " + JSON.stringify(q));
	return q;
    }


/*
    var refresh_action={
	name : "Refresh query",
	type : "action",
	onclick :  function(){
	    reset_metadata();
	}
    };

    var refresh_select=create_ui({ },refresh_action ,0 );
    select.ui_root.appendChild(refresh_select);
*/
    var detailview;
    var doc_detail_template=tmaster.build_template("img_detail"); 
    var nb=browser.elements.query.elements.bytesread;
    var status=browser.elements.query.elements.status;

    var download_progress = function(e){
	//console.log("progress !" + e.loaded);
	if (e.lengthComputable) {
	    var complete = e.loaded /e.total*100.0;
	    //console.log( " progress % : " + complete);
	} else {
	    //console.log( " progress  loaded " + e.loaded);
	    
	    // Unable to compute progress information since the total size is unknown
	}
       nb.set_value(e.loaded*1.0);
    }
    
    doc_detail_template.elements.actions.elements.view.onclick=function(){
	//alert("View image ID " + doc_detail_template.data.autoID);
	var op={
	    host : host,
	    cmd :  "gloria/get_image",
	    args: {id : doc_detail_template.data.autoID, type : "jsmat"},
	    json : false,
	    xhr :{ type :  "arraybuffer", progress : download_progress }
	}
	var rq= new request(op);

	nb.set_value(-100);
	rq.execute(function(error, data){
	    if(error){
		status.append("FITS data query failed : " + error + "<br/>");
		return;
	    }
	    //status.append("Downloaded " + data.byteLength + " length " + data.length + "<br/>");
	    //tpl_item.elements.cnx.elements.bytesread.set_value(data.byteLength);
	    var dgm= new datagram();
	    dgm.deserialize(data);
	    dgm.header.gloria=doc_detail_template.data;
	    tpl_item.trigger("image_data", dgm);
	    //layer.setup_dgram_layer(dgm.header,dgm.data);
	    //tpl_item.lay.load_fits_data(data);
	});
    };

    doc_detail_template.elements.actions.elements.download.onclick=function(){
	
    };

    var position=[0,0];
    var request_size=3;
    var buffer_size=5;
    var buffer=[];
    var nread_radius=3;
    var n_query=0;

    buffer[0]={ data: null};
    for(var i=1;i<buffer_size;i++){
	var bi=buffer[i]={ data: null, prev : buffer[i-1]}; buffer[i-1].next=bi;
    }
    buffer[buffer_size-1].next=buffer[0];
    buffer[0].prev=buffer[buffer_size-1];


    next.listen("click",function(){
	console.log("NEXT!");
	retrieve_metadata(position[1], request_size, function(error, data){
	    if(error!=null){
		status.append("Request failed ! " + error + "<br/>");
		console.log("Request failed ! " + error);
		return;
	    }
	    n_query=data.n;
	    //console.log("Received " + JSON.stringify(data));
	    status.append("Received : <pre>" + JSON.stringify(data,null,5) + "</pre><br/>");
	    var rows=data.data;
	    position[1]+=rows.length;

	    var doc_template;
	    for(var i=0;i<rows.length;i++){
		var r=rows[i];
		var doc_template=add_mini_view(r);
		
	    }
	    doc_template.clicked();
	});
    });


    prev.listen("click",function(){
	var start = (position[0]-request_size <0) ? 0 : (position[0]-request_size);
	var nr = start + request_size < n_query ? request_size : n_query-start;

	retrieve_metadata(start, nr, function(error, data){
	    if(error!=null){
		status.append("Request failed ! " + error + "<br/>");
		console.log("Request failed ! " + error);
		return;
	    }
	    n_query=data.n;
	    //console.log("Received " + JSON.stringify(data));
	    //status.innerHTML+="Received : <pre>" + JSON.stringify(data,null,5) + "</pre><br/>";
	    var rows=data.data;
	    position[0]=start;

	    var doc_template;
	    for(var i=0;i<rows.length;i++){
		var r=rows[i];
		var doc_template=add_mini_view(r,true);
		
	    }
	    doc_template.clicked();
	});
    });

    
    function retrieve_metadata(start, size, cb){
	var opts={
	    host : host,
	    cmd :  "gloria/query_images",
	    args :  { from : start, to : start+size-1, query : build_query()},
	    data_mode : "json",
	    xhr : { progress : download_progress }
	};
	var r= new request(opts);
	r.execute(cb);
    };
    
    
    function add_mini_view(r, prep){
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
	doc_template.elements.desc.ui_root.innerHTML="User: " + r.user + "<br/>Target: " + r.target_name + " (" + r.experiment_type + ") <br/>Date: " + r.datein + "<br/><a href=\""+

	host+"gloria/get_image?req="+encodeURIComponent((JSON.stringify({ type : "fits", id : doc_template.data.autoID }))) + "\"> Download FITS file </a>";
	
	doc_template.elements.picture.set_value(host+"gloria/get_image?req="+encodeURIComponent(
	    JSON.stringify(
		//{ type : "jpeg", id : doc_template.data.autoID }
		{ type : "custom_jpeg", id : doc_template.data.autoID, size : [256,256] }
	    )
	));
	//docview.add_class("hscroll_item");
	
	mini_view.ui_childs.add_child(doc_template,docview,prep);
	//last_row_id=row_id;
	
	var vl=mini_view.ui_childs.div.children.length;
	//console.log("N mini views =  " + vl );

	if(vl>buffer_size){
	    var nrem=vl-buffer_size;
	    for(var r=0;r<nrem;r++){
		if(prep){
		    mini_view.ui_childs.div.removeChild(mini_view.ui_childs.div.lastChild); 
		    position[1]--;
		}else{
		    mini_view.ui_childs.div.removeChild(mini_view.ui_childs.div.firstChild); //children.slice(0,vl-buffer_size);
		    position[0]++;
		}
	    }
	}
	
	page_info.innerHTML="View [" + position[0] + ", " + position[1] + "] out of " + n_query;

	vl=mini_view.ui_childs.div.children.length;
	//console.log("N mini views after =  " + vl );

	return doc_template;
    }
    

    function reset_metadata(){

	retrieve_metadata(0, request_size, function(error, data){
	    if(error!=null){
		status.append("Request failed ! " + error + "<br/>");
		console.log("Request failed ! --> " + error);
		return;
	    }
	    
	    n_query=data.n;
	    
	    position[1]+=request_size;
	    console.log("Received " + JSON.stringify(data));
            //status.append("Received : <pre>" + JSON.stringify(data,null,5) + "</pre><br/>");
	    var rows=data.data;
	    for(var i=0;i<rows.length;i++){
		var r=rows[i];
		var doc_template=add_mini_view(r);
		if(i==0)doc_template.clicked();
	    }
	    
	});
    }

    reset_metadata();

    
    return ui;
}
