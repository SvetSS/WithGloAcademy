const title = "WithGloAcademy";
const  screens ='Простые, Сложные, Интерактивные';
const screenPrice = 458;
const rollback = 11;
const fullPrice = 50000;
const adaptive =true;
//alert('Проверьте правильность заполнения полей');
console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта  ${fullPrice} рублей`);
console.log(screens.length);
console.log((screens.toLowerCase()).split(', '));
console.log(`Процент отката посреднику за работу ${fullPrice*(rollback/100)} рублей`);