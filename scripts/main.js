Blockly.Flyout.prototype.autoClose = false;

var workspace = Blockly.inject("blocklyDiv", {
  //renderer: 'custom_renderer',
  toolbox: document.getElementById("toolbox"),
  zoom:
  {controls: true,
   wheel: false,
   startScale: 0.9,
   maxScale: 3,
   minScale: 0.3,
   scaleSpeed: 1.2,
   pinch: true},
   grid:
         {spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true},
  scrollbars: false,
});

function undoAction(){
  workspace.undo(false);
}
function redoAction(){
  workspace.undo(true);
}




workspace.registerButtonCallback("make_step1b", make_step1b);
workspace.registerButtonCallback("make_step2", make_step2);
workspace.registerButtonCallback("make_step3", make_step3);
workspace.registerButtonCallback("make_step4", make_step4);
workspace.registerButtonCallback("make_step5", make_step5);

function getBlocksByType(type) {
  var blocks = [];
  for (var blockID in workspace.blockDB_) {
    if (workspace.blockDB_[blockID].type == type) {
      blocks.push(workspace.blockDB_[blockID]);
    }
  }
  return blocks;
}

function make_step1b() {
  if(check_step1()){
  if (getBlocksByType("define_datatype").length > 0 && getBlocksByType("alternative").length > 0) {
    var data_type_for_ex = "";
		var alt_num = 1;
    for (const datatype_block of getBlocksByType("define_datatype")) {
      var data_examples = "";
      
      for (const alternative_block of datatype_block.getChildren()[0].getDescendants(true)) {
        if (alternative_block.type == "alternative") {
          if (alternative_block.getChildren(true).length > 0 && alternative_block.getInputTargetBlock("args") != null) {
            var arg_num = alternative_block.getChildren(true)[0].getDescendants(true).length;
            var examples_message = "( %1  ";
            var examples_arg = [{
              "type": "field_input",
              "name": "alternative_name",
            }];
            var examples_shadow = "";
            for (let ar = 1; ar <= arg_num; ar++) {
              examples_message += " %" + String(ar + 1)
              examples_arg.push({
                "type": "input_value",
                "name": "example" + alternative_block.getFieldValue("constructor") + String(alt_num) + "_" + String(ar),
              })
              var alt_value = ""
              if (alternative_block.getChildren()[0].getDescendants(true)[ar - 1].type == "arg") {
                alt_value = alternative_block.getChildren()[0].getDescendants(true)[ar - 1].getFieldValue("arg2")
              } else if (alternative_block.getChildren()[0].getDescendants(true)[ar - 1].type == "arg_self_reference") {
                alt_value = alternative_block.getChildren()[0].getDescendants(true)[ar - 1].getFieldValue("arg2_self_reference")
              }
              examples_shadow +='<value name="example' + alternative_block.getFieldValue("constructor") + String(alt_num) + "_" + String(ar) + '">'+
																	'<shadow type ="example_arg">'+
																		'<field name ="example_arg_value">'+
																			'<shadow type="text">'+
																				'<field name ="TEXT">' + alt_value + '</field>'+
																			'</shadow>'+
																		'</field>'+
																	'</shadow>'+
																'</value>'
            }
            examples_message += ")"

            Blockly.defineBlocksWithJsonArray([{
              "type": "examples" + "_" + alternative_block.getFieldValue("constructor") + String(alt_num),
              "message0": examples_message,
              "args0": examples_arg,
              "output": "VALUE",
              "colour": 40,
              "tooltip": "example",
            }]);
						var alt_num_for_code = alt_num
            Blockly.JavaScript["examples"+ "_" + alternative_block.getFieldValue("constructor") + String(alt_num)] = function (block) {
							let constructor  = block.getFieldValue("alternative_name")
							var example_args =""
							for (let ar2 = 1; ar2 < examples_arg.length; ar2++) {		
									example_args += Blockly.JavaScript.statementToCode(block, "example" + alternative_block.getFieldValue("constructor") + String(alt_num-1) + "_" + String(ar2))+" "
							}
              return "(define-data-examples (" + constructor + example_args +"))" //+ examples_arg[1].name+"  "+"examples"+ "_" + alternative_block.getFieldValue("constructor") + String(alt_num);
            };

            data_examples += '<block type="examples' + "_" + alternative_block.getFieldValue("constructor") + String(alt_num) + '">'+
																'<field name="alternative_name">'+
																	'<text>' + alternative_block.getFieldValue("constructor") + '</text>'+
																'</field>' + 
																examples_shadow +
															"</block>"; 
            alt_num += 1
          } else {
            data_examples += '<block type="examples_not_arg">'+
																'<field name="alternative_name_not_arg">'+
																	'<text>' + alternative_block.getFieldValue("constructor") + '</text>'+
																'</field>' +
															'</block>'; 
          };
        }
      }
      data_type_for_ex += '<label text="' + datatype_block.getFieldValue("define_datatypeName") + '"></label><sep  gap="5"></sep>' + data_examples;
    }
  }
    var struct = ""
    if (getBlocksByType("define_struct").length > 0) {
      struct += ''
      struct_block_n = 1;
      for (const struct_block of getBlocksByType("define_struct")) {
        var struct_message = "(make-"+struct_block.getFieldValue("struct_name");
        var struct_arg = [];
        var struct_shadow = ""
        var max_struct_arg_num = struct_block.getChildren()[0].getDescendants(true).length;
        for (var struct_arg_num = 1; struct_arg_num <= max_struct_arg_num; struct_arg_num++) {
          struct_message += " %" + String(struct_arg_num)
          struct_arg.push({
            "type": "input_value",
            "name": "struct_specific_arg" + String(struct_arg_num),
          })
          struct_shadow += '<value name="struct_specific_arg' + String(struct_arg_num) + '">'+
															'<shadow type ="struct_specific_arg">'+
																'<field name ="struct_specific_arg_value">'+
																	'<shadow type="text">'+
																		'<field name ="TEXT">' + struct_block.getChildren()[0].getDescendants(true)[struct_arg_num - 1].getFieldValue("struct_arg_type") + '</field>'+
																	'</shadow>'+
																'</field>'+
															'</shadow>'+
														'</value>'
        }
				struct_message +=")"

        Blockly.defineBlocksWithJsonArray([{
          "type": "make_struct" + String(struct_block_n),
          "message0": struct_message,
          "args0": struct_arg,
          "output": "VALUE",
          "input": "VALUE",
          "colour": 0,
          "tooltip": "make_struct",
          "inputsInline": true,
        }]);
        Blockly.JavaScript["make_struct" + String(struct_block_n)] = function (block) {
          var ret = "(make-"+struct_block.getFieldValue("struct_name")
          for (let a = 1; a<=block.getChildren().length; a++){
            ret += Blockly.JavaScript.statementToCode(block, "struct_specific_arg"+String(a));
          }
          return ret+")"
        };
				

        struct += '<block type="make_struct' + String(struct_block_n) + '">' + 
				
										struct_shadow + 
										'<value name="next_struct_specific_arg">'+
											'<shadow type ="struct_specific_arg"></shadow>'+
										'</value>' + 
									"</block>"
        struct_block_n += 1;
      }
      struct += '<label text="Argument"></label><sep gap="5"></sep><block type="struct_specific_arg"></block>'
    }
    if(getBlocksByType("define_struct").length > 0 ||(getBlocksByType("define_datatype").length > 0 && getBlocksByType("alternative").length > 0)){
      document.getElementById("step1b").innerHTML = '<label text="Define data examples" web-class="myLabelStyle"></label><sep gap="10"></sep>'+ 
      // '<label text="Datatype constructor"></label><sep  gap="15"></sep>' + data_type_for_ex 
      // + '<label text="Argument"></label><sep gap="5"></sep><block type ="example_arg"></block>' +
       //'<sep  gap="70"></sep>'+
       '<label text="Structure constructor"></label>'
       +'<sep gap="5"></sep>' +  struct + '<sep  gap="100"></sep>' + '<button text="Next Step" callbackKey="make_step2"></button>';
       document.getElementById("step1b").hidden = "false";
       workspace.updateToolbox(document.getElementById("toolbox"));
    }
    
  }
}

function make_step2() {
  if(check_step1b()){
  document.getElementById("step2").innerHTML = 
	'<label text="Purpose, Signature, Header" web-class="myLabelStyle"></label><sep  gap="10"></sep>' + 
		'<block type="template_purpose"><next><block type="template_signature"><next><block type="template_define"></block></next></next></block>' + 
		//'<label text="Purpose"></label><sep  gap="10"></sep>' + 
		//'<block type="purpose_verb"></block><sep  gap="10"></sep>' + 
		//'<block type="purpose_object"></block><sep  gap="10"></sep>' + 
		//'<block type="purpose_option"></block>' + 
		//'<block type="purpose_given"></block>' + 
		'<label text="Input type"></label><sep  gap="5"></sep> ' + 
		'<block type="input_signature"></block><sep  gap="10"></sep>' + 
		'<label text="Output type"></label><sep  gap="5"></sep> ' + 
		'<block type="output_signature"></block>' + 
		'<label text="Input"></label><sep  gap="5"></sep> ' + 
		'<block type="inputs"></block><sep  gap="10"></sep>' + 
		'<label text="Output"></label><sep  gap="5"></sep> ' + 
		'<block type="output"></block>' + '<sep  gap="100"></sep>' + 
		'<button text="Next Step" callbackKey="make_step3"></button>';
	document.getElementById("step2").hidden = "false";
  workspace.updateToolbox(document.getElementById("toolbox"));
  }
}

function make_step3() {
  if(check_step2()){
  if (getBlocksByType("template_define").length == 1 && getBlocksByType("inputs").length > 0) {
    message = "Given "
    args = []
    max_n_i = getBlocksByType("inputs").length;
    for (var n_i = 1; n_i <= max_n_i; n_i++) {
      message += '%' + String(n_i)
      args.push({
        type: "input_value",
        name: "io_examples_inputs" +String(n_i),
      })
    };
    message += ', Expect %' + String(max_n_i + 1);
    args.push({
      type: "input_value",
      name: "io_examples_output",
    }, )

    Blockly.defineBlocksWithJsonArray([{
      type: "io_examples",
      message0: message,
      args0: args,
      //output: "VALUE",
      inputsInline: true,
      colour: 90,
      tooltip: "io_examples",
    }, ]);
    Blockly.JavaScript["io_examples"] = function (block) {
      var ret_inputs =""
      for(let a3 =1; a3<block.getChildren().length; a3++){
        ret_inputs += Blockly.JavaScript.statementToCode(block, "io_examples_inputs"+String(a3)).slice(1);
      }
      return "(check-expect ("+getBlocksByType("template_define")[0].getFieldValue("template_func_name")+"("+ret_inputs+"))"+Blockly.JavaScript.statementToCode(block, "io_examples_output").slice(1)+")"
    };

    var input_ex = "";
    for (const ex_block_not_arg of getBlocksByType("examples_not_arg")) {
      if (ex_block_not_arg.getParent() == null) {
        input_ex += Blockly.Xml.domToPrettyText(Blockly.Xml.blockToDom(ex_block_not_arg, true))
      }
    }
    for (const datatype_block of getBlocksByType("define_datatype")) {
      var alt_num = 1;
      var parent = [];
      for (const alternative_block of datatype_block.getChildren(true)[0].getDescendants(true)) {
        if (alternative_block.type == "alternative") {
          if (alternative_block.getChildren(true).length > 0 && alternative_block.getInputTargetBlock("args") != null) {
            for (const ex_block of getBlocksByType("examples" + "_" + alternative_block.getFieldValue("constructor") + String(alt_num))) {
              if (ex_block.getParent() == null) {
                input_ex += Blockly.Xml.domToPrettyText(Blockly.Xml.blockToDom(ex_block, true))
              }
            }
            alt_num += 1
          }
        }
      }
      document.getElementById("display").innerText = parent
    }
		struct_ex =""
		for (let struct_num =1; struct_num <= getBlocksByType("define_struct").length; struct_num ++) {
			for (const struct of getBlocksByType("make_struct" + String(struct_num))){
				if(struct.getParent() == null){
					struct_ex += Blockly.Xml.domToPrettyText(Blockly.Xml.blockToDom(struct, true))
				}
			}
		}
    document.getElementById("step3").innerHTML = 
		'<label text="Input Output Examples" web-class="myLabelStyle"></label>' + 
		'<label text="Given and Expected"></label><sep  gap="10"></sep>' + 
			'<block type="io_examples"></block>' + 
			'<label text="Value"></label><sep  gap="10"></sep>' + 
			'<block type="io_examples_inputs"></block>' + 
			//'<block type="io_examples_outputs"></block>' + 
			'<sep  gap="50"></sep>' + 
			//'<category name="data examples">' + 
      '<label text="Examples"></label><sep  gap="10"></sep>' + input_ex +struct_ex+
      '<sep  gap="100"></sep>' + 
			'<button text="Next Step" callbackKey="make_step4"></button>' 
      //+ "</category>";;
    document.getElementById("step3").hidden = "false";
    workspace.updateToolbox(document.getElementById("toolbox"));
  }
}
}

function make_step4() {
  if(check_step3()){
  template_block = ""
  for (const temp_block of getBlocksByType("template_purpose")) {
    template_block += Blockly.Xml.domToPrettyText(Blockly.Xml.blockToDom(temp_block, true))
  }
	var func_name =""
	if(getBlocksByType("template_define").length == 1){
		func_name = getBlocksByType("template_define")[0].getFieldValue("template_func_name")

	}

  struct_block_xml = ""
  if(getBlocksByType("define_struct").length >0){
    for (const struct of getBlocksByType("define_struct")){
      for (const field of struct.getChildren()[0].getDescendants(true)) {
        if(field.type = "struct_arg"){
          struct_block_xml += '<block type="struct_hint_template_hint">'+
          '<field name="struct_name"><text>'+struct.getFieldValue("struct_name") + '</text></field>'+
          '<field name="struct_part"><text>'+field.getFieldValue("struct_arg2") + '</text></field>'+
          //'<value name = "input_struct"><block type = "template_input"></block></value>'+
          '</block>' 
        }
      }
    }
  }
  input_block_xml = ""
  for (const input_block of getBlocksByType("inputs")){
    input_block_xml += '<block type= "template_input"><field name = "input"><text>'+input_block.getFieldValue("input_name")+'</text></field></block>'
  }
  document.getElementById("step4").innerHTML =
	'<label text="Template" web-class="myLabelStyle"></label>' + 
	//'<label text="Conditional"></label><sep  gap="10"></sep>' + 
   // '<block type="template_cond"></block>' + 
		//'<label text="Clause"></label><sep  gap="10"></sep>' + 
		//'<block type="template_cond_section"></block>' + 
		'<label text="Placeholder"></label><sep  gap="10"></sep>' + 
		'<block type="template_hint"></block><sep  gap="10"></sep>' + 
		'<block type="template_no_hint"></block>' + 
		
		//'<label text="Recursive call"></label><sep  gap="10"></sep>' + 
		//'<block type="funcName_forRec_template_hint">'+
		//'<field name = "func_name_forRec"><text>'+ func_name +'</text></field>' + 
	  //	'<value name = "input_rec"><block type = "template_input"></block></value>'+
	  //	'</block>' + 
		'<label text="Selector"></label><sep  gap="10"></sep>' + struct_block_xml+
	//	'<block type="struct_hint_template_hint"><value name = "input_struct"><block type = "template_input"></block></value></block>' + 
		'<label text="Inputs"></label><sep  gap="10"></sep>' + 
		input_block_xml+
		//'<block type="select_hint_template_hint"><value name = "input_select"><block type = "template_input"></block></value></block>' + 
	//	'<block type="struct_hint_template_hint"><value name = "input_struct"><block type = "template_input"></block></value></block>' + 
		'<sep  gap="100"></sep>' + 
		'<button text="Next Step" callbackKey="make_step5"></button>';
  document.getElementById("step4").hidden = "false";
  workspace.updateToolbox(document.getElementById("toolbox"));
}
}

function make_step5(){
  check_step4()
}

function createEditor() {
  var editor = ace.edit("editor");
  editor.$blockScrolling = Infinity;
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    wrap: true,
  });
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/scheme");
  return editor;
}

function downloadFiles(data, file_name, file_type) {
  var file = new Blob([data], {type: file_type});
  if (window.navigator.msSaveOrOpenBlob) 
      window.navigator.msSaveOrOpenBlob(file, file_name);
  else { 
      var a = document.createElement("a"),
              url = URL.createObjectURL(file);
      a.href = url;
      a.download = file_name;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);  
      }, 0); 
  }
}

function add0(n){
    if (n < 10){
      return "0"+String(n)
    }
        
    else{
      return String(n)
    }
}

function download(){
  let code = ace.edit("editor").getValue()
  const date1 = new Date();
  
  downloadFiles(code,document.getElementById("file_name").value// + add0(date1.getMonth()+1)+add0(date1.getDate())+add0(date1.getHours()) + 
  //add0(date1.getMinutes()) + add0(date1.getSeconds()) 
  +document.getElementById("file_type").value,"")


}



function handlePlay() {
  let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
  try {
	//	Blockly.getMainWorkspace().cleanUp();
	var editor = createEditor();
	editor.getSession().setValue(code);
	return editor;
   // document.getElementById("display").innerText = code//document.getElementById("toolbox").innerHTML;
  } catch (error) {
    console.log(error);
  }
}
function changeStructureFieldNumber(){
  for (const struct_block of getBlocksByType("define_struct")) {
    struct_block.setFieldValue(struct_block.getDescendants(true).filter(function(value){return value.type=="struct_arg"}).length,"struct_arg_number")
  }
}
function Play(event) {
  changeStructureFieldNumber()
  if(document.getElementById("show_code").checked){
    let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
  try {
	//	Blockly.getMainWorkspace().cleanUp();
	var editor = createEditor();
	editor.getSession().setValue(code);
	return editor;
   // document.getElementById("display").innerText = code//document.getElementById("toolbox").innerHTML;
  } catch (error) {
    console.log(error);
  }
  }
  else{
    var editor = createEditor();
    editor.getSession().setValue("");
    return editor;
  }

  
}

var editor = createEditor();
workspace.addChangeListener(Play);


