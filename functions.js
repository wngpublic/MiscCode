//---------------------------------------------------------------
var v0 = function(letter){
    function v0f0(){
        var l0 = a + b;
        //var l0 = this.a + this.b; // this doesn't exist. why?
        return l0;
    }
    var a    = 5,
        b    = 2;
    var c    = {
        d    : 3,
        e    : function(){
            document.write("v0:c:e()");
        },
        f    : function(v1, v2){
            document.write("v0:c:f() return a");
            //return this.a;
            return a;
        },
        g    : v0f0()
    };
    return c.g; // c.g === v0f0()

    // none of the following returns seem to work
    if(letter === "e"){ return c.e; }
    if(letter === "f"){ return c.f; }
    return c.f; // c.g === v0f0()
};
document.write("*************************************<br>");
document.write("calling a function<br>");
document.write("v0                = " + v0 + "<br>");
document.write("v0()              = " + v0() + "<br>");
//document.write("v0("e")           = " + v0("e") + "<br>");
//document.write("v0("f")           = " + v0("f") + "<br>");
//---------------------------------------------------------------
var v1a = 1,
    v1b = 3,
    v1c = 5;
document.write("*************************************<br>");
document.write("v1b               = " + v1b + "<br>");
//---------------------------------------------------------------
function a_plus_b(a, b){
    return (a+b);
}
document.write("*************************************<br>");
document.write("simple function<br>");
document.write("a_plus_b(10,20)   = " + a_plus_b(10, 20) + "<br>");
//---------------------------------------------------------------
var v2a = {
    a   : 3,
    b   : 4,
    c   : function(){
        return "Hello";
    },
    d   : function(){
        var res = this.a + this.b;
        return ("a + b = " + res);
    },
    e   : function(v0, v1){
        return (v0+v1);
    }
};
document.write("*************************************<br>");
document.write("v2a.a             = " + v2a.a + "<br>");
document.write("v2a.c             = " + v2a.c() + "<br>");
document.write("v2a.d             = " + v2a.d() + "<br>");
document.write("v2a.e(1,2)        = " + v2a.e(1,2) + "<br>");
//---------------------------------------------------------------
var v3a = function(a){
    var b = a;
    var c = 1;
    function times10(){
        c = 10 * b * c;
        return b;
    }
    return times10();
}
document.write("*************************************<br>");
document.write("anonymous function assigned to var<br>");
document.write("v3a(5) returns *10 = " + v3a(5) + "<br>");
document.write("v3a(5) returns *10 = " + v3a(5) + "<br>");
//---------------------------------------------------------------
var v4a = {
    a   : 1,
    add : function(x){
        this.a = this.a + x;
    },
    inc : function(x){
        this.add(x);
        return this.a;
    }
}
document.write("*************************************<br>");
document.write("state preservation<br>");
document.write("v4a.inc(1)         = " + v4a.inc(1) + "<br>");
document.write("v4a.inc(1)         = " + v4a.inc(1) + "<br>");
document.write("v4a.inc(1)         = " + v4a.inc(1) + "<br>");
//---------------------------------------------------------------
function factorial(n){
    if((!(n in factorial)) && (n > 1)){
        factorial[n] = n * factorial(n-1);
        return factorial[n];
    }
}
factorial[1] = 1;
function print_factorial(n){
    factorial(n);
    for(var i = n; i > 0; i--){
        document.write("factorial[" + i + "] = " + factorial[i] + "<br>");
    }
}
document.write("*************************************<br>");
document.write("array of functions with property preservation<br>");
print_factorial(5);
//---------------------------------------------------------------
var operators = {
    add:            function(x,y){ return x+y; },
    sub:            function(x,y){ return x-y; },
    mul:            function(x,y){ return x*y; },
    div:            function(x,y){ return x/y; }
};
function operate(operation,x,y){ 
    if(typeof operators[operation] === "function"){
        return operators[operation](x,y);
    }
    else {
        throw "unknown operator";
    }
}
var tmp = operate("add",1,2);
document.write("*************************************<br>");
document.write("functions as values<br>");
document.write("operate(\"add\",1,2) = " + tmp + "<br>");
//---------------------------------------------------------------
function fvariable_args(){
    var res = "";
    for(var i = 0; i < fvariable_args.arguments.length; i++){
        res += i + ": " + fvariable_args.arguments[i] + ";<br>";
    }
    return res;
}
document.write("*************************************<br>");
document.write("function with variable number of arguments<br>");
document.write("fvariable_args(1,2,3)   = <br>" + fvariable_args(1,2,3));
document.write("fvariable_args(1,2,3,4) = <br>" + fvariable_args(1,2,3,4));
//---------------------------------------------------------------
function fnest_addtwice(a, b){
    function a_plus_b(c,d){
        return (c+d);
    }
    var res  = 0;
    for(i = 0; i < 2; i++){
        res += a_plus_b(a,b);
    }
    return res;
}
tmp = fnest_addtwice(2,3);
document.write("*************************************<br>");
document.write("nested function calling internal function<br>");
document.write("fnest_addtwice(2,3) = " + tmp + "<br>");
//---------------------------------------------------------------
function fcounter(){
    var n = 0;
    return {
        count: function(){ return n++; },
        reset: function(){ n = 0; return n; }
    };
}
var c = fcounter();
document.write("*************************************<br>");
document.write("state preservation by returning a function<br>");
tmp = c.count();
document.write("c.count()         = " + tmp + "<br>");
tmp = c.count();
document.write("c.count()         = " + tmp + "<br>");
tmp = c.reset();
document.write("c.reset()         = " + tmp + "<br>");
tmp = c.count();
document.write("c.count()         = " + tmp + "<br>");
tmp = c.count();
document.write("c.count()         = " + tmp + "<br>");
//---------------------------------------------------------------
function not(f){
    return function(){
        var res = !f.apply(this, arguments); // calls f
        var str = "not " + f + " ";
        for(var i = 0; i < arguments.length; i++){
            str = str + " " + arguments[i];
        }
        document.write(str + "=" + res + "<br>");
        return res;
    };
}
var feven = function(x){
    return x % 2 === 0;
};
var fodd  = not(feven);
document.write("*************************************<br>");
document.write("a function that operates on functions<br>");
[1,1,3,5,5,6,7].every(fodd);
//---------------------------------------------------------------
function F_a2b(a, b){
    this.a = a;
    this.b = b;
}
F_a2b.prototype = {
    aplusc: function(c){
        this.a += c;
        return this.a;
    },
    aplusb: function(){
        return(this.a+this.b);
    },
    geta: function(){ return this.a; },
    getb: function(){ return this.b; }
};
F_a2b.prototype.add = function(){
    return this.a + this.b;
};
F_a2b.prototype.mul = function(){
    return this.a * this.b;
};
var va2b = new F_a2b(1,2);
var va2c = new F_a2b(7,2);
document.write("*************************************<br>");
document.write("function prototype<br>");
document.write("geta = " + va2b.geta() + "<br>");
document.write("getb = " + va2b.getb() + "<br>");
document.write("aplusc(3) = " + va2b.aplusc(3) + "<br>");
document.write("aplusb()  = " + va2b.aplusb() + "<br>");
document.write("geta()  = " + va2b.geta() + "<br>");
document.write("getb()  = " + va2b.getb() + "<br>");
document.write("add()  = " + va2b.add() + "<br>");
document.write("mul()  = " + va2b.mul() + "<br>");
document.write("va2c mul()  = " + va2c.mul() + "<br>");

//---------------------------------------------------------------
var f_add = function(x,y){ return x+y; };
var f_sub = function(x,y){ return x-y; };
var f_mul = function(x,y){ return x*y; };
var f_div = function(x,y){ return x/y; };
var f_op  = function(op,x,y){
    switch(op){
        case "add": { return f_add(x,y); break; }
        case "sub": { return f_sub(x,y); break; }
        case "mul": { return f_mul(x,y); break; }
        case "div": { return f_div(x,y); break; }
    }
    throw "throwing unknown op";
}
document.write("*************************************<br>");
document.write("Testing function calling functions outside its scope<br>");
document.write("add(2,3) = " + f_op("add",2,3) + "<br>");
//---------------------------------------------------------------
var f_1 = function(){ return 1; };
var f_2 = function(){ return 2; };
var f_3 = function(){ return 3; };
var f_n = function(n){
    switch(n){
        case 1: { return f_1; break; }
        case 2: { return f_2; break; }
        case 3: { return f_3; break; }
    }
    throw "throwing unknown number";
}
document.write("*************************************<br>");
document.write("Testing function calling parameterless functions outside its scope<br>");
document.write("f_2 = " + f_n(2) + "<br>");
//---------------------------------------------------------------
document.write("*************************************<br>");
document.write("create 10 object array<br>");
var o1 = {
    a : 0,
    b : 0,
    c : 0
};
var ary1 = [];
document.write("ary1.length before init is: " + ary1.length + "<br>");
for(var i = 0; i < 10; i++){
    ary1[i] = o1;
    ary1[i].a = i;
    ary1[i].b = i * 2;
    ary1[i].c = i * 4;
}
for(var i = 0; i < ary1.length; i++){
    document.write("ary1[" + i + "].a/b/c = " + ary1[i].a + "," + ary1[i].b + "," + ary1[i].c + "<br>");
}
var o2 = function(){
    var a = 0,
        b = 0,
        c = 0;
};
var ary2 = [];
for(var i = 0; i < 10; i++){
    ary2[i] = new o2;
    ary2[i].a = i;
    ary2[i].b = i * 2;
    ary2[i].c = i * 4;
}
for(var i = 0; i < ary2.length; i++){
    document.write("ary2[" + i + "].a/b/c = " + ary2[i].a + "," + ary2[i].b + "," + ary2[i].c + "<br>");
}
//---------------------------------------------------------------
document.write("*************************************<br>");
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
document.write("*************************************<br>");
document.write("finished<br>");




