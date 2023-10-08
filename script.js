const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const ResturantSelect = document.getElementById("Resturant");

populateUI();

let ticketPrice = +ResturantSelect.value;

// Save selected Resturant index and price
function setResturantData(ResturantIndex, ResturantPrice) {
  localStorage.setItem("selectedResturantIndex", ResturantIndex);
  localStorage.setItem("selectedResturantPrice", ResturantPrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setResturantData(ResturantSelect.selectedIndex, ResturantSelect.value);
}


// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        console.log(seat.classList.add("selected"));
      }
    });
  }

  const selectedResturantIndex = localStorage.getItem("selectedResturantIndex");

  if (selectedResturantIndex !== null) {
    ResturantSelect.selectedIndex = selectedResturantIndex;
    console.log(selectedResturantIndex)
  }
}
console.log(populateUI())
// Resturant select event
ResturantSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setResturantData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
