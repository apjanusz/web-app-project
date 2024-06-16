const SERVER = "http://localhost:3000/measurements";
let measurements = [];

// loading measurements from json server
function fetchData() {
  fetch(SERVER)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      measurements = res;
      selection();
      selection2();
      table();
    })
    .catch((error) => console.log("Błąd: ", error));
}

// adding new measurements to json server
function addData() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseInt(document.getElementById("height").value);
  const kcal = parseInt(document.getElementById("kcal").value);
  id = `${parseInt(measurements[measurements.length - 1].id) + 1}`;
  fetch(SERVER, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, weight, height, kcal }),
  })
    .then((res) => {
      if (res.ok) {
        fetchData();
        alert(`Pomyslnie dodano dane.`);
      } else {
        return res.text().then((text) => {
          throw new Error(text);
        });
      }
      console.log(res);
    })
    .catch((error) =>
      alert(
        `Problem podczas dodawania danych o nastepujacym numerze id: ${id} \nOdpowiedz serwera: \n${error}`
      )
    );
}

// remove measurements from json server
function removeData() {
  const id = document.getElementById("mySelect").value;

  fetch(`${SERVER}/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        fetchData();
        alert(`Pomyslnie usunieto dane o nastepujacym numerze id: ${id}`);
      } else {
        return res.text().then((text) => {
          throw new Error(text);
        });
      }
      console.log(res);
    })
    .catch((error) =>
      alert(
        `Problem podczas usuwania danych o nastepujacym numerze id: ${id} \nOdpowiedz serwera: \n${error}`
      )
    );
}

// edit measurements from json server
function updateData() {
  const id = document.getElementById("mySelect2").value;

  for (var i = 0; i < measurements.length; i++) {
    if (id === measurements[i].id) {
      var weight = measurements[i].weight;
      var height = measurements[i].height;
      var kcal = measurements[i].kcal;
    }
  }
  const weightEd = document.getElementById("weight-edit").value;
  const heightEd = document.getElementById("height-edit").value;
  const kcalEd = document.getElementById("kcal-edit").value;

  if (weightEd !== null && weightEd !== "") {
    weight = parseFloat(weightEd);
  }
  if (heightEd !== null && heightEd !== "") {
    height = parseInt(heightEd);
  }
  if (kcalEd !== null && kcalEd !== "") {
    kcal = parseInt(kcalEd);
  }

  fetch(`${SERVER}/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, weight, height, kcal }),
  })
    .then((res) => {
      if (res.ok) {
        fetchData();
        alert(`Pomyslnie zedytowano dane o nastepujacym numerze id: ${id}`);
      } else {
        return res.text().then((text) => {
          throw new Error(text);
        });
      }
      console.log(res);
    })
    .catch((error) =>
      alert(
        `Problem podczas edytowania danych o nastepujacym numerze id: ${id} \nOdpowiedz serwera: \n${error}`
      )
    );
}

// create selection
function selection() {
  var myDiv = document.getElementById("myDiv");
  myDiv.innerHTML = "";
  var selectList = document.createElement("select");
  selectList.setAttribute("id", "mySelect");
  myDiv.appendChild(selectList);

  for (var i = 0; i < measurements.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", measurements[i].id);
    option.text = measurements[i].id;
    selectList.appendChild(option);
  }
}

//create second selection
function selection2() {
  var myDiv2 = document.getElementById("myDiv2");
  myDiv2.innerHTML = "";
  var selectList2 = document.createElement("select");
  selectList2.setAttribute("id", "mySelect2");
  myDiv2.appendChild(selectList2);

  for (var i = 0; i < measurements.length; i++) {
    var option2 = document.createElement("option");
    option2.setAttribute("value", measurements[i].id);
    option2.text = measurements[i].id;
    selectList2.appendChild(option2);
  }
}

//create a table
function table() {
  var table = document.getElementById("myTable");

  for (var i = 0; i < measurements.length; i++) {
    var row = table.insertRow(i + 1);
    var celId = row.insertCell(0);
    var celWeight = row.insertCell(1);
    var celHeight = row.insertCell(2);
    var celBMI = row.insertCell(3);
    var celKcal = row.insertCell(4);

    celId.innerHTML = measurements[i].id;
    celWeight.innerHTML = measurements[i].weight;
    celHeight.innerHTML = measurements[i].height;
    celKcal.innerHTML = measurements[i].kcal;
    h = (measurements[i].height / 100) * (measurements[i].height / 100);
    bmi = (measurements[i].weight / h).toFixed(2);
    celBMI.innerHTML = bmi;
  }
}
// sort a table
function sortTable(index) {
  let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("myTable");
  switching = true;

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[index];
      y = rows[i + 1].getElementsByTagName("td")[index];

      if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}



fetchData();
