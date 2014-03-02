/*
var __nativeST__    = window.setTimeout;
window.setTimeout   = function(vCallback, nDelay){
    var oThis       = this,
        aArgs       = Array.prototype.slice.call(arguments, 2);
    return __nativeST__(
        vCallback instanceof Function ? 
            function(){
                vCallback.apply(oThis, aArgs); 
            } :
            vCallback, nDelay
    );
};
*/
function AlgorithmsGraph(){
    function CVS(){
        this.w          = 0;
        this.h          = 0;
        this.scale      = 0;
        this.cvs        = null;
        this.ctx        = null;
        this.button     = null;
        this.range      = null;
        this.textin     = null;
        this.depth      = 0;
        this.numBalls   = 0;
        this.div0       = null;
        this.div1       = null;
        this.div2       = null;
        this.div3       = null;
        this.graph      = null;
        this.init                   = function(){
            this.setDefaults();
            this.setDefaultElements();
            this.drawBorder();
        };
        this.drawBorder             = function(){
            if(this.cvs === null){
                return;
            }
            this.ctx.save();
            this.ctx.clearRect(0,0,this.w,this.h);
            this.ctx.strokeStyle    = 'black';
            this.ctx.lineWidth      = 1;
            this.ctx.fillStyle      = 'white';
            this.ctx.fillRect(0,0,this.w,this.h);
            this.ctx.beginPath();
            this.ctx.moveTo(0,0);
            this.ctx.lineTo(0,this.h);
            this.ctx.lineTo(this.w,this.h);
            this.ctx.lineTo(this.w,0);
            this.ctx.lineTo(0,0);
            this.ctx.stroke();
            this.ctx.restore();
        };
        this.setDefaults            = function(){
            if(this.w === 0 || this.h === 0){
                this.w      = 500;
                this.h      = 300;
                this.scale  = 1;
            }            
            if(this.cvs !== null){
                this.cvs.width  = this.w;
                this.cvs.height = this.h;
            }
        };
        this.setDefaultElements     = function(){
            if(this.cvs !== null){
                return;
            }
            
            this.div0   = document.getElementById('div00');

            this.div1   = document.createElement('div');
            this.div1.setAttribute('id','div1');
            this.div0.appendChild(this.div1);

            this.div2   = document.createElement('div');
            this.div2.setAttribute('id','div2');
            this.div0.appendChild(this.div2);

            this.div3   = document.createElement('div');
            this.div3.setAttribute('id','div3');
            this.div0.appendChild(this.div3);

            this.cvs        = document.createElement('canvas');
            this.cvs.width  = this.w;
            this.cvs.height = this.h;
            this.ctx        = this.cvs.getContext('2d');            
            this.div1.appendChild(this.cvs);

            this.textin = document.createElement('input');
            this.textin.setAttribute('id','textin');
            this.textin.setAttribute('type','textinput');
            this.textin.setAttribute('size','10');
            this.textin.onchange    = this.processTextIn.bind(this);
            this.div2.appendChild(this.textin);
            
            this.range  = document.createElement('input');
            this.range.setAttribute('type','range');
            this.range.setAttribute('min','1');
            this.range.setAttribute('max','10');
            this.range.setAttribute('step','1');
            this.range.setAttribute('value','1');
            this.range.setAttribute('id','range');
            this.range.onchange     = this.processRange.bind(this);
            this.div2.appendChild(this.range);

            this.button = document.createElement('input');
            this.button.setAttribute('id','button');
            this.button.setAttribute('type','button');
            this.button.setAttribute('value','Reset');
            this.button.onclick     = this.processButton.bind(this);
            this.div2.appendChild(this.button);
        };
        this.setWHScale             = function(w, h, v){
            this.w          = w;
            this.h          = h;
            this.scale      = v;
            this.init();
        };
        this.processTextIn          = function(e){
            
        };
        this.processButton          = function(e){
            
        };
        this.processRange           = function(e){
            this.depth              = e.srcElement.value;
            this.numBalls           = Math.pow(2,this.depth) - 1;
            if(this.div3 !== null){
                var msg             = 'processRange:'+this.depth+','+this.numBalls+'<br>';
                document.getElementById(this.div3.id).innerHTML = msg;
            }
            if(this.graph !== null){
                this.graph.tDrawBinTree(this.depth,this.numBalls);
            }
        };
        this.calculateCircleCoords  = function(depth,numBalls){
            var ary                 = new Array();
            
        };
        this.setGraph               = function(graph){
            this.graph              = graph;
        };
        this.getCTX                 = function(){
            return this.ctx;
        };
        this.getScale               = function(){ return this.scale; };
        this.setScale               = function(v){ this.scale   = v; };
        this.init();
    }
    function Graph(){
        this.CVS    = null;
        this.ctx    = null;
        this.scale  = 0;
        this.x      = 0;
        this.y      = 0;
        this.xMin   = 0;
        this.xMax   = 0;
        this.yMin   = 0;
        this.yMax   = 0;
        this.xyRatio    = 0;
        this.radius = 0;
        this.depth  = 0;
        this.wBar   = 0;
        this.yInc   = 0;
        this.sBar   = 0;
        this.ptPad  = 0;
        this.timer  = 0;
        this.aryQ   = null;
        this.init           = function(){
            if(this.CVS === null){
                return;
            }
            if(this.ptPad === 0){
                this.ptPad  = 0.05;
            }
            this.ctx        = this.CVS.getCTX();
            this.scale      = this.CVS.getScale();
            this.x          = this.CVS.w;
            this.y          = this.CVS.h;
            this.xMin       = this.x * this.ptPad;
            this.xMax       = this.x - this.xMin;
            this.yMin       = this.y * this.ptPad;
            this.yMax       = this.y - this.yMin;
            this.xyRatio    = (this.xMax - this.xMin) / (this.yMax - this.yMin);
            this.timer      = 0;
            this.aryQ       = new Array();
        };
        this.setCVS         = function(cvsObj){
            this.CVS        = cvsObj;
            this.init();
        };
        this.setPad         = function(percentPad){
            this.ptPad      = percentPad;
            this.init();
        };
        this.calcBarSz      = function(arySz, minY, maxY){
            var numCols     = arySz * 2 - 1;
            if(minY > maxY){
                alert('minY('+minY+') > maxY('+maxY+')');
                return -1;
            }
            this.wBar       = (this.xMax - this.xMin) / numCols;
            this.sBar       = this.wBar;
            this.yInc       = (this.yMax - this.yMin) / (maxY - minY);
            return 0;
        };
        this.calcRadiusSz   = function(depth,numBalls){
            var ballsBottom = Math.pow(2,depth-1);
            if(this.xyRatio > 1){
                this.sRadius    = (this.xMax - this.xMin) / (4 * ballsBottom);                
            }
            else {
                this.sRadius    = (this.yMax - this.yMin) / (4 * ballsBottom);
            }
            this.radius     = sRadius;
        };
        this.findMinMax     = function(ary){
            var min         = 0,
                max         = 0,
                i           = 0;
            for(i in ary){
                if      (ary[i] > max){
                    max     = ary[i];
                }
                else if (ary[i] < min){
                    min     = ary[i];
                }
            }
            return {min:min,max:max};
        };
        this.tDrawBinTree   = function(depth,numBalls){
            this.ctx.drawBorder();
            this.calcRadiusSz(depth,numBalls);
        };
        this.drawBarAry     = function(ary,swapA,swapB){
            var res         = this.findMinMax(ary);
            var min         = res.min,
                max         = res.max;
            var aCopy       = new Array();
            for(var i in ary){ 
                aCopy.push(ary[i]);
            }
            aryQ.push(aCopy);
            //console.log('min,max='+min+','+max);
            this.calcBarSz(ary.length, min, max);
            if(this.CVS === null){ return; }
            var x           = this.xMin, 
                y           = this.yMax, 
                i           = 0,
                xVal, yVal;
            window.setTimeout(this.drawBarAryLoop,this.timer,aryQ.shift(),swapA,swapB,this.ctx,x,y,this.wBar,this.sBar,this.yInc,this);
            //this.drawBarAryLoop(aryQ.shift(),this.ctx,x,y,this.wBar,this.sBar,this.yInc,this);
            this.timer      += 50;
        };
        this.drawBarAryLoop = function(a,swapA,swapB,ctx,x,y,wBar,sBar,yInc,that){
            var i, xVal, yVal;
            that.CVS.drawBorder();
            ctx.save();
            //for(i in a){ // this doesn't work for i === swapA because i == "1" and swapA == 1
            for(i = 0; i < a.length; i++){
                if      (i === swapA){
                    ctx.fillStyle   = 'red';
                }
                else if (i === swapB){
                    ctx.fillStyle   = 'green';
                }
                else {
                    ctx.fillStyle   = 'blue';
                }
                xVal        = x + wBar;
                yVal        = a[i] * yInc;
                ctx.fillRect(x,y,wBar,-yVal);
                x           += wBar + sBar;
            }
            ctx.restore();
        };
        this.init();
    }
    function Algos(){
        this.graph          = null;
        this.aryQ           = null;
        this.init           = function(){
            aryQ            = new Array();
        };
        this.pushAryToQ     = function(a){
            
        };
        this.getAryFIFOQ    = function(){
            
        };
        this.setGraph       = function(graph){
            this.graph      = graph;
        };
        this.random         = function(lo, hi){
            var i           = Math.floor(Math.random() * (hi-lo)) + lo;
            return i;
        };
        this.swap           = function(a, i, j){
            var tmp         = a[j];
            a[j]            = a[i];
            a[i]            = tmp;
        };
        this.rotate         = function(a, rot_left, rot_offset){
            var tmp;
            for(var rot_i = 0; rot_i < rot_offset; rot_i++){
                tmp = (rot_left === 1) ? (a[0]) : (a[a.length-1]);
                if(rot_left === 1){
                    for(var i = 0; i < a.length; i++){
                        if(i === (a.length-1)){
                            a[i] = tmp;
                        }
                        else {
                            a[i] = a[i+1];
                        }
                    }
                }  
                else {
                    for(var i = a.length-1; i >= 0; i--){
                        if(i === 0){
                            a[i] = tmp;
                        }
                        else {
                            a[i] = a[i-1];
                        }
                    }
                }
            }
        };
        this.shuffle        = function(a){
            var used = [];
            var i, j, r, found, max = (a.length-1);
            for(i = 0; i < a.length; i++){
                used[i] = 0;
            }
            for(i = 0; i < a.length; i++){
                found = 0;
                while(found === 0 && used[i] === 0){
                    r = this.random(i, max);
                    if(used[r] === 0){
                        found = 1;
                        this.swap(a,i,r);
                        used[i] = 1;
                        used[r] = 1;
                    }
                }
            }
        };
        this.genRandList    = function(lo,hi,sz,isUnique){
            var a           = new Array();
            var h           = [];
            var hExists     = 0;
            var val         = 0;
            if(((hi-lo+1) < sz)&&(isUnique === true)){
                alert('hi-lo < sz');
                return 0;
            }
            for(var i = 0; i < sz; i++){
                hExists     = 0;
                while(hExists === 0){
                    val     = this.random(lo,hi);
                    if(isUnique === true){
                        if(h[val] !== 1){
                            h[val]  = 1;
                            hExists = 1;
                            a.push(val);
                        }
                    }
                    else {
                        hExists     = 1;
                        a.push(val);
                    }
                }
            }
            return a;
        };
        this.genLinList     = function(lo,sz){
            var a       = new Array();
            for(var i = 0; i < sz; i++){
                a.push(lo+i);
            }
            return a;
        };
        this.init();
    }
    function test(){
        var cvs     = new CVS();
        var graph   = new Graph();
        var algos   = new Algos();
        function init(){
            cvs.setWHScale(800,300,1);
            graph.setCVS(cvs);
            algos.setGraph(graph);
        }
        function test0(){
            var a       = new Array();
            a           = algos.genLinList(1,10);
            algos.shuffle(a);
            a           = algos.genRandList(10,1000,200,true);
        }
        function testMain(){
            init();
            test0();
        }
        testMain();
        
    }
    test();
}
function mainTest(){
    var algosGraph  = new AlgorithmsGraph(); 
}
window.onload = mainTest;