window.onload = function(){
    var xd1;
    var hostname
    //="ws://192.168.176.103:9999";
    //="ws://192.168.1.134:9999";
    ="ws://localhost:9999";

    var xdone_node  = document.getElementById("xdone");
    var xd1_tpl = tmaster.build_template("gloria_view"); 

    xd1_opts={ html_node : xdone_node, tpl : xd1_tpl, server_root : "XD-1/"};
    
    xd1_tpl.layer=xd1_tpl.elements.layer;

    xd1= new xdone();
    xd1.xdone_init(xd1_opts, function(error){
	
	if(error!=null){
	    console.log("Error init XD1 : " + error);
	    return;
	}
	
	var gl=xd1.gl;
    
	//var layer_opts=tmaster.build_template("gl_image_layer"); 
	//var lay_ui=create_ui({type:"short" }, layer_opts, 0);
	
	


	//var lay=new layer(xd1, xd1.nlayers,function(error, l){
	    
	if(error){
	    console.log("Error ! " + error);
	    return;
	}
	
	//xd1_tpl.lay=l;
	
	var layer = xd1_tpl.elements.layer;
	var layer_objects = xd1_tpl.elements.geometry;
	
	layer.xd1_attach(xd1, xd1.nlayers);

	//layer_opts.container=layer_objects.ui_childs;
	//layer_objects.ui_childs.add_child(layer_opts.elements.general,layer_opts.elements.general.ui_root);
	    

	xd1.layers[xd1.nlayers]=layer;
	xd1.layer_enabled[xd1.nlayers]=1;
	var le_loc=gl.getUniformLocation(xd1.program, "u_layer_enabled");
	gl.uniform4iv(le_loc, xd1.layer_enabled);
	
	xd1.nlayers++;
	xd1.fullscreen(false);
	    
	//	});
	
	
    });	



}
