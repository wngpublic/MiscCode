//===================================================================================//
//===================================================================================//
//===================================================================================//
// variable function arguments
//===================================================================================//
// this is a function to call
function test(s){
    console.log("test outer test function called: " + s);
}
function tVariables(){
    function var_args(){
        for(var i = 0; i < arguments.length; i++){
            document.write("var_args: " + i + ": = " + arguments[i] + "<br>");
        }
    }
    var v_ary = [
        function() { document.write("v_ary 1<br>"); },
        function() { document.write("v_ary 2<br>"); },
        function() { document.write("v_ary 3<br>"); },
        function(x){ document.write("v_ary 4: " + x + "<br>"); },
    ];
    function add(x,y){ return x + y; }
    function sub(x,y){ return x - y; }
    function mul(x,y){ return x * y; }
    function div(x,y){ return x / y; }
    function operate(op, op1, op2){
        return op(op1, op2);
    }
    var op_ary = {
        add: function(x,y){ return x + y; },
        sub: function(x,y){ return x - y; },    
        mul: function(x,y){ return x * y; },
        div: function(x,y){ return x / y; }
    }
    function op_on_ary(op, op1, op2){
        if(typeof op_ary[op] == "function"){
            return op_ary[op](op1, op2);
        }
        else {
            throw "unknown op";
        }
    }
    function factorial(n){
        if(isFinite(n) && n > 0 && n == Math.round(n)){
            if(!(n in factorial)){
                factorial[n] = n * factorial(n-1);
            }
            return factorial[n];
        }
        else return NaN;
    }
    function tFactorial(){
        factorial[1] = 1; // initialize the cache to hold this base cache
    
        for(var i = 0; i < 10; i++){
            document.write("factorial cached values: " + i + " = " + factorial[i] + "<br>");
        }
    }
    function counter(){
        var n = 0;
        return {
            count: function(){ return n++; },
            reset: function(){ n = 0; }
        }
    }
    function get_set_counter(n){
        return {
            get count() { return n++; },
            set count(m){ 
                if(m >= n)
                    n = m;
                else
                    throw Error("Count can only be set to a larger value");
            }
        }
    }
    function t1(){
        var_args(1, 2, 3, 4);
        var v_vargs = var_args;
        v_vargs("a", "b");
    
        v_ary[0];
        v_ary[3](10);
        tFactorial();
        var f_op = operate(add, operate(add, 1, 2), operate(mul, 4, 5));
        document.write("f_op = operate(add, operate(add, 1, 2), operate(mul, 4, 5)); = " + f_op + "<br>");
    
        var v_op_ary = op_on_ary("add", 1, 2);
        document.write("v_op_ary = " + v_op_ary + "<br>");
    
        var fact10 = factorial(10);
        document.write("fact10 = " + fact10 + "<br>");
    
        var counta = counter(), countb = counter();
        document.write("counter " + counta.count() + "<br>");
        document.write("counter " + countb.count() + "<br>");
        document.write("counter " + counta.reset() + "<br>");
        document.write("counter " + counta.count() + "<br>");
        document.write("counter " + countb.count() + "<br>");
    
        var gccount = get_set_counter(1000);
        document.write("get_set_counter " + gccount.count + "<br>");
        document.write("get_set_counter " + gccount.count + "<br>");
        gccount = 2000;
        document.write("get_set_counter " + gccount.count + "<br>");
    }
    function tLoops(){
        var ary                 = [4,2,3,8];
        var obj                 = {a:4, b:3, c:6, d:8};
        function tLoopHash1(){
            var sum             = 0;
            for(var i in obj){
                sum             = sum + obj[i];
                console.log("tLoops.tLoopHash1() obj["+i+"]="+obj[i]);
            }
            console.log("tLoops.tLoopHash1() sum="+sum);
        }
        function tLoopAry1(){
            var sum             = 0;
            for(var i in ary){
                sum             = sum + ary[i];
                console.log("tLoops.tLoopAry1() i="+i);
            }
            console.log("tLoops.tLoopAry1() sum="+sum);
        }
        function tLoopAry2(){
            var sum             = 0;
            for(var i = 0; i < ary.length; i++){
                sum             = sum + ary[i];
                console.log("tLoops.tLoopAry2() i="+i);
            }
            console.log("tLoops.tLoopAry2() sum="+sum);
        }
        function tLoopAry3(){
            for(var i = 0, sum = 0; i < ary.length; i++){
                sum             = sum + ary[i];
                console.log("tLoops.tLoopAry3() i="+i);
            }
            console.log("tLoops.tLoopAry3() sum="+sum);
        }
        function tLoopTest(){
            tLoopHash1();
            tLoopAry1();
            tLoopAry2();
        }
        tLoopTest();
    }
    function tTryBlock(){
        try {
            document.write("Hello<br>");
        }
        catch(err){
            alert("Exception "+err);
        }
        finally {
            alert("Finally section");
        }
    }
    var objLiterals             = {a:2, b:4, c:7};
    function tObjLiterals(){
        console.log("tObjLiterals: "+objLiterals.a);
    }
    function test(){
        //t1();
        tObjLiterals();
        //tLoops();
    }
    test(); // tVariables()
}

//===================================================================================//
// regular expressions
//===================================================================================//

function tRegEx(){
    var s       = new Array();
    var re      = new Array();
    var re_str  = new Array();
    var res;

    function initVars(){
        s[0]        = "This pattern is \"Open Chapter 4.3, paragraph 6 and 7\" and '4' is remembered.";
        s[1]        = "abababbbc ababbb   babbb 55 he88bb 98uu 12.34829    ; 89 hello 78 66 2525 hi there again";
        s[2]        = "hheh88 122 18923 898hhheb bnbbe89 ,89123 23.99 88.22 1231:02";
        s[3]        = "this Should be NOTHING but a bunch of strings; and whatever...";
        s[4]        = "9123 18293 8908";
        s[5]        = "12123.23  1231  62229  823   890123.99";
        re_str[0]   = "/\\d+/g";
        re_str[1]   = "/\\d+/";
        re_str[2]   = "new RegExp /\\d+/";
        re_str[3]   = "new RegExp /\\d+/, g";
        re_str[4]   = "/\\s+\\d+\\s+/g";
        re_str[5]   = "/\\s+\\d+\\s+/";
        re_str[6]   = "/\\b\\d+\\b/g";
        re_str[7]   = "/\\b\\d+\\b/";
        re_str[8]   = "/\\B\\d+\\B/g";
        re_str[9]   = "/\\B\\d+\\B/";
        re[0]       = /\d+/g;
        re[1]       = /\d+/;
        re[2]       = new RegExp("\\d+");
        re[3]       = new RegExp("\\d+","g");
        re[4]       = /\s+\d+\s+/g;
        re[5]       = /\s+\d+\s+/;
        re[6]       = /\b\d+\b/g;
        re[7]       = /\b\d+\b/;
        re[8]       = /\B\d+\B/g;
        re[9]       = /\B\d+\B/;
    }

    function regex1(){
        var i,j,k;
        for(i = 0; i < s.length; i++){
            console.log("-----------------------------------------------");
            console.log("tRegEx s["+i+"] = "+s[i]);
            for(j=0; j < re.length; j++){
                console.log("------------------------------");
                console.log("   tRegEx re_str["+j+"]        =   "+re_str[j]);
                res     = re[j].exec(s[i]);
                console.log("   tRegEx re["+j+"].exec("+i+")="+res);
                res     = re[j].test(s[i]);
                console.log("   tRegEx re["+j+"].test("+i+")="+res);
                res     = s[i].match(re[j]);
                console.log("   tRegEx re["+j+"].match("+i+")="+res);
            }
        }
    }
    function regex2(){
        console.log("-----------------------------------------------");
        console.log("tRegEx s[1] = "+s[1]);
        console.log("-----------------------------------------------");
        res         = re[0].exec(s[1]);
        console.log("   tRegEx "+re_str[0]+".exec(s[1])     =   "+res);
        res         = s[1].match(re[0]);
        console.log("   tRegEx s[1].match("+re_str[0]+")    =   "+res);

        console.log("-----------------------------------------------");
        res         = re[1].exec(s[1]);
        console.log("   tRegEx "+re_str[1]+".exec(s[1])     =   "+res);
        res         = s[1].match(re[1]);
        console.log("   tRegEx s[1].match("+re_str[1]+")    =   "+res);

        console.log("-----------------------------------------------");
        res         = re[8].exec(s[1]);
        console.log("   tRegEx "+re_str[8]+".exec(s[1])     =   "+res);
        res         = s[1].match(re[8]);
        console.log("   tRegEx s[1].match("+re_str[8]+")    =   "+res);

        console.log("-----------------------------------------------");
        res         = re[6].exec(s[1]);
        console.log("   tRegEx "+re_str[6]+".exec(s[1])     =   "+res);
        res         = s[1].match(re[6]);
        console.log("   tRegEx s[1].match("+re_str[6]+")    =   "+res);

    }
    function regex3(){
        var re_str;
        var re;      

        console.log("-----------------------------------------------");
        console.log("tRegEx s[1] = "+s[1]);
        console.log("-----------------------------------------------");
        re_str      = "\\d+";
        res         = s[1].match(re_str);
        console.log("   tRegEx s[1].match("+re_str+")    =   "+res);
        console.log("-----------------------------------------------");
        re_str      = "\\d+";
        re          = new RegExp(re_str, "g");
        res         = re.exec(s[1]);
        console.log("   tRegEx re.exec("+re_str+")    =   "+res);
        console.log("-----------------------------------------------");
        var ary     = s[1].split(/\s+/);
        console.log("   tRegEx ary:         "+ary);
        for(var i=0; i < ary.length; i++){
            res         = re.exec(ary[i]);
            console.log("   tRegEx re.exec("+ary[i]+")    =   "+res);
        }
    }
    function regex4(){
        console.log("-----------------------------------------------");
        var ary;
        ary         = s[1].split(/\s+/);
        for(var i=0; i < ary.length; i++){
            console.log("   tRegEx "+ary[i]+".replace(/\\d/g,\"*\")="+ary[i].replace(/\d/g,"*"));
        }
        var s0      = "John Smith";
        var re0     = /(\w+)\s+(\w+)/;
        var newstr  = s0.replace(re0, "$2, $1");
        console.log("   regex4: replace: "+s0+" to: "+newstr);
    }
    function hasKeyWord(a, keyword){
        // regex cannot work with variable matching
        if(/keyword/.test(a)){
            return true;
        }
        var idx = a.indexOf(keyword);
        if(idx != -1){
            return true;
        }
        return false;
    }
    (
        function testRegEx(){
            initVars();
            //regex1();
            //regex2();
            //regex3();
            regex4();
        }
    )();
}

//===================================================================================//
//===================================================================================//
function tHelloWorld(){
    vHello                             = "Hello world 1";
    document.write(vHello + "<br>");
    console.log("wrote: " + vHello);
}
//===================================================================================//
// function basics
//===================================================================================//
function tFunctions(){
    // this is a function expression
    (function testImmediateCall(){
        console.log("testImmediateCall");
    })();
    var tFunc;
    var v00000,
        v00001                = 1,
        v00002                = { v2a : 3, v2b : 4, v2c : 5 }, 
        v00003                = 3, 
        v00004, 
        v00005                = 5;
    if(v00001 == 0){
        tFunc                 = function(){
            document.write("tFunc 0<br>");
        }
    }
    if(v00001 == 1){
        tFunc                 = function(){
            document.write("tFunc 1<br>");
        }
    }
    if(v00001 == 2){
        tFunc                 = function(){
            document.write("tFunc 2<br>");
        }
    }
    v00000                    = 0;
    v00003                    = function(){
        function incVar(){
            v00005            = v00005 + 5;
        }
        function printV2(){
            var s             = "v00003 assigned a function: v2a:"+v00002.v2a+"; v2b:"+v00002.v2b+"<br>";
            document.write(s);
        }
        function printMe(){
            document.write("v00003 assigned a function: v00005 = " + v00005 + "<br>");
            printV2();
            incVar();
        }
        printMe();
    };
    // what's the difference between a function assigned to a variable and a named function?
    v00004                    = function(a, b, c){
        var d                 = a + b + c;
        document.write("v00004 a+b+c="+a+"+"+b+"+"+c+"="+d+"<br>");
    }
    function f00004(a, b, c){
        var d                 = a + b + c;
        document.write("f00004 a+b+c="+a+"+"+b+"+"+c+"="+d+"<br>");
    }
    // closure example
    var f00005                = function(){
        var v0                = function(a,b){
        };
        var v1                = function(a,b,c){
        };
        function f0(a,b){ 
        }
        function f1(a,b,c){
        }
    };
    var f00006                  = {
        a : 2,
        m: function(b){
            return this.a + 1;
        }    
    };
    function tf00006(){
        console.log("tFunctions: " + f00006.m());
        var p                   = Object.create(f00006);
        p.a                     = 12;
        console.log("tFunctions:" + p.m());
    }
    function t00007(){
        function s01(){
            console.log("t00007.s01 called");
        }
        function s02(){
            console.log("t00007.s02 called");
        }
        function s03(){
            console.log("t00007.s03 called");
        }
        s03();
        // these inner functions cannot be called externally
    }
    var f00008                  = {
        s04:    20,
        s01:    function(a){
            this.s04            = this.s04 + a;
            console.log("t00008.s01 called "+a+" s04=" + this.s04);
        },
        s02:    function(b){
            this.s04            = this.s04 + b;
            console.log("t00008.s02 called "+b+" s04=" + this.s04);
        },
        s03:    function(c){
            this.s04            = this.s04 + c;
            console.log("t00008.s03 called "+c+" s04=" + this.s04);
        }
        // these inner functions can be called externally
    };
    function test(){
        parent.test("test calling outer test");  // this calls global test
        //tFunc();
        //v00003; // nothing happens here
        //v00003();
        //v00003();
        //v00004(1,2,3);
        //f00004(1,2,3);
        //tf00006();
        t00007();
        var f8                  = f00008;
        f8.s01(10);
        f8.s02(11);
        console.log("f8.s04 = " + f8.s04);
    }
    test();
}

//===================================================================================//
// class basics
//===================================================================================//

function tClass(){
    // this is how to define a class
    function CA(){
        this.a                = 1;
        this.aaa              = 0;
    }
    // this is how to create a function of a Class
    CA.prototype.printMe      = function(){
        document.write("CA printMe:" + this.a + "; aaa=" + this.aaa + "<br>");
    }
    CA.prototype.t1           = function(v1, v2){
        this.aa               = v1 + v2;
        this.aaa              = this.aaa + v1;
        this.printMe();
        document.write("CA t1:v1/v2=" + v1 + "/" + v2 + "; aa=" + this.aa + "; aaa=" + this.aaa + "<br>"); 
    }
    function CB(){
        this.b                = 2;
    }
    CB.prototype.printMe      = function(){
        document.write("CB printMe:" + this.b + "<br>");
    }
    function CC(){
        this.c                = 3;
    }
    CC.prototype.printMe      = function(){
        document.write("CC printMe:" + this.c + "<br>");
    }
    // this is how to inherit from single class
    function CD_A(){
        this.d                = 4;
    }
    CD_A.prototype            = new CA;
    function CE_B(){
        this.e                = 5;
    }
    CE_B.prototype            = new CB;
    function CF_CDA(){
        this.f                = 6;
    }
    CF_CDA.prototype          = new CD_A;
    function test(){
        // this is how to instantiate a class
        var ca                = new CA();
        ca.printMe();
        ca.t1(3,4);
        var ceb               = new CE_B();
        ceb.printMe();
    }
    test();
}
//===================================================================================//
//===================================================================================//
//===================================================================================//
//===================================================================================//
//===================================================================================//
//===================================================================================//
//===================================================================================//
//===================================================================================//
//===================================================================================//
//===================================================================================//
//===================================================================================//
//===================================================================================//
// canvas stuff
//===================================================================================//
function tCanvas(){
    // simple canvas draw 2 rectangles
    function t1(){
        var canvas = document.getElementById("canvas");
        if(canvas.getContext){
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = "rgb(200,0,0)";
            ctx.fillRect(10,10,150,150);
            ctx.fillStyle = "rgba(0,0,200,0.5)";
            ctx.fillRect(30,30,150,150);
        }
    }
    function tDrawPacman(){
        function t2(){
            var canvas = document.getElementById('canvas');
            if (canvas.getContext){
                var ctx = canvas.getContext('2d');
        
                roundedRect(ctx,12,12,150,150,15);
                roundedRect(ctx,19,19,150,150,9);
                roundedRect(ctx,53,53,49,33,10);
                roundedRect(ctx,53,119,49,16,6);
                roundedRect(ctx,135,53,49,33,10);
                roundedRect(ctx,135,119,25,49,10);
        
                ctx.beginPath();
                ctx.arc(37,37,13,Math.PI/7,-Math.PI/7,false);
                ctx.lineTo(31,37);
                ctx.fill();
        
                for(var i=0;i<8;i++){
                  ctx.fillRect(51+i*16,35,4,4);
                }
        
                for(i=0;i<6;i++){
                  ctx.fillRect(115,51+i*16,4,4);
                }
        
                for(i=0;i<8;i++){
                  ctx.fillRect(51+i*16,99,4,4);
                }
        
                ctx.beginPath();
                ctx.moveTo(83,116);
                ctx.lineTo(83,102);
                ctx.bezierCurveTo(83,94,89,88,97,88);
                ctx.bezierCurveTo(105,88,111,94,111,102);
                ctx.lineTo(111,116);
                ctx.lineTo(106.333,111.333);
                ctx.lineTo(101.666,116);
                ctx.lineTo(97,111.333);
                ctx.lineTo(92.333,116);
                ctx.lineTo(87.666,111.333);
                ctx.lineTo(83,116);
                ctx.fill();
        
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.moveTo(91,96);
                ctx.bezierCurveTo(88,96,87,99,87,101);
                ctx.bezierCurveTo(87,103,88,106,91,106);
                ctx.bezierCurveTo(94,106,95,103,95,101);
                ctx.bezierCurveTo(95,99,94,96,91,96);
                ctx.moveTo(103,96);
                ctx.bezierCurveTo(100,96,99,99,99,101);
                ctx.bezierCurveTo(99,103,100,106,103,106);
                ctx.bezierCurveTo(106,106,107,103,107,101);
                ctx.bezierCurveTo(107,99,106,96,103,96);
                ctx.fill();
        
                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.arc(101,102,2,0,Math.PI*2,true);
                ctx.fill();
        
                ctx.beginPath();
                ctx.arc(89,102,2,0,Math.PI*2,true);
                ctx.fill();
            }
        }
        // A utility function to draw a rectangle with rounded corners.
        function roundedRect(ctx,x,y,width,height,radius){
            ctx.beginPath();
            ctx.moveTo(x,y+radius);
            ctx.lineTo(x,y+height-radius);
            ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
            ctx.lineTo(x+width-radius,y+height);
            ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
            ctx.lineTo(x+width,y+radius);
            ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
            ctx.lineTo(x+radius,y);
            ctx.quadraticCurveTo(x,y,x,y+radius);
            ctx.stroke();
        }
        t2();
    }
    var animateSquare = function(){
        var a_canvas  = $("#a_canvas")[0],
            ctx       = a_canvas.getContext("2d"),
            p         = 0;
        //setInterval(moveRect(), 30); // this does not work. why???
        setInterval(moveRect, 30);     // but moveRect() does not work
        function moveRect(){
            ctx.clearRect(0, 0, a_canvas.width, a_canvas.height);
            if(p++ > 450){
                p     = 0;
            }
            ctx.fillStyle = "rgb(0, 0, 255)";
            ctx.fillRect(p, p, 50, 50);
        }
    };
    function tDrawText(){
        var canvas  = document.getElementById("canvas");
        var ctx     = canvas.getContext("2d");
        //ctx.fillStyle = "#ffffaa";
        ctx.fillStyle = "yellow";
        ctx.fillRect(0,0,800,200);
        ctx.fillStyle = "#000000";
        ctx.font = "20px sans";
        ctx.textBaseline = "top";
        ctx.fillText("Hello", 150, 80);
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(5, 5, 790, 190);
    }
    function tLoadImage(){
        var cvs     = document.getElementById("canvas");
        var ctx     = cvs.getContext("2d");
        var img     = new Image();
        img.src     = "../images/circle_100x100.png";
        img.onload  = function(){
            ctx.drawImage(img, 250, 70);
        }
    }
    (
        function fCanvas(){
            //t1();
            //t2();
            tDrawText();
            tLoadImage();
        }
    )();
}
//===================================================================================//
//===================================================================================//
function binarysearch(ary, lo, hi, val){
    var mid = Math.floor((hi-lo)/2) + lo;
    var idx = -1;
    if(hi < lo){
        return idx;
    }
    if(hi == lo && val != ary[hi]){
        return idx;
    }
    if(val > ary[mid]){
        idx = binarysearch(ary, mid, hi, val);
    }
    else if(val == ary[mid]){
        idx = mid;
    }
    else if(val < ary[mid]){
        idx = binarysearch(ary, lo, mid, val);
    }
    return idx;
}

function perm(ary){
    permr(0,  
function permr(level, permuted, used, original){
    var length = original.length;
    if(level == length){
        console.log("ary:"+permuted);
    }
    else {
        for(var i = 0; i < length; i++){
            if(used[i] == 0){
                used[i] = 1;
                permute(level+1, original[i] + permuted, used, original);
                used[i] = 0;
            }
        }
    }
}

function comb(ary){
}

function telephone

function tMain(){
    //parent.test("test calling parent test");  // this calls global test
    //tHelloWorld();
    //tVariables();
    //tClass();
    //tFunctions();
    tRegEx();
    var ary = [1,2,3,4,5,6,7,8,9,10,12,15,18,20];
    var res = binarysearch(ary, 0, ary.length-1, 7);
    console.log("search:"+res);
    ary = [1,2,3,4];
    perm(ary);
    comb(ary);
}
//===================================================================================//
//===================================================================================//
// top level function calls over here
//===================================================================================//

tMain();
window.onload           = function(){
    tCanvas();
}






