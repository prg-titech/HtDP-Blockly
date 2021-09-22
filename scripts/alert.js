var timuoutID1 =""
var timuoutID2 =""
function alert_blink(badBlock,message){
    
        document.getElementById("alert").style.display ='inline-block'
        document.getElementById("alert").innerText=message
        var i = 0
        var blink = function() {
        badBlock.select();
        timuoutID1 = setTimeout(function() {badBlock.unselect();}, 200);
        timuoutID2 = setTimeout(blink, 400);
        i++
        if(i>5){
            clearTimeout(timuoutID1)
            clearTimeout(timuoutID2)
            badBlock.unselect();
        }
        };
        
        blink();
        
  }


  function stop_blink(){
    clearTimeout(timuoutID1)
    clearTimeout(timuoutID2)
  }


  function check_step1(){
      var error = 0
    if (getBlocksByType("define_struct").length == 0){
        document.getElementById("alert").style.display ='inline-block'
        document.getElementById("alert").innerText="データ定義がありません"
        error++
    }
    else{
        for (const struct_block of getBlocksByType("define_struct")) {
            if(struct_block.getFieldValue("struct_name").length==0){
                alert_blink(struct_block,"定義するstructの名前がありません")
                error++
                break
            }
            else if(struct_block.getChildren().length==0){
                alert_blink(struct_block,struct_block.getFieldValue("struct_name")+"の定義にフィールドが何もありません")
                error++
                break
            }
            else{
                for(const field of struct_block.getDescendants(true).filter(function(value){return value.type=="struct_arg"})){
                    if(field.getFieldValue("struct_arg2").length==0){
                        alert_blink(field,"フィールドの名前がありません")
                        error++
                        break
                    }
                    else if(field.getFieldValue("struct_arg_type").length==0){
                        alert_blink(field,"フィールドの型がありません")
                        error++
                        break
                    }
                    
                }
            }
        }
    }
    if(error==0){
        document.getElementById("alert").style.display ='inline-block'
        document.getElementById("alert").innerText ='Step1-a, OK'
        setTimeout(function() {document.getElementById("alert").style.display ='none'}, 10000);
        return true
    }
  }

  function check_step1b(){
    var error = 0
    var struct_block_n_check = 1;
    loop:
    for (const struct_block of getBlocksByType("define_struct")) {
        if (getBlocksByType("make_struct" + String(struct_block_n_check)).length== 0){
            document.getElementById("alert").style.display ='inline-block'
            document.getElementById("alert").innerText=struct_block.getFieldValue("struct_name")+"の例がありません"
            error ++
            break
        }
        else{
            for (const data_examples_block of getBlocksByType("make_struct" + String(struct_block_n_check))){
                for (const value of data_examples_block.getDescendants(true).filter(function(value){return value.type=="struct_specific_arg"})){
                    if(value.isShadow()){
                        alert_blink(data_examples_block,"引数がありません")
                        error++
                        break loop
                    }
                    else if (value.getFieldValue("struct_specific_arg_value").length==0){
                        alert_blink(value,"引数の入力がありません")
                        error++
                        break loop
                    }
                }
            }
        }
        struct_block_n_check++
    }
    if(error==0){
        document.getElementById("alert").style.display ='inline-block'
        document.getElementById("alert").innerText="Step1-b, OK"
        stop_blink()
        setTimeout(function() {document.getElementById("alert").style.display ='none'}, 10000);
        return true;
    }
  }

function check_step2(){
    var error =0
  if(getBlocksByType("template_define").length >1){
    document.getElementById("alert").style.display ='inline-block'
    document.getElementById("alert").innerText="定義する関数は1つまでです"
    error++
    }
  else if(getBlocksByType("template_define").length <0){
    document.getElementById("alert").style.display ='inline-block'
    document.getElementById("alert").innerText="関数が定義されていません"
    error++
    }
  else if(getBlocksByType("template_signature")[0].getDescendants(true).filter(function(value){return value.type=="input_signature"}).length==0){
      alert_blink(getBlocksByType("template_signature")[0],"signatureにinputがありません")
      error++
    }
  else if(getBlocksByType("template_signature")[0].getDescendants(true).filter(function(value){return value.type=="output_signature"}).length==0){
      alert_blink(getBlocksByType("template_signature")[0],"signatureにoutputがありません")
      error++
    }
  else if(getBlocksByType("template_signature")[0].getDescendants(true).filter(function(value){return value.type=="input_signature"}).length!=getBlocksByType("template_define")[0].getDescendants(true).filter(function(value){return value.type=="inputs"}).length){
      alert_blink(getBlocksByType("template_define")[0],"Signatureでのinput数と実際のinputが数が合わないよ。"+"signatureでは"+
      getBlocksByType("template_signature")[0].getDescendants(true).filter(function(value){return value.type=="input_signature"}).length+
      "個なのに、実際のinputは"+
      getBlocksByType("template_define")[0].getDescendants(true).filter(function(value){return value.type=="inputs"}).length
      +"個です"
      )
      error++
    }

    else if(error==0){
        document.getElementById("alert").style.display ='inline-block'
        document.getElementById("alert").innerText="Step2, OK"
        stop_blink()
        setTimeout(function() {document.getElementById("alert").style.display ='none'}, 10000);
        return true;
    }   
}

function include(ls, el){
    var flag=false
    for(const l of ls){
        if (l==el){
            flag=true
        }
    }
    return flag
}
function check_step3(){
    var error =0
    data_examples =[]
    inputlist =[]
    for (let struct_num =1; struct_num <= getBlocksByType("define_struct").length; struct_num ++) {
        for(const io of getBlocksByType("io_examples")){
            inputlist.push(io.getDescendants(true).filter(function(value){return value.type== "make_struct"+String(struct_num)}).map(function(value){return JSON.stringify(String(Blockly.JavaScript.blockToCode(value)))}))
        }
    }
    //document.getElementById("alert").innerText=inputlist
    for (let struct_num =1; struct_num <= getBlocksByType("define_struct").length; struct_num ++) {
        for (const struct of getBlocksByType("make_struct" + String(struct_num))){
            if(struct.getParent() == null){
                data_examples.push(JSON.stringify(String(Blockly.JavaScript.blockToCode(struct))))
                if(!include(inputlist, JSON.stringify(String(Blockly.JavaScript.blockToCode(struct))))){
                    //.indexOf(data_examples[0])//Blockly.Xml.domToPrettyText(Blockly.Xml.blockToDom(struct, true))
                    alert_blink(struct, "この例が使われていません")
                    error++
                }
            }
        }
    }

    /*
    struct_num=1
    for (const struct_block of getBlocksByType("define_struct")) {
        var inputlist=[]
        for(const io of getBlocksByType("io_examples")){
            inputlist.push(io.getDescendants(true).filter(function(value){return value.type== "make_struct"+String(struct_num)}))
        }
        //document.getElementById("alert").innerText=inputlist
        if(inputlist.length==0){
            alert_blink(struct_block,"使われてないよ")
            error++
        }
        struct_num++
    }*/
    if(error==0){
        document.getElementById("alert").style.display ='inline-block'
        document.getElementById("alert").innerText="Step3, OK"
        stop_blink()
        setTimeout(function() {document.getElementById("alert").style.display ='none'}, 10000);
        return true;
    }   
}

function array_equal(a, b) {
    if (!Array.isArray(a))    return false;
    if (!Array.isArray(b))    return false;
    if (a.length != b.length) return false;
    for (var i = 0, n = a.length; i < n; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

function check_step4(){
    error=0
    struct_block=[]
    
    for (const struct of getBlocksByType("define_struct")){
        for (const field of struct.getChildren()[0].getDescendants(true)) {
        if(field.type = "struct_arg"){
            struct_block.push([struct.getFieldValue("struct_name") ,field.getFieldValue("struct_arg2")])
        }
        }
    }
    for(const hint of getBlocksByType("template_define")[0].getDescendants(true).filter(function(value){return value.type=="struct_hint_template_hint"})){
        struct_block= struct_block.filter(function(value){return !(array_equal(value,[hint.getFieldValue("struct_name"),hint.getFieldValue("struct_part")]))
    })
        //document.getElementById("alert").innerText=!(array_equal(struct_block[0],[hint.getFieldValue("struct_name"),hint.getFieldValue("struct_part")]))
    }
    if(struct_block.length!=0){
        alert_blink(getBlocksByType("template_define")[0],"使われていないselectorがあります")
        error++
    }
    if(error==0){
        document.getElementById("alert").style.display ='inline-block'
        document.getElementById("alert").innerText="Step4, OK"
        stop_blink()
        setTimeout(function() {document.getElementById("alert").style.display ='none'}, 10000);
        return true;
    }   
}

function allcheck(){
    if(check_step1()){
        if(document.getElementById("step1b").innerHTML.length<10){
            document.getElementById("alert").style.display ='inline-block'
            document.getElementById("alert").innerText="次のStepに進もう1"
            setTimeout(function() {document.getElementById("alert").style.display ='none'}, 10000);
        }
        else if(check_step1b()){
            if(document.getElementById("step2").innerHTML.length<10){
                document.getElementById("alert").style.display ='inline-block'
                document.getElementById("alert").innerText="次のStepに進もう"
                setTimeout(function() {document.getElementById("alert").style.display ='none'}, 10000);
            }
            else if(check_step2()){
                if(document.getElementById("step3").innerHTML.length<10){
                    document.getElementById("alert").style.display ='inline-block'
                    document.getElementById("alert").innerText="次のStepに進もう"
                    setTimeout(function() {document.getElementById("alert").style.display ='none'}, 10000);
                }
                else if(check_step3()){
                    if(document.getElementById("step4").innerHTML.length<10){
                        document.getElementById("alert").style.display ='inline-block'
                        document.getElementById("alert").innerText="次のStepに進もう"
                        setTimeout(function() {document.getElementById("alert").style.display ='none'}, 10000);
                    }
                    else{
                        check_step4()
                    }
                }
            }
        }
    }

}