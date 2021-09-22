

Blockly.defineBlocksWithJsonArray([{
    "type": "examples_not_arg",
    "message0": '(%1)',
    "args0": [
        
        {
            "type": "field_input",
            "name": "alternative_name_not_arg",
        },
        
       

    ],
    "output": "VALUE",
    "colour": 40,
    "tooltip": "example",
}]);

Blockly.JavaScript["examples_not_arg"] = function (block) {
return "(define-data-examples ("+ block.getFieldValue("alternative_name_not_arg")+"))";
};


Blockly.defineBlocksWithJsonArray([
    {
        "type": "example_arg",
        "message0": '%1',
        "args0": [
            {
                "type": "field_input",
                "name": "example_arg_value",
            },



        ],
        "output": "VALUE",
        "colour": 60,
        "tooltip": "arg",
    }
]);

Blockly.JavaScript["example_arg"] = function (block) {
    return block.getFieldValue("example_arg_value");
};



Blockly.defineBlocksWithJsonArray([
    {
        "type": "struct_specific_arg",
        "message0": '%1',
        "args0": [
            {
                "type": "field_input",
                "name": "struct_specific_arg_value",
            },
        ],
        "output": "struct_arg",
        "colour": 0,
        "tooltip": "scruct_arg",
        
    }
]);

Blockly.JavaScript["struct_specific_arg"] = function (block) {
    return block.getFieldValue("struct_specific_arg_value");
};
