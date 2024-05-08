console.log("Hi");
const SERVER = "http://localhost:3000/measurements";
var measurements = [];

// loading measurements from json server
function fetchData() {
  fetch(SERVER)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      measurements = res;
      addData(measurements.length + 1, 23.0);
    })
    .catch((error) => console.log("Błąd: ", error));
}

// adding new measurements to json server 
function addData(id, bmi) {
  fetch(SERVER, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, bmi }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.log("Błąd: ", error));
}

// remove measurements from json server
function removeData() {}

// edit measurements from json server
function updateData() {}

fetchData();