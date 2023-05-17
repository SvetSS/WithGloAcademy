'use strict'
const appData = {
    
    title: '',    
    screens :'',
    adaptive:true,
    fullPrice:0,
    service1:0,
    service2:0,
    allServicePrices:0,
    screenPrice:0,
    getTitle:function  (name){    
        return name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase()},
    
    asks:function(){
        //appData.title=prompt('Как называется ваш проект?','Расчёт');
        do{appData.title=prompt('Как называется ваш проект? Ответ не должен содержать только цифры','Расчёт');
        }
        while(appData.isNumber(appData.title))

        do{appData.screens=prompt('Какие типы экранов нужно разработать?', 'Выберите: Простые, Сложные, Интерактивные'); 
        }
        while(appData.isNumber(appData.screens))
               
        appData.adaptive = confirm('Нужен ли адаптив на сайте?'); 
        appData.getTitle(appData.title);       
        
    },
    
    isNumber :function (num){
        return !isNaN(parseFloat(num))&& isFinite(num);
    },
    getAnswerNum :function() {
        let Price;
        do{Price = prompt('Сколько будет стоить данная работа? Ответ выразите в цифрах');
        }
        while(!appData.isNumber(Price))
        return Number( Price);
    },
    showTypeOf : function(element){
        return typeof(element);
    },
    getRollbackPercent :function(getFullPriceOfAll){
        if (getFullPriceOfAll>=30000)
        {
            return getFullPriceOfAll/100*10;
        }
        else if (getFullPriceOfAll >= 15000 && appData.fullPrice < 30000)
        {
            return getFullPriceOfAll/100*5;
        }
        else if (getFullPriceOfAll >= 0 && appData.fullPrice < 15000)
        {
            return getFullPriceOfAll=0;
        }
    },
    
 getServicePercentPrices :function(getFullPriceOfAll, RollbackPercent ){    
    const servicePercentPrice =Number( getFullPriceOfAll) - Number(RollbackPercent);
    return servicePercentPrice;
},

 getAllServicePrices : function(){
    let sum=0;
    for(let i = 0; i<2; i++){
        if (i===0){
            do{appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
        }
        while(appData.isNumber(appData.service1))
             
        }else if(i===1){
            do{appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
        }
        while(appData.isNumber(appData.service2))
        }
        do{
            sum = Number( prompt('Сколько будет стоить данная работа? Ответ выразите в цифрах'));
        }
        while(!appData.isNumber(sum ))
        sum += +sum;
    }
    return sum;
},
getFullPrice: function (priceScreen, getAllPrices){
    const fullPrice = Number( priceScreen) + Number( getAllPrices);
    return fullPrice;
},
logger:function(){    
    console.log(appData.screenPrice);
    console.log(appData.screens);
    console.log(appData.fullPrice);
    console.log(appData.allServicePrices);
    console.log(appData.getRollbackPercent(appData.fullPrice));
    console.log(appData.getTitle(appData.title));
    console.log(appData.getServicePercentPrices(appData.fullPrice, appData.getRollbackPercent(appData.fullPrice)));
    for (let key in appData){
        console.log('ключ: ' + key + '' + ' значение: ' + appData[key]);
    }
},
start:function(){
    appData.asks();    
    appData.screenPrice= appData.getAnswerNum();
    appData.allServicePrices =appData.getAllServicePrices();
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    appData.logger();
}

}

appData.start();