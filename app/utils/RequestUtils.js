'use strict';
import DateUtils from './DateUtils';

const delay = (ms)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject(new Error('timeout'));
        },ms)
    })
};

const fetchWithTimeout = (timeout,...args) => {
    return Promise.race([fetch(...args),delay(timeout)]);
};

const RequestUtils = {
    API_DATE: 'http://gank.io./api/day/history',
    API_DAILY:'http://gank.io/api/day/',

    getDateArray(){
        return fetchWithTimeout(5000,this.API_DATE).then(response=>response.json());//返回json队形
    },
    async getContents(dateArray){
        let contentUrlArray = dateArray.map(DateUtils.convertDate).map((date)=>this.API_DAILY + date);
        console.log(contentUrlArray);
        let promises = contentUrlArray.map(
            (url)=>fetchWithTimeout(5000,url).then(response => response.json())
        );
        let responseDatasCopy;
        await Promise.all(promises).then(responseDatas =>{
            responseDatas.forEach(function(element, index){
                element.date = dateArray[index];
            });
            responseDatasCopy = responseDatas;
        });
        console.log(responseDatasCopy);
        return responseDatasCopy;
    }
};

module.exports = RequestUtils;