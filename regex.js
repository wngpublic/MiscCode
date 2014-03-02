function isalphanumeric(a){
    if(/[^a-zA-Z0-9]/.test(a)){
        return false;
    }
    return true;
}
function isnumber(a){
    if(/^0-9/.test(a)){
        return false;
    }
    return true;
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
a = "Hello World";
b = "HelloWorld";
c = "WellHello123";
d = "Hello&&";
e = "Hello";

res_a = (isalphanumeric(a)) ? (a + " is alphanumeric<br>") : (a + " is not alphanumeric<br>");
res_b = (isalphanumeric(b)) ? (b + " is alphanumeric<br>") : (b + " is not alphanumeric<br>");
res_c = (isalphanumeric(c)) ? (c + " is alphanumeric<br>") : (c + " is not alphanumeric<br>");
res_z = (hasKeyWord(c, "Hello")) ? (c + " has Keyword Hello<br>") : (c + " does not have KeyWord Hello<br>");
res_y = (hasKeyWord(e, "Hello")) ? (e + " has Keyword Hello<br>") : (e + " does not have KeyWord Hello<br>");
document.write(res_a);
document.write(res_b);
document.write(res_c);
document.write(res_z);
document.write(res_y);

var ssn     = "123-45-6789";
var ssn_pat = /^d{3}-\d{2}-\d{4}$/;
if(ssn.match(ssn_pat)){
    document.write("ssn " + ssn + " is a ssn<br>");
}
else {
    document.write("ssn " + ssn + " is not a ssn<br>");
}













