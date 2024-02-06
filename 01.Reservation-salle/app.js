"use strict";
const jours = document.querySelector(".jours");
const dates = document.querySelector(".date");
const icons = document.querySelectorAll(".icons span");
const reservationForm = document.getElementById("reservationForm");
const reservationInfo = document.getElementById("reservationInfo");
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();
let firstDayofMonth;
const mois = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
];
const reservationCards = [];
const renderCalendar = () => {
    firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() &&
            currMonth === new Date().getMonth() &&
            currYear === new Date().getFullYear()
            ? "active"
            : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }
    if (dates) {
        dates.innerText = `${mois[currMonth]} ${currYear}`;
    }
    if (jours) {
        jours.innerHTML = liTag;
    }
};
renderCalendar();
icons.forEach((icon) => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        }
        else {
            date = new Date();
        }
        renderCalendar();
    });
});
if (reservationForm) {
    reservationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const phoneInput = document.getElementById("phone");
        const dateInput = document.getElementById("date");
        const timeInput = document.getElementById("time");
        if (nameInput && emailInput && phoneInput && dateInput && timeInput && reservationInfo) {
            const reservationCardHTML = `
        <div class="reservation-card">
          <strong>Nom :</strong> ${nameInput.value}<br>
          <strong>Email :</strong> ${emailInput.value}<br>
          <strong>Téléphone :</strong> ${phoneInput.value}<br>
          <strong>Date :</strong> ${dateInput.value}<br>
          <strong>Heure :</strong> ${timeInput.value}
        </div>
      `;
            const cardElement = document.createElement("div");
            cardElement.innerHTML = reservationCardHTML;
            reservationCards.push(cardElement);
            reservationInfo.innerHTML = "";
            reservationCards.forEach(card => {
                reservationInfo.appendChild(card);
            });
            const selectedDate = new Date(dateInput.value);
            if (selectedDate.getMonth() === currMonth &&
                selectedDate.getFullYear() === currYear &&
                jours) {
                const day = selectedDate.getDate();
                const dayElements = jours.querySelectorAll("li");
                if (dayElements && firstDayofMonth !== undefined) {
                    dayElements[day + firstDayofMonth - 1].classList.add("reserved");
                }
            }
            reservationForm.reset();
        }
    });
}
