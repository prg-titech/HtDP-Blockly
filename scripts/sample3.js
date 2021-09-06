Blockly.defineBlocksWithJsonArray([
  {
    type: "define_io_examples",
    message0: "Input-output examples of Func %1",
    args0: [
      {
        type: "field_input",
        name: "define_func_name_forIO",
      },
    ],
    message1: "%1",
    args1: [
      {
        type: "input_statement",
        name: "io_examples",
      },
    ],
    colour: 160,
    tooltip: "Define input output examples.",
  },
]);

Blockly.JavaScript["define_io_examples"] = function (block) {
  return "define_io_examples";
};


Blockly.defineBlocksWithJsonArray([
  {
    type: "io_examples_inputs",
    message0: "%1",
    args0: [
      {
        type: "field_input",
        name: "io_examples_input",
      },
      
    ],
    output: "VALUE",
    colour: 200,
    tooltip: "io_examples_inputs",
  },
]);

Blockly.JavaScript["io_examples_inputs"] = function (block) {
  return block.getFieldValue("io_examples_input");
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "io_examples_outputs",
    message0: "%1",
    args0: [
      {
        type: "field_input",
        name: "io_examples_output",
      },
    ],
    output: "VALUE",
    colour: 240,
    tooltip: "io_examples_outputs",
  },
]);

Blockly.JavaScript["io_examples_outputs"] = function (block) {
  return "io_examples_outputs";
};
