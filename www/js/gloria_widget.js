//window.addEventListener("load", function(){

    //alert("Abraacadabra!");

var image_db_browser_templates = {
  image_db_browser : {
    name : "DB Browser",
    elements : {
      cnx : { 
	name : "DB status",
	elements : {
	  nrecords : { name : "Selected records", type : "double", min : 0, step : 1, value : 0}
	}
      },
      select : {
	ui_opts: { child_view_type : "tabbed", sliding : true, slided : false},
	name : "Select",
	elements : {
	  date : {
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
	  },
	  user : {name: "User"},
	  experiment : {name : "Experiment"}
	},
      },
      browser : {
	name : "browser",
	elements : {
	  mini_view : {
	  },
	  detail_view : {}
	}
      }
    }
  },
  
  img_view : {
  },
  
  img_detail : {
  }
};



function load_gloria_widget(){
  
  var xd1 = new xdone();
  xd1.xdone_init({ server_root : "http://sadira.iasfbo.inaf.it/gloria-widget/XD-1/"});
  
}


template_ui_builders.image_db_browser=function(ui_opts, tpl_item){

  var ui=tpl_item.ui=ce("div");
  ui.add_class("image_db_browser");

  return ui;
}
