//Находим основные элементы
let cards = document.querySelector(`.cards`);//Контейнер с карточками
let input = document.querySelector(`.input`);//Поле ввода
let bucketStore = document.querySelector(`.bucket-store`);//Корзина
let bucketInput = document.querySelector(`.bucket-input`);//Поле ввода в корзине
let bucketButton = document.querySelector(`.bucket-button`);//Контейнер для кнопки оформления заказа
//База данных
let foods = [`Курица гунбао`, `Гобаожоу`, `Рамен`, `Рагу`, `Удон`, `Суши`];
let costs = [299, 249, 299, 149, 169, 239];

//ФУНКЦИЯ: Вывод одной карточки на страницу
function renderCard(i){
    let food = foods[i];
    let cost = costs[i];
    cards.innerHTML +=  `
    <div class="card">
        <img src="assets/${i}.jpg" alt="">
        <div class="card-main1">
            ${food}
        </div>
        <div class="card-footer1 d-flex">
            ${cost}₽
        </div>
    </div>
    `; 
};

//ФУНКЦИЯ: Вывод всех карточек на страницу
function renderAll(){
    cards.innerHTML = ``;
    for (let i = 0; i < foods.length; i++){
        renderCard(i)
    };
}
//Вывод всех карточек на страницу
renderAll();

//Находим каждую карточку, чтобы наложить на них слушатель событий 'КЛИК'
let cardClick = document.querySelectorAll(`.card`);
for (let i = 0; i < cardClick.length; i++){
    click = cardClick[i];
    click.addEventListener(`click`,function(){
        cardClick[i].classList.toggle(`active`);
        bucketPush()
    });
};

function bucketPush(){
    bucketStore.innerHTML = ``;
    let costAll = 0;
    for(let i = 0; i < cardClick.length; i++){
        if(cardClick[i].classList.contains(`active`)){
            nameB = cardClick[i].innerText;
            nameBucket = nameB.replace(/[^a-zа-яё\s]/gi, '');
            costBucket = Number(nameB.replace(/[^0-9]/g, ''));
            costAll += costBucket
            bucketStore.innerHTML += `
            <div class="bucket-item col-12 row">
                <div class="bucket-item-name col-6">${nameBucket}</div>
                <div class="bucket-item-cost col-6">Стоимость: <p class="cost">${costBucket}₽</p></div>
            </div>`;
            bucketButton.innerHTML = `<button class="buy1" data-bs-target="#exampleModal" data-bs-toggle="modal">Оформить заказ</button>`
        }

    };
    bucketStore.innerHTML += `<div class="col-12 cost">Итого: ${costAll}₽</div>`
    if(bucketStore.innerHTML == `<div class="col-12 cost">Итого: 0₽</div>`){
        bucketStore.innerHTML = `Корзина пуста<br>
        Добавьте товар в корзину, кникнув по карточке с ней!`;
        bucketButton.innerHTML = ``;

    }
};

//ФУНКЦИЯ: Поиск по названию
function search(){
    let search = input.value.toLowerCase();
    for(let i = 0; i < foods.length; i++){
        let title = foods[i].toLowerCase();
        if(title.includes(search)){
            cardClick[i].classList.remove(`d-none`)
        }else{
            cardClick[i].classList.add(`d-none`)
        }
    };
};

//Поиск по названию
input.addEventListener(`input`,search);


//Находим чекбоксы и modal-body, где будем добавлять всё, что нужно.

let checkCard = document.querySelector(`#flexRadioDefault1`);
let checkNal = document.querySelector(`#flexRadioDefault2`);
let modalinputs = document.querySelector(`.modal-inputs`);

checkCard.addEventListener(`input`, function(){
    if(checkCard.checked){
        modalinputs.innerHTML = `
        <div class="card-number d-flex justify-content-center col-12" id="CNumber">
            <input type="text" class="input big_ mb-2" placeholder="Номер карты">
        </div>
        <div class="card-number col-6 d-flex justify-content-center" id="Date">
            <input type="text" class="input small_" placeholder="ММ/ГГ">
        </div>
        <div class="card-number col-6 d-flex justify-content-center">
            <input type="text" class="input small_" placeholder="CVC">
        </div>
        <div class="card-number d-flex justify-content-center col-12 mb-3" id="Name">
            <input type="text" class="input big_ mt-2" placeholder="Фамилия и имя владельца">
        </div>
        <div class="card-number d-flex justify-content-center col-12">
            <input type="text" class="input big_ mb-2" placeholder="Адрес доставки">
        </div>
        <div class="card-number d-flex justify-content-center col-12">
            <input type="text" class="input big_ mb-2" placeholder="Номер телефона">
        </div>
        <div class="card-number d-flex justify-content-center col-12 mt-3">
            <button class="buy">Оформить заказ</button>
        </div>`
        let modalButton = document.querySelector(`.buy`);
        modalButton.addEventListener(`click`,function(){
            modalinputs.innerHTML = `
            <div class="card-number d-flex justify-content-center col-12 mt-3 form-check">
                Ваш заказ принят! Мы свяжемся с вами по номеру телефона, который вы указали выше. Вы можете закрыть это меню.
            </div>`
        });
    };
});

checkNal.addEventListener(`input`, function(){
    if (checkNal.checked){
        modalinputs.innerHTML = `
        <div class="card-number d-flex justify-content-center col-12">
            <input type="text" class="input big_ mb-2" placeholder="Адрес доставки">
        </div>
        <div class="card-number d-flex justify-content-center col-12">
            <input type="text" class="input big_ mb-2" placeholder="Номер телефона">
        </div>
        <div class="card-number d-flex justify-content-center col-12 mt-3">
            <button class="buy">Оформить заказ</button>
        </div>`
        let modalButton = document.querySelector(`.buy`);
        modalButton.addEventListener(`click`,function(){
            modalinputs.innerHTML = `
            <div class="card-number d-flex justify-content-center col-12 mt-3 form-check">
                Ваш заказ принят! Мы свяжемся с вами по номеру телефона, который вы указали выше. Вы можете закрыть это меню.
            </div>`
        });
    };
    
});


