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
    })
    .catch((error) => console.log("Błąd: ", error));
}


// adding new measurements to json server 
function addData() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const kcal = parseFloat(document.getElementById("kcal").value);
  id=`${parseInt(measurements[measurements.length-1].id) + 1}`;
  fetch(SERVER, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id, weight, height, kcal}),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.log("Błąd: ", error));
}

// remove measurements from json server
function removeData() {
  const id = document.getElementById('mySelect').value;

  fetch(`${SERVER}/${id}`, {
    method: "DELETE",
    })
    .then((res) => {
      if (res.ok) {
        fetchData();
        alert(`Pomyslnie usunieto dane o nastepujacym numerze id: ${id}`);
      } else {
        return res.text().then(text => {throw new Error(text)});
      }
      console.log(res);
    })
    .catch((error) => alert(`Problem podczas usuwania danych o nastepujacym numerze id: ${id} \nOdpowiedz serwera: \n${error}`));

}

// edit measurements from json server
function updateData() {
  const id = document.getElementById('mySelect2').value;
  
  for (var i = 0; i < measurements.length; i++) {
    if (id === measurements[i].id) {
      var weight = measurements[i].weight;
      var height = measurements[i].height;
      var kcal = measurements[i].kcal;
    }
  }
  const weightEd = document.getElementById('weight-edit').value;
  const heightEd = document.getElementById('height-edit').value;
  const kcalEd = document.getElementById('kcal-edit').value;
  
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
    body: JSON.stringify({ id, weight, height, kcal}),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      console.log(measurements.length);
    })
    .catch((error) => console.log("Błąd: ", error));

}


// create select
function selection() {
  var myDiv = document.getElementById("myDiv");

  //Create and append select list
  var selectList = document.createElement("select");
  selectList.setAttribute("id", "mySelect");
  myDiv.innerHTML = '';
  myDiv.appendChild(selectList);
  
  //Create and append the options
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

  //Create and append select list
  var selectList2 = document.createElement("select");
  selectList2.setAttribute("id", "mySelect2");
  myDiv2.innerHTML = '';
  myDiv2.appendChild(selectList2);
  
  //Create and append the options
  for (var i = 0; i < measurements.length; i++) {
      var option2 = document.createElement("option");
      option2.setAttribute("value", measurements[i].id);
      option2.text = measurements[i].id;
      selectList2.appendChild(option2);
  }
}

fetchData();
//document.addEventListener("DOMContentLoaded", selection);
//updateData();