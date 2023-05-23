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
const inputTypeRange = document.querySelector('.rollback input[type=range]');
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
    rollback: 0,
    fullPrice: 0,
    count: 0,
    serviceNumber: {},
    servicePercent: {},
    ServicePricesPercent: 0,
    ServicePricesNumber: 0,
    screenPrice: 0,
    isError: false,
    getTitle: function () {
        document.title = title.textContent;
        //return name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase()
    },
    init: function () {
        appData.getTitle();
        startBtn.addEventListener('click', appData.checkInputs);


        btnPlus.addEventListener('click', appData.addscreenBlock);

    },
    addScreens: function () {
        screens = document.querySelectorAll('.screen')
        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select');//
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value

            })
            //appData.count = input.value;
            //appData.count += +input.value;
            //console.log(appData.count);
        })
    },
    //--------
    checkInputs: function () {
        screens = document.querySelectorAll('.screen');
        appData.isError = false;

        screens.forEach((screen) => {
            const select = screen.querySelector('select');//
            const input = screen.querySelector('input');

            if (select.value == '' || input.value.trim() == '') {
                appData.isError = true;
                alert('выберите тип и количество экранов');
            }
        })

        if (!appData.isError) {
            appData.start();
        }
    },//-----------

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
        })


    },
    addscreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true)
        console.log(cloneScreen);
        screens[screens.length - 1].after(cloneScreen);
    },
    start: function () {
        appData.addScreens();
        console.log(appData.screens);
        appData.addServices();
        appData.addPrices();
        appData.showResult();
        console.log(appData);
        //appData.screenPrice = appData.getAnswerNum();
        /* appData.allServicePrices = appData.getAllServicePrices();
         appData.logger(); */
    },
    showTypeOf: function (element) {
        return typeof (element);
    },
    getServicePercentPrices: function () {

    },

    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price
            appData.count += +screen.count
        }
        for (let key in appData.serviceNumber) {
            appData.ServicePricesNumber += appData.serviceNumber[key]
        }
        for (let key in appData.servicePercent) {
            appData.ServicePricesPercent += appData.screenPrice * (appData.servicePercent[key] / 100)
        }
        appData.fullPrice = +appData.screenPrice + appData.ServicePricesPercent + appData.ServicePricesNumber
        appData.ServicePricesPercent = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.ServicePricesPercent + appData.ServicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
        totalCount.value = appData.count;
        totalCountRollback.value = appData.ServicePricesPercent
    },
    logger: function () {
        console.log(appData.screenPrice);
        console.log(appData.screens);
        console.log(appData.fullPrice);
        console.log(appData.allServicePrices);
        for (let key in appData) {
            console.log('ключ: ' + key + '' + ' значение: ' + appData[key]);
        }
    }

}
inputTypeRange.addEventListener("input", function () {
    const value = inputTypeRange.value;

    spanType.textContent = value + '%';
    appData.rollback = inputTypeRange.value;

    console.log(spanType.textContent)
});//========
appData.init();