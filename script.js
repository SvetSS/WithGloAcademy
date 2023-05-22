'use strict'

//const listH = document.getElementsByTagName('h1');
const title = document.getElementsByTagName('h1')[0];
//const title = listH.item(0).innerHTML;
const startBtn = document.getElementsByClassName('handler_btn')[0];
const redtBtn = document.getElementsByClassName('handler_btn')[1];
/* const listBtn = document.getElementsByClassName('handler_btn');
const listBtnEl0 = listBtn[0];
const listBtnEl1 = listBtn[1]; */
let screens = document.querySelectorAll('.screen');
const btnPlus = document.querySelector('.screen-btn');
const percentList = document.querySelectorAll('.other-items.percent');
const numbertList = document.querySelectorAll('.other-items.number');
const inputType = document.querySelector('.rollback input[type=range]');
const spanType = document.querySelector('.rollback .range-value');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountRollback = document.getElementsByClassName('total-input')[4];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];

const appData = {

    title: '',
    screens: [],
    adaptive: true,
    fullPrice: 0,
    serviceNumber: {},
    servicePercent: {},
    ServicePricesPercent: 0,
    ServicePricesNumber: 0,
    screenPrice: 0,
    getTitle: function () {
        document.title = title.textContent;
        //return name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase()
    },
    init: function () {
        appData.getTitle();
        startBtn.addEventListener('click', appData.start);
        btnPlus.addEventListener('click', appData.addscreenBlock);

    },
    addScreens: function () {
        screens = document.querySelectorAll('.screen')
        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            //console.log(input.value);

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value
            })
            //
        })
        console.log(appData.screens);
    },
    addServices: function () {
        percentList.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicePercent[label.textContent] = +input.value;
            }
        })

        numbertList.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.serviceNumber[label.textContent] = +input.value;
            }
            /*  console.log(check);
             console.log(label);*/

        })


    },
    addscreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true)
        console.log(cloneScreen);
        screens[screens.length - 1].after(cloneScreen);
    },
    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        appData.showResult();
        console.log(appData);
        //appData.screenPrice = appData.getAnswerNum();
        /* appData.allServicePrices = appData.getAllServicePrices();
         appData.logger(); */
    },

    /*  getAnswerNum: function () {
         let Price;
         do {
             Price = prompt('Сколько будет стоить данная работа? Ответ выразите в цифрах');
         }
         while (!appData.isNumber(Price))
         return Number(Price);
     }, */
    showTypeOf: function (element) {
        return typeof (element);
    },
    getRollbackPercent: function (getFullPriceOfAll) {
        if (getFullPriceOfAll >= 30000) {
            return getFullPriceOfAll / 100 * 10;
        }
        else if (getFullPriceOfAll >= 15000 && appData.fullPrice < 30000) {
            return getFullPriceOfAll / 100 * 5;
        }
        else if (getFullPriceOfAll >= 0 && appData.fullPrice < 15000) {
            return getFullPriceOfAll = 0;
        }
    },

    getServicePercentPrices: function (getFullPriceOfAll, RollbackPercent) {
        const servicePercentPrice = Number(getFullPriceOfAll) - Number(RollbackPercent);
        return servicePercentPrice;
    },

    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price
        }
        for (let key in appData.serviceNumber) {
            appData.ServicePricesNumber += appData.serviceNumber[key]
        }
        for (let key in appData.servicePercent) {
            appData.ServicePricesPercent += appData.screenPrice * (appData.servicePercent[key] / 100)
        }
        appData.fullPrice = +appData.screenPrice + appData.ServicePricesPercent + appData.ServicePricesNumber

    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.ServicePricesPercent + appData.ServicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
        alert()
    },
    logger: function () {
        console.log(appData.screenPrice);
        console.log(appData.screens);
        console.log(appData.fullPrice);
        console.log(appData.allServicePrices);
        console.log(appData.getRollbackPercent(appData.fullPrice));
        console.log(appData.getTitle(appData.title));
        console.log(appData.getServicePercentPrices(appData.fullPrice, appData.getRollbackPercent(appData.fullPrice)));
        for (let key in appData) {
            console.log('ключ: ' + key + '' + ' значение: ' + appData[key]);
        }
    }

}

appData.init();