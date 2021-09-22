Blockly.defineBlocksWithJsonArray([
    {
        "type": "define_datatype",
        "message0": '%1 has %2 alternatives',
        "args0": [
            {
                "type": "field_input",
                "name": "define_datatypeName",
            },
            {
                "type": "field_number",
                "name": "num_of_alternative",
            }
        ],
        "message1": '%1',
        "args1": [
            {
                "type": "input_statement",
                "name": "alternative",
            }
        ],
        "colour": 160,
        "tooltip": "Define data type.",
    }
]);

Blockly.JavaScript["define_datatype"] = function (block) {
    let value2 = block.getFieldValue("define_datatypeName");
    let altvalue = Blockly.JavaScript.statementToCode(block, 'alternative')
    return '(define-datatype ' + value2 + ' (' + altvalue + '))';
};


Blockly.defineBlocksWithJsonArray([
    {
        "type": "alternative",
        "message0": '(%1  %2)',
        "args0": [
            {
                "type": "field_input",
                "name": "constructor",

            },
            {
                "type": "input_value",
                "name": "args",
            },

        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "alternative",
    }
]);

Blockly.JavaScript["alternative"] = function (block) {
    let constructor = block.getFieldValue('constructor');
    let args = Blockly.JavaScript.statementToCode(block, 'args');
    return ' (' + constructor + args + ")";
};


Blockly.defineBlocksWithJsonArray([
    {
        "type": "arg",
        "message0": '%1 %2',
        "args0": [
            {
                "type": "field_input",
                "name": "arg2",
            },
            {
                "type": "input_value",
                "name": "another_arg",
            }


        ],
        "output": "VALUE",
        "colour": 200,
        "tooltip": "arg",
    }
]);

Blockly.JavaScript["arg"] = function (block) {
    let arg2 = block.getFieldValue("arg2");
    let another_arg = Blockly.JavaScript.statementToCode(block, "another_arg");
    return arg2 + " " + another_arg;
};


Blockly.defineBlocksWithJsonArray([
    {
        "type": "arg_self_reference",
        "message0": '%1 %2',
        "args0": [
            {
                "type": "field_input",
                "name": "arg2_self_reference",
            },
            {
                "type": "input_value",
                "name": "another_arg_self_reference",
            }
        ],
        "output": "VALUE",
        "colour": 0,
        "tooltip": "arg_self_reference",
    }
]);

Blockly.JavaScript["arg_self_reference"] = function (block) {
    let arg2_self_reference = block.getFieldValue("arg2_self_reference");
    let another_arg_self_reference = Blockly.JavaScript.statementToCode(block, "another_arg_self_reference");
    return arg2_self_reference + " " + another_arg_self_reference;
};


Blockly.defineBlocksWithJsonArray([
    {
        "type": "define_struct",
        "message0": 'A %1 has %2 fields',
        "args0": [
            {
                "type": "field_input",
                "name": "struct_name",
            },
            {
                "type": "field_number",
                "name": "struct_arg_number",
            }
        ],
        "message1": '%1',
        "args1": [
            {
                "type": "input_statement",
                "name": "struct_field",
                
            }
        ],
        "colour": 80,
        "tooltip": "define-struct",
    }
]);

Blockly.JavaScript["define_struct"] = function (block) {
    let struct_name = block.getFieldValue("struct_name");
    let struct_field = Blockly.JavaScript.statementToCode(block, "struct_field");
    return "(define-struct "+ struct_name + " [" + struct_field.slice(1) +"])";
};

Blockly.defineBlocksWithJsonArray([
    {
        "type": "struct_arg",
        "message0": '%1: %2',
        "args0": [
            {
                "type": "field_input",
                "name": "struct_arg2",
            },
            {
                "type": "field_input",
                "name": "struct_arg_type",
            }
        ],
        "previousStatement": null,
        "nextStatement": null,

        "colour": 80,
        "tooltip": "scruct_arg",
    }
]);

Blockly.JavaScript["struct_arg"] = function (block) {
    let struct_arg2 = block.getFieldValue("struct_arg2");
    return block.getFieldValue("struct_arg2") + " " ;
};
