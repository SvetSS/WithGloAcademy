'use strict'

const title = prompt('Как называется ваш проект?');
console.log(title);//для проверки
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
console.log(Math.ceil(servicePercentPrice));

if (fullPrice>=30000)
{
    console.log('Даем скидку в 10%');
}
else if (fullPrice >= 15000 && fullPrice < 30000)
{
    console.log('Даем скидку в 5%');
}
else if (fullPrice >= 0 && fullPrice < 15000)
{
    console.log('Скидка не предусмотрена');
}
else if (fullPrice < 0 )
{
    console.log('Что то пошло не так');
}
else {
    console.log('ошибочка вышла'); 
}
