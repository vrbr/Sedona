let modal = document.querySelector(".modal");//найти контейнер с формой
const modalButton = document.querySelector(".search-button");//найти кнопку
const modalForm = document.querySelector(".search-form");//найти форму
const modalArrival = modalForm.querySelector("#arrival-date");//дата заезда
const modalDeparture = modalForm.querySelector("#departure-date");//дата выезда

let numberOfAdults = modal.querySelector("#adult");//лэйбл взрослых
let numberOfChildrens = modal.querySelector("#children");//лэйбл детей
let adultsButtonMinus = modal.querySelector(".adult-less");//-взрослый
let adultsButtonPlus = modal.querySelector(".adult-more");//+взрослый
let childrenButtonMinus = modal.querySelector(".children-less");//-детёныш
let childrenButtonPlus = modal.querySelector(".children-more");//+детёныш


let isStorageSupport = true;
let storage = "";

try {
    adultStorage = localStorage.getItem("adults");//запомнить кол-во взрослых
    childrenStorage = localStorage.getItem("childrens");//запомнить кол-во детенышей
  } catch (err) {
    isStorageSupport = false;
  }

modal.classList.add("modal-hide");
modalButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    console.log("Кнопка нажата");//при клике вывести сообщение

    modal.classList.toggle("modal-hide");//убрать 'скрыть'
    modal.classList.toggle("modal-show");//убрать 'показать'
    modal.classList.remove("modal-error");//ошибка

    if (adultStorage && childrenStorage) {//вспомнить всё
        numberOfAdults.value = adultStorage;
        numberOfChildrens.value = childrenStorage;
        modalDeparture.focus();//фокус на дату выезда
    } else {
        modalArrival.focus();//фокус на дату заеда
    }
});

modalForm.addEventListener("submit", function (evt) {//отправка данных
    if (!modalArrival.value || !modalDeparture.value) {//если дата не заполнена
        evt.preventDefault();
        modal.classList.remove("modal-error");
        modal.offsetWidth = modal.offsetWidth;
        modal.classList.add("modal-error");
    } else {
        if (isStorageSupport) {
            localStorage.setItem("adults", numberOfAdults.value);
            localStorage.setItem("childrens", numberOfChildrens.value);
        }
    }
});

window.addEventListener("keydown", function (evt) {//реакция на эскейп
    if (evt.keyCode === 27) {
      if (modal.classList.contains("modal-hide")) {
        evt.preventDefault();
        modal.classList.remove("modal-show");
        modal.classList.add("modal-hide");
        modal.classList.remove("modal-error");
      }
    }
  });

adultsButtonMinus.addEventListener("click", function(evt) {//взрослых не меньше 1
    evt.preventDefault();
    if (numberOfAdults.value > 1) {
        numberOfAdults.value = +numberOfAdults.value - 1;
    }
});

adultsButtonPlus.addEventListener("click", function(evt) {
    evt.preventDefault();
    if (numberOfAdults.value < 10) {
        numberOfAdults.value = +numberOfAdults.value + 1;
    }
});

childrenButtonMinus.addEventListener("click", function(evt) {//чайлдфри))
    evt.preventDefault();
    if (numberOfChildrens.value > 0) {
        numberOfChildrens.value = +numberOfChildrens.value - 1;
    }
});

childrenButtonPlus.addEventListener("click", function(evt) {
    evt.preventDefault();
    if (numberOfChildrens.value < 10) {
        numberOfChildrens.value = +numberOfChildrens.value + 1;
    }
});