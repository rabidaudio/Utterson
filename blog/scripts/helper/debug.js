
define(function(){
    if(Utterson.DEV){
        return console.log.bind(console);
    }else{
        return new Function();//no-op
    }
});
