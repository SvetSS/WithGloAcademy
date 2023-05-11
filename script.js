'use strict'

const title = prompt('Как называется ваш проект?');
const  screens =prompt('Какие типы экранов нужно разработать?', 'Выберите: Простые, Сложные, Интерактивные');
const screenPrice = prompt('Сколько будет стоить данная работа? Ответ выразите в цифрах');
const rollback = 11;
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = prompt('Сколько это будет стоить?', 'Ответ пишите цифрами');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = prompt('Сколько это будет стоить?', 'Ответ пишите цифрами');

const fullPrice = Number(screenPrice) + Number(servicePrice1) + Number(servicePrice2);
const servicePercentPrice = fullPrice - rollback;
//дополнения 04
//1
const getAllServicePrices = function(price1, price2){
    const allServicePrices =Number( price1) + Number(price2);
    return allServicePrices;
}
const showTypeOf = function(element){
    return typeof(element);
}
//2
function  getFullPrice(priceScreen, getAllPrices){
    const fullPrice = Number( priceScreen) + getAllPrices;
    return fullPrice;
}
//3
function  getTitle(name){    
    return name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();
}
//4
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

//дополнения 04
//console.log(getAllServicePrices(servicePrice2, servicePrice1));
console.log(showTypeOf(servicePrice2));
console.log(screens);
console.log(getRollbackPercent(getFullPrice(Number(screenPrice), getAllServicePrices(servicePrice2, servicePrice1))));
//console.log(getFullPrice(Number(screenPrice), getAllServicePrices(servicePrice2, servicePrice1)));
console.log(getTitle(title));
console.log(getServicePercentPrices(getFullPrice(screenPrice, getAllServicePrices(servicePrice2, servicePrice1)), getRollbackPercent(getFullPrice(screenPrice, getAllServicePrices(servicePrice2, servicePrice1)))));
