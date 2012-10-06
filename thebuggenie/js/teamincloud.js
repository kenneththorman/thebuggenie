// namespaces
var TIC = {
    classes:{},
    init:function(){},
    preinit:function(){},
    objects:[]
};

// Definitions

TIC._run_jQuery_style = function(f){
    f(jQuery);
};

TIC.init = function(){
    for(var i=0;i<TIC.objects.length;i++){
        if('init' in TIC.objects[i]) {
            try{
                TIC.objects[i].init();
            }catch(e){
                
            }
        }
    }
};

// overwrite TBG.initialize in order to call our init and preinit functions

var proxy = TBG.initialize;
TBG.initialize = function(){
    TIC.preinit();
    proxy.apply(TBG,arguments);
    TIC.init();
};
