const jours: HTMLElement | null = document.querySelector(".jours"); 
const dates: HTMLElement | null = document.querySelector(".date"); 
const icons: NodeListOf<HTMLElement> = document.querySelectorAll(".icons span"); 
const reservationForm: HTMLFormElement | null = document.getElementById("reservationForm") as HTMLFormElement | null; 
const reservationInfo: HTMLElement | null = document.getElementById("reservationInfo");

let date: Date = new Date(); 
let currYear: number = date.getFullYear(); 
let currMonth: number = date.getMonth(); 
let firstDayofMonth: number; 

const mois: string[] = [ 
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

const reservationCards: HTMLElement[] = [];

const renderCalendar = () => {

  firstDayofMonth = new Date(currYear, currMonth, 1).getDay(); 


  let lastDateofMonth: number = new Date(currYear, currMonth + 1, 0).getDate(); 
  let lastDayofMonth: number = new Date(currYear, currMonth, lastDateofMonth).getDay(); 
  let lastDateofLastMonth: number = new Date(currYear, currMonth, 0).getDate(); 
  let liTag: string = ""; 

  for (let i: number = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i: number = 1; i <= lastDateofMonth; i++) {
    let isToday: string =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i: number = lastDayofMonth; i < 6; i++) {
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


icons.forEach((icon: HTMLElement) => {
  icon.addEventListener("click", () => {

    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1; 


    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }


    renderCalendar();
  });
});

if (reservationForm) {

  reservationForm.addEventListener("submit", (e: Event) => {

    e.preventDefault(); 

    const nameInput: HTMLInputElement | null = document.getElementById("name") as HTMLInputElement | null;
    const emailInput: HTMLInputElement | null = document.getElementById("email") as HTMLInputElement | null;
    const phoneInput: HTMLInputElement | null = document.getElementById("phone") as HTMLInputElement | null;
    const dateInput: HTMLInputElement | null = document.getElementById("date") as HTMLInputElement | null;
    const timeInput: HTMLInputElement | null = document.getElementById("time") as HTMLInputElement | null;

    if (nameInput && emailInput && phoneInput && dateInput && timeInput && reservationInfo) {

      const reservationCardHTML: string = `
        <div class="reservation-card">
          <strong>Nom :</strong> ${nameInput.value}<br>
          <strong>Email :</strong> ${emailInput.value}<br>
          <strong>Téléphone :</strong> ${phoneInput.value}<br>
          <strong>Date :</strong> ${dateInput.value}<br>
          <strong>Heure :</strong> ${timeInput.value}
        </div>
      `;

      const cardElement: HTMLElement = document.createElement("div");
      cardElement.innerHTML = reservationCardHTML;
      reservationCards.push(cardElement); 

      reservationInfo.innerHTML = "";

      reservationCards.forEach(card => {
        reservationInfo.appendChild(card);
      });


      const selectedDate: Date = new Date(dateInput.value);
      if (
        selectedDate.getMonth() === currMonth &&
        selectedDate.getFullYear() === currYear &&
        jours
      ) {
        const day: number = selectedDate.getDate();
        const dayElements: NodeListOf<HTMLElement> | undefined = jours.querySelectorAll("li");
        if (dayElements && firstDayofMonth !== undefined) {
          dayElements[day + firstDayofMonth - 1].classList.add("reserved");
        }
      }

    
      reservationForm.reset();
    }
  });
}
