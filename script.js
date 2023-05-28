'use strict'

const title = document.getElementsByTagName('h1')[0];

const startBtn = document.getElementsByClassName('handler_btn')[0];//рассчитать
const redtBtn = document.getElementsByClassName('handler_btn')[1];//сброс

let screens = document.querySelectorAll('.screen');
let elemsInput = document.querySelectorAll('.main-controls input[type=text]');//block
let elemsSelect = document.querySelectorAll('.main-controls select');//block
let elemsCheck = document.querySelectorAll('.main-controls [type=checkbox]');//block
console.log(elemsCheck);
const btnPlus = document.querySelector('.screen-btn');
const percentList = document.querySelectorAll('.other-items.percent');
const numbertList = document.querySelectorAll('.other-items.number');
let inputTypeRange = document.querySelector('.rollback input[type=range]');
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
    servicePercentPrice: 0,
    ServicePricesPercent: 0,
    ServicePricesNumber: 0,
    screenPrice: 0,
    isError: false,
    getTitle: function () {
        document.title = title.textContent;
    },
    init: function () {
        this.getTitle();
        startBtn.addEventListener('click', appData.checkInputs);
        startBtn.addEventListener('click', blockInput);


        btnPlus.addEventListener('click', this.addscreenBlock);
        redtBtn.addEventListener('click', appData.reset);

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
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))
    },
    showResult: function () {
        total.value = appData.screenPrice;
        totalCountOther.value = appData.ServicePricesPercent + appData.ServicePricesNumber;
        fullTotalCount.value = appData.fullPrice;
        totalCount.value = appData.count;
        totalCountRollback.value = appData.servicePercentPrice
    },
    logger: function () {
        console.log(appData.screenPrice);
        console.log(appData.screens);
        console.log(appData.fullPrice);
        console.log(appData.allServicePrices);
        for (let key in appData) {
            console.log('ключ: ' + key + '' + ' значение: ' + appData[key]);
        }
    },

    //++reset
    reset: function () {
        screens = document.querySelectorAll('.screen');
        inputTypeRange = document.querySelector('.rollback input[type=range]');
        elemsInput = document.querySelectorAll('.main-controls input[type=text]');//block
        elemsSelect = document.querySelectorAll('.main-controls select');//block
        elemsCheck = document.querySelectorAll('.main-controls [type=checkbox]');

        appData.rollback = 0;
        appData.fullPrice = 0;
        appData.servicePercentPrice = 0;
        appData.ServicePricesPercent = 0;
        appData.ServicePricesNumber = 0;
        appData.screenPrice = 0;
        appData.count = 0;
        inputTypeRange.value = 0;

        elemsInput.forEach(function (input) {
            input.disabled = false;
            input.value = '';
        });
        elemsSelect.forEach(function (input) {
            input.disabled = false;
            input.value = "";
        });
        elemsCheck.forEach(function (input) {
            input.disabled = false;
            if (input.checked) {
                input.checked = !input.checked
            }
        });

        screens = document.querySelectorAll('.screen');

        for (let i = 1; i < screens.length; i++) {
            screens[i].remove();
        };
        btnPlus.disabled = false;
        screens = document.querySelectorAll('.screen');
        //btnPlus.addEventListener('click', appData.addscreenBlock);
        startBtn.style.display = 'inline';
        redtBtn.style.display = 'none';
        appData.showResult();

    }
}
inputTypeRange.addEventListener("input", () => {
    //inputTypeRange.addEventListener("input", function () {
    const value = inputTypeRange.value;

    spanType.textContent = value + '%';
    appData.rollback = inputTypeRange.value;

    console.log(spanType.textContent)
});//========
appData.init();


function blockInput() {
    screens = document.querySelectorAll('.screen');
    elemsInput = document.querySelectorAll('.main-controls input[type=text]');//block
    elemsSelect = document.querySelectorAll('.main-controls select');//block
    elemsCheck = document.querySelectorAll('.main-controls [type=checkbox]');

    screens.forEach(function (input) {
        input.disabled = true;
    });
    elemsInput.forEach(function (input) {
        input.disabled = true;
    });
    elemsSelect.forEach(function (input) {
        input.disabled = true;
    });
    elemsCheck.forEach(function (input) {
        input.disabled = true;
    });
    btnPlus.disabled = true;

    startBtn.style.display = 'none';
    redtBtn.style.display = 'inline';
}
