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
    ServicePricesPercent: 0,
    ServicePricesNumber: 0,
    screenPrice: 0,
    isError: false,
    getTitle: function () {
        document.title = title.textContent;
    },
    init: function () {
        this.getTitle();
        // startBtn.addEventListener('click', this.checkInputs);
        startBtn.addEventListener('click', this.checkInputs.bind(this)/* appData.checkInputs */);
        startBtn.addEventListener('click', blockInput);


        btnPlus.addEventListener('click', this.addscreenBlock);

    },
    addScreens: function () {
        // const self = this;
        screens = document.querySelectorAll('.screen')
        screens.forEach((screen, index) => {//
            const select = screen.querySelector('select');//
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            //console.log(self.screens)
            this.screens.push({/**/
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
        this.isError = false;

        screens.forEach((screen) => {
            const select = screen.querySelector('select');//
            const input = screen.querySelector('input');

            if (select.value == '' || input.value.trim() == '') {
                appData.isError = true;
                alert('выберите тип и количество экранов');
            }
        })

        if (!this.isError) {
            appData.start();
        }
    },//-----------

    addServices: function () {
        percentList.forEach((item) => {//func
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicePercent[label.textContent] = +input.value;
            }
        })

        numbertList.forEach((item) => {
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
inputTypeRange.addEventListener("input", () => {
    //inputTypeRange.addEventListener("input", function () {
    const value = inputTypeRange.value;

    spanType.textContent = value + '%';
    appData.rollback = inputTypeRange.value;

    console.log(spanType.textContent)
});//========
appData.init();
redtBtn.addEventListener('click', reset);
function reset() {
    screens = document.querySelectorAll('.screen');
    inputTypeRange = document.querySelector('.rollback input[type=range]');
    elemsInput = document.querySelectorAll('.main-controls input[type=text]');//block
    elemsSelect = document.querySelectorAll('.main-controls select');//block
    elemsCheck = document.querySelectorAll('.main-controls [type=checkbox]');

    inputTypeRange.value = 0;
    elemsInput.forEach((input) => {
        input.disabled = false;
        input.value = '';
    });
    elemsSelect.forEach((input) => {
        input.disabled = false;
        input.value = "";
    });
    elemsCheck.forEach((input) => {
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

};
function blockInput() {
    screens = document.querySelectorAll('.screen');
    elemsInput = document.querySelectorAll('.main-controls input[type=text]');//block
    elemsSelect = document.querySelectorAll('.main-controls select');//block
    elemsCheck = document.querySelectorAll('.main-controls [type=checkbox]');

    screens.forEach((input) => {
        input.disabled = true;
    });
    elemsInput.forEach((input) => {
        input.disabled = true;
    });
    elemsSelect.forEach((input) => {
        input.disabled = true;
    });
    elemsCheck.forEach((input) => {
        input.disabled = true;
    });
    btnPlus.disabled = true;

    startBtn.style.display = 'none';
    redtBtn.style.display = 'inline';
}
