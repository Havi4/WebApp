const DateUtils = {
    //将2014-03-34 改为2015/11/05
    convertDate(date:string){
        return date.replace(new RegExp('-','g'),'/');
    },

    getCurrentDate (){
        return new Date().FormData('yyyy/MM/dd');
    },

    extendDate(){
        //将date转化为指定格式的string.
        Date.prototype.Format = function(fmt){
            var o = {
                'M+': this.getMonth() +1,//月份
                'd+': this.getDate(),//
                'h+': this.getHours(),
                'm+': this.getMinutes(),
                's+': this.getSeconds(),
                'q+': Math.floor((this.getMonth() +3)/2),
                'S': this.getMilliseconds()
            }

            if(/(y+)/.test(fmt)){
                fmt = fmt.replace(RegExp.$1,(this.getFullYear() + '').substr(4-RegExp.$1.length));
            }

            for (var k in o) {
                if(new RegExp('(' + k + ')').test(fmt)){
                    fmt = fmt.replace(RegExp.$1,(RegExp.$1.length == 1)? (o[k]):(('00' + o[k]).substr(('' +o[k]).length)));
                }
            }
            return fmt;
        }
    }
}

DateUtils.extendDate();

module.exports = DateUtils;