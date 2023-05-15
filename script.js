'use strict'

const title = prompt('Как называется ваш проект?');
const  screens =prompt('Какие типы экранов нужно разработать?', 'Выберите: Простые, Сложные, Интерактивные');
const adaptive = confirm('Нужен ли адаптив на сайте?');
let fullPrice;
let service1;
let service2;
let  allServicePrices;

const isNumber =function (num){
    return !isNaN(parseFloat(num))&& isFinite(num);
}
let screenPrice; 

const getAnswerNum = function() {
    let Price;
    do{Price = prompt('Сколько будет стоить данная работа? Ответ выразите в цифрах');
    }
    while(!isNumber(Price))
    return Number( Price);
}

const showTypeOf = function(element){
    return typeof(element);
}

function  getFullPrice(priceScreen, getAllPrices){
    const fullPrice = Number( priceScreen) + Number( getAllPrices);
    return fullPrice;
}

function  getTitle(name){    
    return name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();
}

const getRollbackPercent = function(getFullPriceOfAll){
    if (getFullPriceOfAll>=30000)
    {
        return getFullPriceOfAll/100*10;
    }
    else if (getFullPriceOfAll >= 15000 && fullPrice < 30000)
    {
        return getFullPriceOfAll/100*5;
    }
    else if (getFullPriceOfAll >= 0 && fullPrice < 15000)
    {
        return getFullPriceOfAll=0;
    }
}
const getServicePercentPrices = function(getFullPriceOfAll, RollbackPercent ){    
    const servicePercentPrice =Number( getFullPriceOfAll) - Number(RollbackPercent);
    return servicePercentPrice;
}

const getAllServicePrices = function(){
    let sum=0;
    for(let i = 0; i<2; i++){
        if (i===0){
            service1 = prompt('Какой дополнительный тип услуги нужен?'); 
        }else if(i===1){
            service2 = prompt('Какой дополнительный тип услуги нужен?');
        }
        do{
            sum = Number( prompt('Сколько будет стоить данная работа? Ответ выразите в цифрах'));
        }
        while(!isNumber(sum ))
        sum += +sum;
    }
    return sum;
}

screenPrice = getAnswerNum();
allServicePrices=getAllServicePrices();
fullPrice = screenPrice + allServicePrices;




console.log(screenPrice);
console.log(screens);
console.log(fullPrice);
console.log(allServicePrices);
console.log(getRollbackPercent(fullPrice));
console.log(getTitle(title));
console.log(getServicePercentPrices(fullPrice, getRollbackPercent(fullPrice)));
