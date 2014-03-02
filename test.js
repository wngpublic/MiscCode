function test(s){
    console.log("test outer test function called: " + s);
}
var GV = {
    DEBUG: 1
};
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
        function(x){ document.write("v_ary 4: " + x + "<br>"); }
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
    };
    function op_on_ary(op, op1, op2){
        if(typeof op_ary[op] === "function"){
            return op_ary[op](op1, op2);
        }
        else {
            throw "unknown op";
        }
    }
    function factorial(n){
        if(isFinite(n) && n > 0 && n === Math.round(n)){
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
        };
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
        };
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
    function tString0(){
        var s0  = 'Hello world, how are you and what year is it? It is 2009. Or maybe 2010?';
        var a0  = s0.split(/\s+/);
        var s1  = s0.toUpperCase();
        var s2  = s0.replace('2009','2013');
        var s3  = s0.replace(/\d+/g,'');
        console.log('tString0: a0: '+a0);
        console.log('tString0: s0: '+s0);
        console.log('tString0: s1: '+s1);
        console.log('tString0: s2: '+s2);
        console.log('tString0: s3: '+s3);
        if(s0.search(/\d+/) !== -1){
            console.log('tString0: found \d+ in s0');
        }
        else {
            console.log('tString0: not found \d+ in s0');
        }
        if(s3.search(/\d+/) !== -1){
            console.log('tString0: found \d+ in s3');
        }
        else {
            console.log('tString0: not found \d+ in s3');
        }
        var s4  = s0.substr(6,10);
        console.log('tString0: s4: '+s4);
        var s5  = s0.substring(6,16);
        console.log('tString0: s5: '+s5);
    }
    function hasKeyWord(a, keyword){
        // regex cannot work with variable matching
        if(/keyword/.test(a)){
            return true;
        }
        var idx = a.indexOf(keyword);
        if(idx !== -1){
            return true;
        }
        return false;
    }
    (
        function testRegEx(){
            //initVars();
            //regex1();
            //regex2();
            //regex3();
            //regex4();
        }
    )();
    function tmain(){
        tString0();
    }
    tmain();
}
function tHelloWorld(){
    vHello                             = "Hello world 1";
    document.write(vHello + "<br>");
    console.log("wrote: " + vHello);
}
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
    if(v00001 === 0){
        tFunc                 = function(){
            document.write("tFunc 0<br>");
        };
    }
    if(v00001 === 1){
        tFunc                 = function(){
            document.write("tFunc 1<br>");
        };
    }
    if(v00001 === 2){
        tFunc                 = function(){
            document.write("tFunc 2<br>");
        };
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
    };
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
function tClass(){
    // this is how to define a class
    function CA(){
        this.a                = 1;
        this.aaa              = 0;
    }
    // this is how to create a function of a Class
    CA.prototype.printMe      = function(){
        document.write("CA printMe:" + this.a + "; aaa=" + this.aaa + "<br>");
    };
    CA.prototype.t1           = function(v1, v2){
        this.aa               = v1 + v2;
        this.aaa              = this.aaa + v1;
        this.printMe();
        document.write("CA t1:v1/v2=" + v1 + "/" + v2 + "; aa=" + this.aa + "; aaa=" + this.aaa + "<br>"); 
    };
    function CB(){
        this.b                = 2;
    }
    CB.prototype.printMe      = function(){
        document.write("CB printMe:" + this.b + "<br>");
    };
    function CC(){
        this.c                = 3;
    }
    CC.prototype.printMe      = function(){
        document.write("CC printMe:" + this.c + "<br>");
    };
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
var G = {
    cvs_rect:0,
    ctx:0,
    cvs:0,
    cvs_w:0,
    cvs_h:0,
    win_w:0,
    win_h:0,
    mX:0, 
    mY:0
};
var eventStuff = {
    movePrint: function(e){
        console.log("onmousemove: raw:"+e.pageX+","+e.pageY+"; adjusted:"+G.mX+","+G.mY);
    },
    upPrint: function(e){
        console.log("onmouseup:   raw:"+e.pageX+","+e.pageY+"; adjusted:"+G.mX+","+G.mY);    
    },
    downPrint: function(e){
        console.log("onmousedown: raw:"+e.pageX+","+e.pageY+"; adjusted:"+G.mX+","+G.mY);
    },
    updateCoords: function(e){
        if((e.pageX >= G.cvs_rect.left && e.pageX <= G.cvs_rect.right) &&
            (e.pageY >= G.cvs_rect.top && e.pageY <= G.cvs_rect.bottom)){
            G.mX = e.pageX-G.cvs_rect.left;
            G.mY = e.pageY-G.cvs_rect.top;
            return 1;
        }
        return 0;
    }
};
var shapes = {
    drawCircle: function(ctx, r, x, y){
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2, false);
        ctx.stroke();
    },
    drawLine: function(ctx, width, x0, y0, x1, y1){
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(x0,y0);
        ctx.lineTo(x1,y1);
        ctx.stroke();
    },
    drawRect: function(ctx, x, y, width, height, color){
        ctx.fillStyle = color;
        ctx.strokeRect(x, y, width, height);
    },
    fillRect: function(ctx, x, y, width, height, color){
        ctx.strokeStyle = color;
        ctx.fillRect(x, y, width, height);            
    }
};
function init_canvas_vars(){
    G.cvs = document.getElementById("canvas");
    if(G.cvs.getContext){
        G.ctx = G.cvs.getContext("2d");
        G.cvs_rect = G.cvs.getBoundingClientRect();
        G.cvs_w = G.cvs.width;
        G.cvs_h = G.cvs.height;
        G.win_w = window.innerWidth;
        G.win_h = window.innerHeight;
    }
    else {
        alert("canvas.getContext not found in canvasStuff");
    }

    console.log("canvasStuff.init: cvs_w/cvs_h/win_w/win_h=("+G.cvs_w+","+G.cvs_h+","+G.win_w+","+G.win_h+")");
}
function init_events(){
    window.onmousedown              = function(e){
        if(eventStuff.updateCoords(e)===1){
            //eventStuff.downPrint(e);
        }
    };
    window.onmousemove              = function(e){
        if(eventStuff.updateCoords(e)===1){
            //eventStuff.movePrint(e);
        }
    };
    window.onmouseup                 = function(e){
        if(eventStuff.updateCoords(e)===1){
            //eventStuff.upPrint(e);
        }
    };
    window.onmouseover              = function(e){
        //console.log("onmouseover "+e.pageX+","+e.pageY);
    };
}
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
        };
    }
    function tDrawTranslate(){
        function tDrawTranslate1(){
            G.ctx.fillRect(0,0,400,400);
            for(var i = 0; i < 3; i++){
                for(var j = 0; j < 3; j++){
                    G.ctx.save();
                    G.ctx.strokeStyle = "green";
                    G.ctx.translate(50+j*100, 50+i*100);
                    //drawSpirograph(ctx, 20*(j+2)/(j+1), -8*(i+3)/(i+1), 10);
                    drawSpirograph(G.ctx, 15*(j+2)/(j+1), -4*(i+3)/(i+1), 20);
                    G.ctx.restore();
                }
            }
        }
        function drawSpirograph(ctx, R, r, O){
            var x1 = R-O;
            var y1 = 0;
            var i  = 1;
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            do {
                if(i>20000) break;
                var x2 = (R+r)*Math.cos(i*Math.PI/72) - (r+O)*Math.cos(((R+r)/r)*(i*Math.PI/72));
                var y2 = (R+r)*Math.sin(i*Math.PI/72) - (r+O)*Math.sin(((R+r)/r)*(i*Math.PI/72));
                ctx.lineTo(x2,y2);
                x1 = x2;
                y1 = y2;
                i++;
            } while(x2 !== R-O && y2 !== 0);
            ctx.stroke();
        }
        tDrawTranslate1();
    }
    function canvasAnimation(){
        var radius = 50;
        var x = 250,
            y = 250;
        function tAnimation1(){
            drawBorder();
            G.ctx.fillStyle = 'rgba(0,0,0,0.4)';
            G.ctx.strokeStyle = 'rgba(0,153,255,0.4)';
            G.ctx.save();
            G.ctx.translate(x,y);
            var time = new Date();
            G.ctx.rotate(((2*Math.PI)/60)*time.getSeconds()+((2*Math.PI)/60000)*time.getMilliseconds());
            G.ctx.translate(55,0);
            G.ctx.fillRect(0,-12,radius,24);
            shapes.drawCircle(ctx,10,100,100);
            G.ctx.save();
            G.ctx.rotate( ((2*Math.PI)/6)*time.getSeconds()+((2*Math.PI)/6000)*time.getMilliseconds() );
            G.ctx.translate(0,28.5);
            G.ctx.restore();
            G.ctx.restore();
            G.ctx.beginPath();
            shapes.drawCircle(ctx,radius,x,y);
            G.ctx.stroke();
        }
        function tAnimationMain(){
            window.setInterval(tAnimation1, 50);
        }
        tAnimationMain();
    }
    (
        function fCanvas(){
            shapes.drawRect(G.ctx, 0,0,G.cvs_w, Math.floor(G.cvs_h/2), "black");
            //t1();
            //t2();
            //tDrawText();
            //tLoadImage();
        }
    )();
}
var algos = {
    ctr: 0,
    resetCtr: function(){
        this.ctr = 0;
    },
    rotate: function(a, rot_left, rot_offset){
        var tmp;
        for(var rot_i = 0; rot_i < rot_offset; rot_i++){
            tmp = (rot_left === 1) ? (a[0]) : (a[a.length-1]);
            if(rot_left === 1){
                for(var i = 0; i < a_sub.length; i++){
                    if(i === (a_sub.length-1)){
                        a_sub[i] = tmp;
                    }
                    else {
                        a_sub[i] = a[i+1];
                    }
                }
            }  
            else {
                for(var i = a_sub.length-1; i >= 0; i--){
                    if(i === 0){
                        a_sub[i] = tmp;
                    }
                    else {
                        a_sub[i] = a[i-1];
                    }
                }
            }
        }
    },
    swap: function(a, i, j){
      var tmp = a[j];
      a[j] = a[i];
      a[i] = tmp;
    },
    shellsort: function(a){
        console.log("shellsort ary before: "+a);
        this.ctr++;

        var N = a.length;
        var h = 1;
        while(h < Math.floor(N/3)){
            h = 3 * h + 1;
        }
        while(h >= 1){
            for(var i = h; i < N; i++){
                for(var j = i; j >= h && (a[j] < a[j-h]); j -= h){
                    this.swap(a, j, (j-h));
                    ctr++;
                }
            }
            h = Math.floor(h/3);
        }

        console.log("shellsort ary after : "+a);
        console.log("shellsort ctr steps : "+ctr);
    },
    binarysearch: function(ary, lo, hi, val){
        var mid = Math.floor((hi-lo)/2) + lo;
        var idx = -1;
        if(hi < lo){
            return idx;
        }
        if(hi === lo && val !== ary[hi]){
            return idx;
        }
        if(val > ary[mid]){
            idx = this.binarysearch(ary, mid, hi, val);
        }
        else if(val === ary[mid]){
            idx = mid;
        }
        else if(val < ary[mid]){
            idx = this.binarysearch(ary, lo, mid, val);
        }
        return idx;
    },
    balancedTree: function(){

    },
    random: function(lo, hi){
        var i = Math.floor(Math.random() * (hi-lo)) + lo;
        return i;
    },
    shuffle: function(a){
        var used = [];
        var i, j, r, found, max = (a.length-1), stop = 0;
        for(i = 0; i < a.length; i++){
            used[i] = 0;
        }
        algos.ctr = 0;
        for(i = 0; i < a.length && stop === 0; i++){
            found = 0;
            while(found === 0 && used[i] === 0){
                r = algos.random(i, max);
                if(GV.DEBUG===1)
                    console.log("algos.shuffle i:"+i+" max:"+max+" r:"+r+" used["+r+"]="+used[r]+" ctr:"+algos.ctr);
                if(used[r] === 0){
                    found = 1;
                    algos.swap(a,i,r);
                    used[i] = 1;
                    used[r] = 1;
                }
                algos.ctr++;
                if(algos.ctr >= 100){
                    stop = 1;
                }
            }
        }
    },
    quicksort: function(ary){
        function partition(a, lo, hi){
            var i = lo, j = hi+1;
            var v = a[lo];
            while(true){
                if(GV.DEBUG===1)
                    console.log("partition: while a[++"+i+"] < v == "+a[i]+"<"+v);
                while(a[++i] < v){
//                while(a[i++] < v){
                    if(i === hi){
                        break;
                    }
                }
                if(GV.DEBUG===1)
                    console.log("partition: while v < a[--"+j+"] == "+v+"<"+a[j]);
                while(v < a[--j]){
//                while(v < a[j--]){
                    if(j === lo){
                        break;
                    }
                }
                if(i >= j){
                    break;
                }
                if(GV.DEBUG===1)
                    console.log("partition: swap(i,j)="+i+","+j+" vals:"+a[i]+","+a[j]);
                algos.swap(a, i, j);
            }
            algos.swap(a, lo, j);
            return j;
        }
        function qsort(a, lo, hi){
            algos.ctr++;
            if(algos.ctr >= 100){
                return;
            }
            if(hi > lo){
                if(GV.DEBUG===1)
                    console.log("qsort before partition:"+a);
                var j = partition(a, lo, hi);
                if(GV.DEBUG===1){
                    console.log("qsort after  partition:"+a);
                    console.log("qsort partition     lo:"+lo+",hi:"+hi+",j:"+j);
                    console.log("qsort               lo:"+lo+",hi:"+(j-1));
                }
                qsort(a, lo, j-1);
                if(GV.DEBUG===1)
                    console.log("qsort               lo:"+(j+1)+",hi:"+hi);
                qsort(a, j+1, hi);
            }
        }
        function qsortShell(a){
            algos.ctr = 0;
            qsort(a, 0, a.length-1);
        }
        qsortShell(ary);
    },
    permutations: function(a){
        /*
         * in:      ABC
         * out:     A       B       C
         * used:    100     010     001
         * len:     3             
         * rLev:    0       0       0               
         * i:       0       1       2               
         * uid:     1       2       3
         * pid:     0       0       0
         * nxt:     1       1       1
         *                    
         * in:      ABC             
         * out:     A       AB      AC
         * used:    100     110     101
         * len:     3           
         * rLev:    1       1       1
         * i:       0       1       2
         * uid:     4       5       6
         * pid:     1       1       1
         * nxt:     0       1       1
         * 
         * in:      ABC     
         * out:     AB      AB      ABC     AC      ACB     AC         
         * used:    110     110     111     101     111     101
         * len:     3       3       3       3       3       3
         * rLev:    2       2       2       2       2       2
         * i:       0       1       2       0       1       2
         * uid:     7       8       9       10      11      12
         * pid:     5       5       5       6       6       6
         * nxt:     0       0       1       0       1       0
         * 
         * in:      ABC     
         * out:     ABC     ACB
         * used:    111     111
         * len:     3       3
         * rLev:    3       3
         * i:       
         * uid:     13      14
         * pid:     9       11
         * nxt:     PRINT   PRINT
         * 
         * in:      ABC     
         * out:     BA      B       BC
         * used:    110     010     011
         * len:     3       3       3
         * rLev:    1       1       1
         * i:       0       1       2
         * uid:     15      16      17
         * pid:     2       2       2
         * nxt:     1       0       1
         * 
         * in:      ABC     
         * out:     BA      BA      BAC     BCA     BC      BC
         * used:    110     110     110     111     011     011
         * len:     3       3       3       3       3       3
         * rLev:    2       2       2       2       2       2
         * i:       0       1       2       0       1       2
         * uid:     18      19      20      21      22      23
         * pid:     15      15      15      17      17      17
         * nxt:     0       0       1       1       0       0
         * 
         * 
         */
        function perm(indat, outdat, used, length, recursLev){
            if(recursLev === length){
                if(GV.DEBUG===1)
                    console.log("perm: ctr:"+algos.ctr+": recurs==length: "+outdat);
                algos.ctr++;
            }
            else {
                if(GV.DEBUG===1)
                    console.log("perm");
            }
            for(var i=0; i < length; i++){
                if(used[i] === 0){
                    outdat[recursLev] = indat[i];
                    used[i] = 1;
                    perm(indat, outdat, used, length, recursLev+1);
                    used[i] = 0;
                }
            }
        }
        function permShell(a){
            var length, i, used = [], outdat = [];
            length = a.length;
            for(i=0; i<length;i++){
                used[i] = 0;
            }
            perm(a, outdat, used, length, 0);
        }
        function perm2(){
            
        }
        function permShell2(a){
            
        }
        (function permTest(){
            var ary = [0,1,2,3,4];
            algos.resetCtr();
            console.log("permTest on "+ary);
            permShell2(ary);
        })();
    },
    combinations: function(a){
        function comb(a, outdat, length, recursLev, start){
            for(var i = start; i<length; i++){
                outdat[recursLev] = a[i];
                console.log("comb ctr:"+algos.ctr+"; "+outdat);
                algos.ctr++;
                if(i < length-1){
                    comb(a, outdat, length, recursLev+1, i+1);
                }
            }
        }
        function combShell(a){
            var length = a.length, outdat = [];
            comb(a, outdat, length, 0, 0);
        }
        (function combTest(){
            var ary = [0,1,2,3,4];
            algos.resetCtr();
            console.log("combTest on "+ary);
            combShell(ary);
        })();
    },
    mergeSort: function(ary){
        var ctrMax              = 100,
            ctr                 = 0;
        function merge(a, aux, lo, mid, hi){
            ctr++;
            if(ctr > ctrMax){return;}
            var i = lo,
                j = mid+1;
            for(var k = lo; k <= hi; k++){
                aux[k]          = a[k];
            }
            for(var k = lo; k <= hi; k++){
                if(i > mid){                    
                    a[k]    = aux[j++]; 
                }
                else if(j > hi){                
                    a[k]    = aux[i++]; 
                }
                else if(aux[j] < aux[i]){       
                    a[k]    = aux[j++]; 
                }
                else {                          
                    a[k]    = aux[i++]; 
                }
            }
            if(GV.DEBUG===1)
                console.log("mergeSort.merge "+a+"; lo:"+lo+", mid:"+mid+", hi:"+hi);                
        }
        function msortshell1(a, aux, lo, hi){
            if(GV.DEBUG===1)
                console.log("mergeSort.sort  "+a+"; lo:"+lo+", hi:"+hi);
            ctr++;
            if(ctr > ctrMax){
                return;
            }
            
            if(hi <= lo){                       
                return; 
            }
            var mid  = lo + Math.floor((hi - lo)/2);
            msortshell1(a, aux, lo, mid);
            msortshell1(a, aux, mid+1, hi);
            merge(a, aux, lo, mid, hi);
        }
        function msortshell2(a, tmp, l, r){
            if(r>l){
                var m = Math.floor((r+l)/2);
                msort(a, tmp, l, m);
                msort(a, tmp, m+1, r);
                merge1(a, tmp, l, m+1, r);
            }
        }
        // merge1 is broken
        function merge1(a, tmp, l, m, r){
            var i, leftend, sz, tmp_pos;
            leftend = m--;
            tmp_pos = l;
            sz = r-l+1;
            while((l <= leftend) && (m <= r)){
                if(a[l] <= a[m]){
                    tmp[tmp_pos] = a[l];
                    tmp_pos = tmp_pos + 1;
                    l++;
                }
                else {
                    tmp[tmp_pos] = a[m];
                    tmp_pos = tmp_pos+1;
                    m++;
                }
            }
            while(l <= leftend){
                tmp[tmp_pos] = a[l];
                l++;
            }
            while(m <= r){
                tmp[tmp_pos] = a[m];
                m++;
                tmp_pos++;
            }
            for(i=0; i<= sz; i++){
                a[r] = tmp[r];
                r--;
            }
        }
        function test(a){
            ctr = 0;
            var tmp = [];
            var aux                 = [];

            console.log("mergeSort1 before:"+a);
            msortshell1(a, aux, 0, a.length-1);
            //msortshell2(a,tmp,0,a.length-1);
            console.log("mergeSort1    ctr:"+ctr);
            console.log("mergeSort1 after :"+a);
        }
        test(ary);
    }
};
function algosObj(ary){
    function resetAry(){
        ary = [1,2,3,4,5,6,7];
    }
    function Link(key, value){
        this.obj = {
            'key'    : key,
            'value'  : value,
            'next'   : null,
            'prev'   : null
        };
        return this.obj;
    }
    function Node(key, value){
        this.obj = {
            'key'    : key,
            'value'  : value,
            'left'   : null,
            'right'  : null,
            'parent' : null
        };
        return this.obj;
    }
    function listTest(ary){
        var list;
        var obj_p = null, obj_c = null, obj_head = null, obj_tail = null;
        var i;

        console.log("listTest ary:"+ary);

        for(var i = 0; i < ary.length; i++){
            obj_c = new Link(i, ary[i]);
            if(obj_p !== null){
                obj_c.prev = obj_p;
                obj_p.next = obj_c;
            }
            else {
                obj_head = obj_c;
            }
            obj_p = obj_c;
        }
        obj_tail = obj_p;

        console.log("==========================================================");
        for(i = 0, obj_c = obj_head; obj_c !== null; obj_c = obj_c.next, i++){
            console.log("listTest head i:"+i+", obj(key,value)=("+obj_c.key+","+obj_c.value+")");
        }
        console.log("==========================================================");
        //for(i = 0, obj_c = obj_tail; obj_c !== null; obj_c = obj_c.prev, i++){
        //    Logger.log("listTest tail i:"+i+", obj(key,value)=("+obj_c.key+","+obj_c.value+")");
        //}
        //Logger.log("==========================================================");

    }
    function initPrint(ary_o, hash){
        for(var i = 0; i < ary_o.length; i++){
            console.log("initPrint hash["+ary_o[i]+"] = "+hash[ary_o[i]]);
        }  
        var keyary = [];
        for(var key in hash){
            console.log("initPrint keys in hash: hash["+key+"]="+hash[key]);
            keyary.push(key);
        }
        keyary.sort();
        for(var i = 0; i < keyary.length; i++){
            console.log("initPrint keyary["+i+"]="+keyary[i]);
        }
    }
    function tPassVal(){
        function passVal(a){
            a++;
        }
        function passAry(a){
            for(var i = 0; i < a.length; i++){
                a[i] += 10;
            }
        }
        function passByValue(a){
            for(var i = 0, x = 0; i < a.length; i++){
                x = a[i];
                x += 10;
            }
        }
        var x = 10;
        passVal(x);
        console.log("passVal x:"+x);
        var ary = [];
        ary     = [1,2,3,4,5];
        console.log("passAry before ary:"+ary);
        passAry(ary);
        console.log("passAry after  ary:"+ary);
        ary     = [1,2,3,4,5];
        console.log("passAryByValue before ary:"+ary);
        passByValue(ary);
        console.log("passAryByValue after  ary:"+ary);

        // this is being done by reference
        var ary_c = ary;
        console.log("ary copy ary:             "+ary_c);        
        console.log("passAry before ary_c:"+ary_c);
        passAry(ary_c);
        console.log("passAry after  ary_c:"+ary_c);
        console.log("passAry after  ary  :"+ary);

        // if individual items are copied (and are not object references), 
        // then this is by value
        ary     = [1,2,3,4,5];
        for(var i = 0; i < ary.length; i++){
            ary_c[i] = ary[i];
        }
        passAry(ary_c);
        console.log("passAry after  ary_c:"+ary_c);
        console.log("passAry after  ary  :"+ary);
    }
    function tRand(){
        var val = 0, pass = 1;
        var i, j, k;
        for(i = 10, j = 10; i < 2000 && pass === 1; i+=20, j+=10){
            for(k = 0; k < 100 && pass === 1; k++){
                val = algos.random(j, i);   
                console.log("algos.random: lo-hi=rand:"+j+"-"+i+"="+val);
                if(val < j || val > i){
                    pass = 0;
                }
            }
        }
        if(pass === 0){
            console.log("algos.random fail: "+j+"-"+i+"="+val);
        }
        else {
            console.log("algos.random pass");       
        }
    }
    function tShuffle(){
        var ary = [];
        var i, j, k;
        for(i = 0; i < 100; i++){
            ary[i] = i;
        }
        console.log("algos.shuffle before: "+ary);
        algos.shuffle(ary);
        console.log("algos.shuffle after : "+ary);
    }
    function tQsort(ary){
        algos.shuffle(ary);
        console.log("qsort before: "+ary);
        algos.quicksort(ary);
        console.log("qsort after : "+ary);
    }
    function reverseDoubleLL(){
        function init(h){
            var c = null,
                p = null;
            for(var i = 0; i < 10; i++){
                c = new Link(i,i);
                if(p !== null){
                    c.prev = p;
                    p.next = c;
                }
                else {
                    h = c;
                }
                p = c;
            }
            return h;
        }
        function getTail(h){
            var c = h;
            while(c.next !== null){
                c = c.next;
            }
            return c;
        }
        function traverse(h){            
            var c = h;
            while(c !== null){
                console.log("DLL traverse: "+c.key+","+c.value);
                c = c.next;
            }
            return h;
        }
        function reverse(h){
            
        }
        function test(){
            var h = null,
                t = null;
            console.log("DLL init");
            h = init(h);
            console.log("DLL traverse");
            h = traverse(h);
            console.log("DLL get tail");
            t = getTail(h);
        }
        test();
    }
    function reverseSingleLL(){
        function init(h){
            var c = null, 
                p = null;
            for(var i=0; i < 10; i++){
                c = new Link(i,i);
                if(p !== null){
                    p.next = c;
                }
                else {
                    h = c;
                }
                p = c;
            }
            return h;
        }
        function traverse(h){
            var c = h;
            while(c !== null){
                console.log("LL traverse: "+c.key+","+c.value);
                c = c.next;
            }
            return h;
        }
        function reverse(h){
            var c = h,
                p = null,
                n = null;
            while(c.next !== null){
                n = c.next;
                c.next = p;
                p = c;
                c = n;
            }
            c.next = p;
            h = c;
            return h;
        }
        function reverse1(h){
            var c = h,
                n = null, 
                p = null;
            while(c !== null){
                n = c.next;
                c.next = p;
                p = c;
                h = c;
                c = n;
            }
            return h;
        }
        function test(){
            var h = null;
            console.log("LL init");
            h = init(h);
            console.log("LL traverse");
            h = traverse(h);
            console.log("LL reverse");
            h = reverse(h);
            console.log("LL traverse");
            h = traverse(h);
            console.log("LL reverse1");
            h = reverse1(h);
            console.log("LL traverse");
            h = traverse(h);
        }
        test();
    }
    function mSort(){
        var a = [10,23,1,56,77,22,3,44,23,65,10,19,18,34,35,45,29];
        algos.mergeSort(a);
    }
    function rotateTest(){
        var a = [];
        a     = [0,1,2,3,4,5,6,7];
        console.log("----------------------------------");
        console.log("rotateTest:                " + a);
        algos.rotate(a, 0, 1, 0);
        console.log("rotateTest: (r,1,0):       " + a);
        algos.rotate(a, 0, 1, 0);
        console.log("rotateTest: (r,1,0):       " + a);
        algos.rotate(a, 1, 1, 0);
        console.log("rotateTest: (l,1,0):       " + a);
        algos.rotate(a, 1, 1, 0);
        console.log("rotateTest: (l,1,0):       " + a);
        algos.rotate(a, 1, 3, 0);
        console.log("rotateTest: (l,3,0):       " + a);
        algos.rotate(a, 0, 3, 0);
        console.log("rotateTest: (r,3,0):       " + a);
        console.log("----------------------------------");
        algos.rotate(a, 0, 1, 1);
        console.log("rotateTest: (r,1,1):       " + a);
        algos.rotate(a, 0, 1, 1);
        console.log("rotateTest: (r,1,1):       " + a);
        console.log("----------------------------------");
        a     = [0,1,2,3,4,5,6,7];
        algos.rotate(a, 0, 1, 2);
        console.log("rotateTest: (r,1,2):       " + a);
        algos.rotate(a, 0, 2, 2);
        console.log("rotateTest: (r,2,2):       " + a);
        console.log("----------------------------------");
    }
    function test(ary){
        //algos.permutations(ary);
        //resetAry();
        //algos.combinations(ary);
        //tRand();
        //tPassVal();
        //tShuffle();
        //tQsort(ary);
        //algos.combinations(a);
        //mSort();
        //algos.mergeSort(ary);
        //reverseSingleLL();
        reverseDoubleLL();
    }
    test(ary);
}
function tMain(){
    var ary = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    GV.DEBUG = 0;
    //ary     = [7,17,18,1,8,20 ,5,13,2,19,14,9,12,6,16,3,15,11,10,4];
    //parent.test("test calling parent test");  // this calls global test
    //tHelloWorld();
    //tVariables();
    //tClass();
    //tFunctions();
    //tRegEx();
    //var res = algos.binarysearch(ary, 0, ary.length-1, 7);
    //console.log("search:"+res);
    algosObj(ary);

}
function SchultzTest(){
function CanvasStuff(){
    this.ctx                = null;
    this.cvs                = null;
    this.div00              = null;
    this.div01              = null;
    this.ary                = null;
    this.font               = null;
    this.numSq              = 0;
    this.numSqPerLine       = 0;
    this.sqSz               = 0;
    this.w                  = 0;
    this.h                  = 0;
    this.pad                = 0;
    this.xTxt               = 0;
    this.yTxt               = 0;
    this.yTxtCtr            = 0;
    this.txtFont            = null;
    this.txtWidth           = 0;
    this.xMouse             = 0;
    this.yMouse             = 0;
    this.cvs_l              = 0;
    this.cvs_r              = 0;
    this.cvs_u              = 0;
    this.cvs_d              = 0;
    this.sqIdx              = -1;
    this.nxtNum             = 1;
    this.enWatch            = true;
    this.watchDiv           = 0;
    this.watchDivCnt        = 0;
    this.ctr                = 0;
    this.buttonPause        = null;
    this.buttonReset        = null;
}
CanvasStuff.prototype.drawBorder = function(){
    var ctx                 = this.ctx;
    var w, h;
    if(ctx !== null){
        w                   = this.w;
        h                   = this.h;
        ctx.clearRect(0,0,w,h);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0,h);
        ctx.stroke();
        ctx.lineTo(w,h);
        ctx.stroke();
        ctx.lineTo(w,0);
        ctx.stroke();
        ctx.lineTo(0,0);
        ctx.stroke();
    }
};
CanvasStuff.prototype.calcSquareSz = function(ix,iy,sq_per_line,padding){
    var minW                = (ix>iy)?iy:ix;
    var numer               = minW - ((sq_per_line+1)*padding);
    var sqSz                = Math.floor(numer/sq_per_line);
    return sqSz;
};
CanvasStuff.prototype.calcTextSz     = function(sqSz,numSq){
    var ctx                 = this.ctx,
        lclFont                 = null,
        sz          = 1,
        max         = sqSz/3,
        stop        = false,
        szO         = ctx.font;
    if(ctx !== null){
        while(stop === false){
            ctx.font    = sz+'pt Arial';
            lclFont     = ctx.measureText(numSq);
            if(lclFont.width < max){
                sz++;
            }
            else {
                stop    = true;
            }
        }
        ctx.font        = szO;
        sz              = sz+'pt Arial';
    }
    return sz;
};
CanvasStuff.prototype.populateNums   = function(aryShuffle){
    this.ary.length         = 0;
    for(var i = 1, x = this.pad, y = this.pad; i <= this.numSq; i++){
        //this.ary.push({i:i,x:x,y:y});
        this.ary.push({i:aryShuffle[i-1],x:x,y:y});
        if(i % this.numSqPerLine === 0){
            x       = this.pad;
            y       = y + this.sqSz + this.pad;
        }
        else {
            x       = x + this.sqSz + this.pad;
        }
    }
};
CanvasStuff.prototype.drawSquare   = function(ctx,txt,font,color,x,y,sz){
    ctx.save();
    ctx.fillStyle       = color;
    ctx.beginPath();
    ctx.fillRect(x,y,sz,sz);
    ctx.strokeStyle     = 'black';
    ctx.fillStyle       = 'black';
    ctx.textAlign       = 'center';
    ctx.font            = font;
    var xTxt            = x+(sz/2);
    var yTxt            = y+(sz*3/5);
    ctx.fillText(txt,xTxt,yTxt);
    ctx.restore();
};
CanvasStuff.prototype.drawNumbers = function(){
    var ctx         = this.ctx;    
    var i,x,y,num;
    for(i=0;i<this.numSq;i++){
        num         = this.ary[i].i;
        x           = this.ary[i].x;
        y           = this.ary[i].y;
        this.drawSquare(ctx,num,this.font,'gray',x,y,this.sqSz);
    }
};
CanvasStuff.prototype.randomGen     = function(isInt, numReturns, min, max, printNumbers){
    var ary               = [];
    var tmp;
    for(var i = 0; i < numReturns; i++){
        tmp               = Math.random();
        if(isInt === 1){
            tmp           = tmp * (max - min) + min;
            ary[i]        = Math.floor(tmp);
        }
        else {
            ary[i]        = tmp;
        }
    }
    if(printNumbers === 1){
        console.log("randomGen: isInt:"+isInt+", numReturns:"+numReturns+", min:"+min+", max:"+max);
        for(var i = 0; i < numReturns; i++){
            console.log("randomGen["+i+"]="+ary[i]);
        }
    }
    return ary;
};
CanvasStuff.prototype.random          = function(lo,hi){
    var i = Math.floor(Math.random() * (hi-lo)) + lo;
    return i;
};
CanvasStuff.prototype.swap          = function(a,i,j){
    var tmp                 = a[j];
    a[j]                    = a[i];
    a[i]                    = tmp;
};
CanvasStuff.prototype.shuffle      = function(ary){
    var used                = [];
    var i,j,r,found,
        max                 = ary.length-1,
        stop                = 0;
    for(i=0; i < ary.length; i++){
        used[i]             = 0;
    }
    for(i=0; i<ary.length && stop === 0; i++){
        found               = 0;
        while(found === 0 && used[i] === 0){
            r               = this.random(i,max);
            if(used[r] === 0){
                found       = 1;
                this.swap(ary,i,r);
                used[i]     = 1;
                used[r]     = 1;
            }
        }
    }
};
CanvasStuff.prototype.stopWatch = function(){
    var ctx                 = cvs.ctx;
    var x                   = cvs.xTxt;
    var y                   = cvs.yTxtCtr;
    var w                   = cvs.txtWidth;
    var h                   = 100;
    var xTxt                = x;
    var yTxt                = y+h*3/4;
    var yTxtNext            = y+h/4;
    if(cvs.enWatch === true){
        if(cvs.watchDivCnt === cvs.watchDiv){
            cvs.watchDivCnt = 0;
            cvs.ctr++;
        }
        else {
            cvs.watchDivCnt++;
        }
        ctx.save();
        ctx.fillStyle       = 'white';
        ctx.rect(x,y,w,h);
        ctx.clip();
        ctx.clearRect(x,y,w,h);
        ctx.fillRect(x,y,w,h);
        ctx.fillStyle       = 'black';
        ctx.font            = cvs.txtFont;
        ctx.fillText('Next Number: '+cvs.nxtNum,xTxt,yTxtNext);
        ctx.fillText('Seconds:     '+cvs.ctr,xTxt,yTxt);
        ctx.restore();
        //console.log('stopWatch:'+cvs.ctr+' x/y:'+x+'/'+y+' width:'+w);
    }
};
CanvasStuff.prototype.buttonClickProcess    = function(e){
    //console.log('buttonClickProcess '+e.srcElement.id+', '+e.srcElement.value);
    if(e.srcElement.id === 'bPause'){
        if(e.srcElement.value === 'Pause'){
            cvs.buttonPause.setAttribute('value','Play');
            //e.srcElement.value  = 'Play';
            cvs.enWatch     = false;
        }
        else {
            cvs.buttonPause.setAttribute('value','Pause');
            //e.srcElememt.value  = 'Pause';
            cvs.enWatch     = true;
        }
    }
    else if(e.srcElement.id === 'bReset'){
        cvs.drawBoard();
        cvs.ctr             = 0;
        cvs.watchDivCnt     = 0;
        cvs.nxtNum          = 1;
        cvs.enWatch         = true;
    }
};
CanvasStuff.prototype.drawBoard = function(){
    var ary                 = [];
    for(var i=0; i < this.numSq; i++){
        ary[i]              = i+1;
    }
    this.shuffle(ary);
    this.populateNums(ary);
    this.drawBorder();
    this.drawNumbers();    
};
CanvasStuff.prototype.init   = function(cvs_x, cvs_y, sq_per_line,padding){
    this.div00              = document.getElementById('div00');
    this.div01              = document.getElementById('div01');
    this.numSq              = Math.pow(sq_per_line,2);
    this.ary                = new Array();
    this.cvs                = document.createElement('canvas');
    this.cvs.width          = cvs_x;
    this.cvs.height         = cvs_y;
    this.cvs_l              = 0;
    this.cvs_r              = cvs_x;
    this.cvs_u              = 0;
    this.cvs_d              = cvs_y;
    this.numSqPerLine       = sq_per_line;
    this.w                  = cvs_x;
    this.h                  = cvs_y;
    this.pad                = padding;
    this.sqSz               = this.calcSquareSz(cvs_x,cvs_y,sq_per_line,padding);
    this.ctx                = this.cvs.getContext('2d');
    this.div00.appendChild(this.cvs);
    this.buttonPause        = document.createElement('input');
    this.buttonReset        = document.createElement('input');
    this.buttonPause.setAttribute('type','button');
    this.buttonPause.setAttribute('id','bPause');
    this.buttonPause.setAttribute('value','Pause');
    this.buttonReset.setAttribute('type','button');
    this.buttonReset.setAttribute('id','bReset');
    this.buttonReset.setAttribute('value','Reset');
    this.buttonPause.onclick = this.buttonClickProcess;
    this.buttonReset.onclick = this.buttonClickProcess;
    this.div01.appendChild(this.buttonPause);
    this.div01.appendChild(this.buttonReset);
    this.font               = this.calcTextSz(this.sqSz,this.numSq);
    this.xTxt               = Math.floor(cvs_x*0.6);
    this.yTxt               = Math.floor(cvs_y*0.4);
    this.yTxtCtr            = Math.floor(cvs_y*0.2);
    this.txtFont            = '20pt Arial';
    this.enWatch            = true;
    this.watchDiv           = 10;
    this.watchDivCnt        = 0;
    this.txtWidth           = (cvs_x - 20) - this.xTxt;
    if(this.txtWidth < 0){
        this.txtWidth       = 100;
    }
    this.drawBoard();
};
CanvasStuff.prototype.getCoords = function(e){
    if( (e.pageX >= this.cvs_l && e.pageX <= this.cvs_r) &&
        (e.pageY >= this.cvs_u && e.pageY <= this.cvs_d)){
        return {x:(e.pageX-this.cvs_l), y:(e.pageY-this.cvs_u)};
    }
    return {x:-1,y:-1};
};
CanvasStuff.prototype.getAryIdx = function(coord){
    var x                   = coord.x - (coord.x % (this.sqSz+this.pad));
    var y                   = coord.y - (coord.y % (this.sqSz+this.pad));
    var xIdx                = x/(this.sqSz+this.pad);
    var yIdx                = y/(this.sqSz+this.pad);
    var idx                 = yIdx*this.numSqPerLine+xIdx;

    //console.log('getAryIdx: coord('+coord.x+'/'+coord.y+') xy('+x+'/'+y+') idx('+xIdx+'/'+yIdx+')');
    
    if( (this.ary[idx].x+this.pad <= coord.x) && ((this.ary[idx].x+this.pad+this.sqSz) >= coord.x) &&
        (this.ary[idx].y+this.pad <= coord.y) && ((this.ary[idx].y+this.pad+this.sqSz) >= coord.y))
    {
        return idx;
    }
    return -1;
};
CanvasStuff.prototype.mouseDownProcess = function(e){
    var coord               = cvs.getCoords(e);
    var idx                 = cvs.getAryIdx(coord);
    if(idx !== -1){
        cvs.xMouse          = coord.x;
        cvs.yMouse          = coord.y;        
        cvs.sqIdx           = idx;
        if(cvs.nxtNum === cvs.ary[idx].i){
            cvs.drawSquare(cvs.ctx,cvs.ary[idx].i,cvs.font,'green',cvs.ary[idx].x,cvs.ary[idx].y,cvs.sqSz);
            if(cvs.nxtNum === cvs.numSq){
                cvs.enWatch = false;
                cvs.drawSquare(cvs.ctx,cvs.ary[cvs.sqIdx].i,cvs.font,'gray',cvs.ary[cvs.sqIdx].x,cvs.ary[cvs.sqIdx].y,cvs.sqSz);
                cvs.sqIdx           = -1;
                alert('Completed in '+cvs.ctr+' seconds.');
            }
            else {
                cvs.nxtNum++;
            }
        }
        else {
            cvs.drawSquare(cvs.ctx,cvs.ary[idx].i,cvs.font,'red',cvs.ary[idx].x,cvs.ary[idx].y,cvs.sqSz);            
        }
        //console.log('mouseDownProcess: valid idx:'+idx);
    }
};
CanvasStuff.prototype.mouseUpProcess    = function(e){
    //console.log('mouseUpProcess: xy('+cvs.xMouse+'/'+cvs.yMouse+')');    
    if(cvs.sqIdx !== -1){
        cvs.drawSquare(cvs.ctx,cvs.ary[cvs.sqIdx].i,cvs.font,'gray',cvs.ary[cvs.sqIdx].x,cvs.ary[cvs.sqIdx].y,cvs.sqSz);
        cvs.sqIdx           = -1;
    }
};
function schultzTest(){
    cvs.init(2*500,500,5,10);
    window.onmousedown  = cvs.mouseDownProcess;
    window.onmouseup    = cvs.mouseUpProcess;
    window.setInterval(cvs.stopWatch, 100);
}
var cvs                 = new CanvasStuff();
schultzTest();
}
function equitiesStart(){
    function CVSObj(){
        
    }
    CVSObj.prototype.init = function(){
        
    };
}
function fileTest(){
    function eReadFile(e){
        console.log('fileTest:'+this.file.name+'\n'+e.target.result);
    }
    function eError(e){
        console.log('eError:'+e.target.error.code);
    }
    function fileTest(file){
        if(window.File && window.FileReader && window.FileList && window.Blob){
            var reader = new FileReader();
            reader.readAsText(file);
            reader.file = file;
            reader.onload = eReadFile;
            reader.onerror = eError;
        }
        else {
            alert('fileTest File is\'nt suported in this browser');
        }
    }
    function fileHandle(e){
        var finput = document.getElementById('form00');
        var files = e.target.files;
        for(var i = 0; i < files.length; i++){
            fileTest(files[i]);
        }
    }
    function createForms(){
        var finput = document.createElement('input');
        finput.setAttribute('type','file');
        finput.setAttribute('id','form00');
        finput.setAttribute('name','files');
        finput.setAttribute('multiple','');
        finput.onchange = fileHandle;
        var div = document.getElementById('div00');
        div.appendChild(finput);
    }
    createForms();
}
function InputTest(){
    // this is to illustrate buttons, slides, drop downs, etc on canvas interaction
    function CVSObj(){
        this.ctx = null;
        this.cvs = null;
        this.div = null;
        this.div01 = null;
        this.button0 = null;
        this.button1 = null;
        this.slide = null;
        this.dropdown = null;
        this.checkbox = null;
        this.checkboxlabel = null;
        this.textinput = null;
        this.textbox = null;
        this.filetext = null;
        this.fileload = null;
        this.table = null;
        this.form = null;
        this.divtable = null;
        this.w = 0;
        this.h = 0;
        this.processButton = function(e){
            this.printTableMsg('processButton:'+e.srcElement.id+','+e.srcElement.value);
        };
        this.processSlide = function(e){
            this.printTableMsg('processSlide:'+e.srcElement.id+','+e.srcElement.value);
        };
        this.processDropDown = function(e){
            this.printTableMsg('dropDown:'+e.srcElement.id+','+e.srcElement.value);
        };
        this.processCheckBox = function(e){
            this.printTableMsg('processCheckBox:'+e.srcElement.id+','+(e.srcElement.checked ? 'checked':'not checked'));
        };
        this.processTextInput = function(e){
            this.printTableMsg('processTextInput:'+e.srcElement.id+': '+(document.getElementById(e.srcElement.id)).value);
        };
        this.processTextBox = function(e){
            this.printTableMsg('processTextBox:'+e.srcElement.id+': '+(document.getElementById(e.srcElement.id)).value);
        };
        this.processFileLoad = function(e){
            var finput = document.getElementById(e.srcElement.id);
            var files = e.target.files;
            console.log('processFileLoad:'+e.srcElement.id);
            for(var i = 0; i < files.length; i++){
                this.filetext.setAttribute('value',files[i].name);
//            fileTest(files[i]);
            }
        };
        this.processTable = function(e){
        
        };
        this.printTableMsg = function(msg){
            document.getElementById(this.divtable.id).innerHTML = msg;
        };
    }
    CVSObj.prototype.init = function(){
        this.w = 500;
        this.h = 300;
        this.div = document.getElementById('div00');
        this.div01 = document.getElementById('div01');
        this.cvs = document.createElement('canvas');
        this.ctx = this.cvs.getContext('2d');
        this.cvs.width = this.w;
        this.cvs.height = this.h;
        this.div.appendChild(this.cvs);
        this.createInputs();
        this.drawBorder();
    };
    CVSObj.prototype.createInputs = function(){
        this.button0 = document.createElement('input');
        this.button0.setAttribute('type','button');
        this.button0.setAttribute('id','button0');
        this.button0.setAttribute('value','Button 0');
        this.button0.onclick = this.processButton.bind(this);
        this.div01.appendChild(this.button0);

        this.button1 = document.createElement('input');
        this.button1.setAttribute('type','button');
        this.button1.setAttribute('id','button1');
        this.button1.setAttribute('value','Update');
        this.button1.onclick = this.processButton.bind(this);
        this.div01.appendChild(this.button1);

        this.slide = document.createElement('input');
        this.slide.setAttribute('type','range');
        this.slide.setAttribute('min','0');
        this.slide.setAttribute('max','100');
        this.slide.setAttribute('step','1');
        this.slide.setAttribute('value','50');
        this.slide.setAttribute('id','slide1');
        this.slide.onchange = this.processSlide.bind(this);
        this.div01.appendChild(this.slide);
        
        this.checkbox = document.createElement('input');
        this.checkbox.setAttribute('type','checkbox');
        this.checkbox.setAttribute('value','yesno');
        this.checkbox.setAttribute('id','checbox1');
        this.checkbox.setAttribute('label','yes or no');
        this.checkbox.onchange = this.processCheckBox.bind(this);
        this.div01.appendChild(this.checkbox);

        this.div01.appendChild(document.createElement('br'));

        this.textinput = document.createElement('input');
        this.textinput.setAttribute('type','text');
        this.textinput.setAttribute('id','textinput');
        this.textinput.setAttribute('size','40');
        this.textinput.onchange = this.processTextInput.bind(this);
        this.div01.appendChild(this.textinput);
        
        this.filetext = document.createElement('input');
        this.filetext.setAttribute('type','text');
        this.filetext.setAttribute('id','filetext');
        this.filetext.setAttribute('size','30');
        this.div01.appendChild(this.filetext);

        this.fileload = document.createElement('input');
        this.fileload.setAttribute('type','file');
        this.fileload.setAttribute('id','file');
        this.fileload.setAttribute('name','files');
        this.fileload.setAttribute('multiple','');
        this.fileload.onchange = this.processFileLoad.bind(this);
        this.div01.appendChild(this.fileload);

        this.dropdown = document.createElement('select');
        this.dropdown.setAttribute('type','select');
        this.dropdown.setAttribute('id','dropdown0');
        this.dropdown.onchange = this.processDropDown.bind(this);
        var ddAry = new Array();
        for(var i = 0; i < 10; i++){
            ddAry.push(new Option('option'+i, 'value '+i, false, false));
        }
        for(var i in ddAry){
            this.dropdown.appendChild(ddAry[i]);
        }
        this.div01.appendChild(this.dropdown);

        this.div01.appendChild(document.createElement('br'));

        this.textbox = document.createElement('textarea');
        this.textbox.setAttribute('id','textbox');
        this.textbox.setAttribute('cols','60');
        this.textbox.setAttribute('rows','5');
        this.textbox.setAttribute('wrap','hard');
        this.textbox.onchange = this.processTextBox.bind(this);
        this.div01.appendChild(this.textbox);
        
        this.divtable = document.createElement('div');
        this.divtable.setAttribute('id','divtable');
        this.div01.appendChild(this.divtable);
//        document.body.appendChild(this.divtable);
        
//        this.form = document.createElement('');        
    };
    CVSObj.prototype.processForm = function(e){
        
    };
    CVSObj.prototype.drawBorder = function(){
        if(this.ctx !== null){
            this.ctx.clearRect(0,0,this.w,this.h);
            this.ctx.strokeStyle = 'black';
            this.ctx.lineWidth = 1;
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(0,0,this.w,this.h);
            this.ctx.beginPath();
            this.ctx.moveTo(0,0);
            this.ctx.lineTo(0,this.h);
            this.ctx.stroke();
            this.ctx.lineTo(this.w,this.h);
            this.ctx.stroke();
            this.ctx.lineTo(this.w,0);
            this.ctx.stroke();
            this.ctx.lineTo(0,0);
            this.ctx.stroke();
        }
        else {
            alert('CVSObj drawBorder null');
        }
    };
    CVSObj.prototype.drawInputs = function(){
        
    };
    function test(){
        var cvsobj = new CVSObj();
        cvsobj.init();
    }
    test();
}
//--------------------------------------------------------------------------------------------------------
function Algorithms(){
    function AlgorithmClasses(){
        
    }
    function TestCases(){
        this.algos = null;
        function init(){
            
        }
    }
    function test(){
        var tc = new TestCases();
    }
    test();
}
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------

function mainTest(){
    //InputTest();
    //equitiesStart();
    //SchultzTest();
    //fileTest();
    tRegEx();
}

window.onload = mainTest;

