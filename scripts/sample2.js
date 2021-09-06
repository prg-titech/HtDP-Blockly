
  Blockly.defineBlocksWithJsonArray([
    {
        type: "template_purpose",
        message0: ";;%1 %2", 
        args0: [
            {
                "type": "field_dropdown",
                "name": "purpose_verb",
                options: [["compute","compute"],["decide","decide"],["create","create"]]
            },
            {
                "type": "field_input",
                "name": "purpose_object_",
            },
            /*
            {
                "type": "field_dropdown",
                "name": "purpose_option",
                options: [["of","A"],["by using","B"],["to","B"]],
            },
            {
                "type": "field_input",
                "name": "purpose_object__",
            },*/
  ],
      inputsInline: true,
      colour: 300,
      tooltip: "template_purpose",
      nextStatement: "null",
    },
  ]);
  
  Blockly.JavaScript["template_purpose"] = function (block) {
    return ";;"+block.getFieldValue("purpose_verb")+" "+ block.getFieldValue("purpose_object_")+"\n";
  };


  Blockly.defineBlocksWithJsonArray([
    {
        type: "template_signature",
        message0: ";;%1", 
        args0: [
        {
        type: "input_value",
        name: "template_signature",
      },
  ],
      inputsInline: true,
      colour: 240,
      tooltip: "template_purpose",
      previousStatement: "null",
      nextStatement: "null",
    },
  ]);
  
  Blockly.JavaScript["template_signature"] = function (block) {
    return ";;"+ Blockly.JavaScript.statementToCode(block, "template_signature").slice(2)  +"\n";
  };


Blockly.defineBlocksWithJsonArray([
    {
        type: "template_define",
        
        message0: "(define (%1 %2)", 
        args0: [
        {
          type: "field_input",
          name: "template_func_name",
        },
        {
            type: "input_value",
            name: "template_inputs_name",
          },
      ],
      message1: "%1",
        args1: [
        {
          type: "input_statement",
          name: "cond",
        },
      ],
      message2: ")", 
      
      inputsInline: true,
      colour: 180,
      tooltip: "template_define",
      previousStatement: "null",
    },
  ]);
  
  Blockly.JavaScript["template_define"] = function (block) {
    return "(define ("+block.getFieldValue("template_func_name")+Blockly.JavaScript.statementToCode(block, "template_inputs_name").slice(1)+")\n"
    +" "+Blockly.JavaScript.statementToCode(block, "cond") +"\n" +")";
  };
/*
Blockly.defineBlocksWithJsonArray([
    {
        "type": "purpose_verb",
        "message0": '%1 %2 %3 %4',
        "args0": [
            {
                "type": "field_dropdown",
                "name": "purpose_verb",
                options: [["compute","compute"],["decide","decide"],["create","create"]]
            },
            {
                "type": "field_input",
                "name": "purpose_object_",
            },
            {
                "type": "field_dropdown",
                "name": "purpose_option",
                options: [["of","A"],["by using","B"],["to","B"]],
            },
            {
                "type": "field_input",
                "name": "purpose_object__",
            },
        ],
        "output": "VALUE",
        "colour": 300,
        "tooltip": "purpose_verb",
    }
]);

Blockly.JavaScript["purpose_verb"] = function (block) {
    //let value2 = block.getFieldValue("define_datatypeName");
    //let altvalue = Blockly.JavaScript.statementToCode(block, 'alternative')
    return 'purpose';
};
*/

/*
Blockly.defineBlocksWithJsonArray([
    {
        "type": "purpose_object",
        "message0": '%1 %2 ',
        "args0": [
            {
                "type": "field_input",
                "name": "purpose_object_",
            },
            {
                "type": "input_value",
                "name": "purpose_",
            },
        ],
        "output": "VALUE",
        "colour": 280,
        "tooltip": "purpose_object",
    }
]);

Blockly.JavaScript["purpose_object"] = function (block) {
    //let value2 = block.getFieldValue("define_datatypeName");
    //let altvalue = Blockly.JavaScript.statementToCode(block, 'alternative')
    return 'purpose_object';
};*/

/*
//片っ端から目的文、カテゴライズ
Blockly.defineBlocksWithJsonArray([
    {
        "type": "purpose_option",
        "message0": '%1 %2 %3',
        "args0": [
            {
                "type": "field_dropdown",
                "name": "purpose_option",
                options: [["of","A"],["by using","B"],["to","B"]],
            },
            {
                "type": "field_input",
                "name": "purpose_object__",
            },
            {
                "type": "input_value",
                "name": "purpose_given",
            },
        ],
        "output": "VALUE",
        "colour": 300,
        "tooltip": "purpose_option",
    }
]);

Blockly.JavaScript["purpose_option"] = function (block) {
    //let value2 = block.getFieldValue("define_datatypeName");
    //let altvalue = Blockly.JavaScript.statementToCode(block, 'alternative')
    return 'purpose_option';
};

*/

/*
Blockly.defineBlocksWithJsonArray([
    {
        "type": "purpose_given",
        "message0": 'using the given %1',
        "args0": [
            {
                "type": "field_input",
                "name": "purpose_given",
            },
        ],
        "output": "VALUE",
        "colour": 300,
        "tooltip": "purpose_given",
    }
]);

Blockly.JavaScript["purpose_given"] = function (block) {
    //let value2 = block.getFieldValue("define_datatypeName");
    //let altvalue = Blockly.JavaScript.statementToCode(block, 'alternative')
    return 'purpose_given';
};

*/

Blockly.defineBlocksWithJsonArray([
    {
        "type": "input_signature",
        "message0": '%1 => %2',
        "args0": [
            {
                "type": "field_input",
                "name": "input_type",
            },
            {
                "type": "input_value",
                "name": "next_input_type",
            },
        ],
        "output": "VALUE",
        "colour": 240,
        "tooltip": "input_signature",
    }
]);

Blockly.JavaScript["input_signature"] = function (block) {
    return block.getFieldValue("input_type")+"=>"+Blockly.JavaScript.statementToCode(block, "next_input_type").slice(1);
};

Blockly.defineBlocksWithJsonArray([
    {
        "type": "output_signature",
        "message0": '%1',
        "args0": [
            {
                "type": "field_input",
                "name": "output_type",
            },
            
        ],
        "output": "VALUE",
        "colour": 240,
        "tooltip": "input_signature",
    }
]);

Blockly.JavaScript["output_signature"] = function (block) {
    return block.getFieldValue("output_type");
};


Blockly.defineBlocksWithJsonArray([
    {
        "type": "function_name",
        "message0": '%1',
        "args0": [
            {
                "type": "field_input",
                "name": "function_name",
                "text": "関数名"
            },
        ],
        "output": "VALUE",
        "colour": 350,
        "tooltip": "function_name",
    }
]);

Blockly.JavaScript["function_name"] = function (block) {
    //let value2 = block.getFieldValue("define_datatypeName");
    //let altvalue = Blockly.JavaScript.statementToCode(block, 'alternative')
    return "function_name";
};

Blockly.defineBlocksWithJsonArray([
    {
        "type": "inputs",
        "message0": '%1 %2',
        "args0": [
            {
                "type": "field_input",
                "name": "input_name",
            },
            {
                "type": "input_value",
                "name": "nextInpt_Output",
            },
        ],
        "output": "VALUE",
        "colour": 180,
        "tooltip": "inputs",
    }
]);

Blockly.JavaScript["inputs"] = function (block) {
    //let value2 = block.getFieldValue("define_datatypeName");
    //let altvalue = Blockly.JavaScript.statementToCode(block, 'alternative')
    return block.getFieldValue("input_name")+Blockly.JavaScript.statementToCode(block, "nextInpt_Output").slice(1);
};

Blockly.defineBlocksWithJsonArray([
    {
        "type": "inputs_name",
        "message0": 'name: %1',
        "args0": [
            {
                "type": "field_input",
                "name": "input_name",
                "text": "name",
            },
        ],
        
        "previousStatement": null,
       
        "colour": 0,
        "tooltip": "inputs_name",
    }
]);

Blockly.JavaScript["inputs_name"] = function (block) {
    //let value2 = block.getFieldValue("define_datatypeName");
    //let altvalue = Blockly.JavaScript.statementToCode(block, 'alternative')
    return "inputs_name";
};


Blockly.defineBlocksWithJsonArray([
    {
        "type": "output",
        "message0": '%1',
        "args0": [
            {
                "type": "field_input",
                "name": "dummy_output",
               
            },
        ],

        "previousStatement": "null",
        "colour": 180,
        "tooltip": "output",
    
    }
]);

Blockly.JavaScript["output"] = function (block) {
    //let value2 = block.getFieldValue("define_datatypeName");
    //let altvalue = Blockly.JavaScript.statementToCode(block, 'alternative')
    return block.getFieldValue("dummy_output");
};