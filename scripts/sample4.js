
  
  Blockly.defineBlocksWithJsonArray([
    {
        type: "template_cond",
      message0: "(cond", 
      message1: "%1",
        args1: [
        {
          type: "input_statement",
          name: "cond",
        },
      ],
      message2: ")",
      previousStatement: null,
      nextStatement : null,
      colour: 200,
      tooltip: "template__cond",
    },
  ]);
  
  Blockly.JavaScript["template_cond"] = function (block) {
    return "template_cond";
  };
  
  Blockly.defineBlocksWithJsonArray([
    {
        type: "template_cond_section",
      message0: "[(%1 %2) ", 
        args0: [
        {
          type: "field_input",
          name: "cond_case",
        },
        {
            type: "input_value",
            name: "cond_input_name",
          },
          
      ],
      message1: "%1",
      args1: [
      {
        type: "input_statement",
        name: "hints",
      },
    ],
      previousStatement: null,
      nextStatement : null,
      colour: 160,
      tooltip: "template_cond_section",
      inputsInline: true,
    },
  ]);
  
  Blockly.JavaScript["template_cond_section"] = function (block) {
    return "template_cond_section";
  };
  
  Blockly.defineBlocksWithJsonArray([
    {
        type: "template_hint",
      message0: "... %1 ...", 
        args0: [
        {
          type: "input_value",
          name: "hint",
        },
          
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 120,
      tooltip: "hint",
    },
  ]);
  
  Blockly.JavaScript["template_hint"] = function (block) {
    return "..."+Blockly.JavaScript.statementToCode(block, "hint")+"..."+"\n";
  };

  Blockly.defineBlocksWithJsonArray([
    {
        type: "template_no_hint",
      message0: "...", 
        args0: [
        
          
      ],
      previousStatement: null,
      
      colour: 120,
      tooltip: "hint",
    },
  ]);
  
  Blockly.JavaScript["template_no_hint"] = function (block) {
    return "..." +"\n";
  };


  Blockly.defineBlocksWithJsonArray([
    {
        type: "funcName_forRec_template_hint",
      message0: "(%1 %2)", 
        args0: [
            {
                type: "field_input",
                name: "func_name_forRec",
              },
        {
          type: "input_value",
          name: "input_rec",
        },
          
      ],
      output: "VALUE",
      colour: 80,
      tooltip: "hint",
      inputsInline: true,
    },
  ]);
  
  Blockly.JavaScript["funcName_forRec_template_hint"] = function (block) {
    return "funcName_forRec_template_hint";
  };
  
  Blockly.defineBlocksWithJsonArray([
    {
        type: "struct_hint_template_hint",
      message0: "(%1-%2 %3)", 
        args0: [
            {
                type: "field_input",
                name: "struct_name",
              },
              {
                type: "field_input",
                name: "struct_part",
              },
        {
          type: "input_value",
          name: "input_struct",
        },
          
      ],
      output: "VALUE",
      colour: 40,
      tooltip: "struct_hint_template_hint",
      inputsInline: true,
    },
  ]);
  
  Blockly.JavaScript["struct_hint_template_hint"] = function (block) {
    return "("+block.getFieldValue("struct_name")+"-"+block.getFieldValue("struct_part")+Blockly.JavaScript.statementToCode(block,"input_struct")+")";
  };
  
  
  Blockly.defineBlocksWithJsonArray([
    {
        type: "select_hint_template_hint",
      message0: "(%1 %2)", 
        args0: [
            {
                type: "field_input",
                name: "select_name",
              },
              
        {
          type: "input_value",
          name: "input_select",
        },
          
      ],
      output: "VALUE",
      colour: 40,
      tooltip: "select_hint_template_hint",
      inputsInline: true,
    },
  ]);
  
  Blockly.JavaScript["select_hint_template_hint"] = function (block) {
    return "select_hint_template_hint";
  };
  
  

  Blockly.defineBlocksWithJsonArray([
    {
        "type": "template_input",
        "message0": '%1',
        "args0": [
            {
                "type": "field_input",
                "name": "input",
            },
           
        ],
        "output": "VALUE",
        "colour": 180,
        "tooltip": "input",
    }
]);

Blockly.JavaScript[ "template_input"] = function (block) {
    return  block.getFieldValue("input");
};

