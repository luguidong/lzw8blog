const install = function(Vue){
    const CookieSet = new Vue({
        methods:{
            setCookie:function(cname,cvalue,extime){//extime:s
                var d = new Date();
                d.setTime(d.getTime()+extime*1000);
                var expires = 'expires='+d.toUTCString;
                console.info(cname+'='+cvalue+':' + expires);
                document.cookie = cname+"="+cvalue + ";"+expires;
                console.info(document.cookie);
            }
        },
        getCookie:(cname)=>{
            var name = cname+'=';
            var ca = document.cookie.split(';');
            let length = ca.length;
            for (var i = 0;i<length;i++){
                var c = ca[i];
                while(c.charAt(0) == ' ')c=c.substring(1);
                if(c.indexOf(name) != -1)return c.substring(name.length,c.length);
            }
            return "";
        },
        clearCookie:(name)=>{
            this.setCookie(name,"",-1);
        }
    })
    Vue.prototype.$cookieSet = CookieSet;
}

export default install;