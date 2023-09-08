function onPageLoad() {
  var lap = new XMLHttpRequest();

  lap.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
      const players = JSON.parse(this.responseText);
      var table = document.createElement("table");
      for (i = 0; i < players.length; i++) {
        var row = document.createElement("tr");
        var cell1 = document.createElement("td");

        cell1.appendChild(document.createTextNode(players[i].name));
        var cell2 = document.createElement("td");
        cell2.appendChild(document.createTextNode(players[i].game));
        var cell3 = document.createElement("td");
        var button = document.createElement("button");
        button.appendChild(document.createTextNode("DELETE"));
        cell3.appendChild(button);
        const playerName = players[i].name;
        button.addEventListener("click", function () {
          deleteplayer(playerName);
        });
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        table.appendChild(row);
      }

      document.querySelector("body").appendChild(table);
    }
  });

  lap.open("GET", "http://localhost:8081/");

  lap.send();
}

function deleteplayer(playerName) {
  var data = JSON.stringify({
    name: playerName,
  });

  var lap = new XMLHttpRequest();
  lap.withCredentials = true;

  lap.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
      location.reload();
    }
  });

  lap.open("DELETE", "http://localhost:8081/", true);
  lap.setRequestHeader("Content-Type", "application/json");
  lap.withCredentials = true;
  lap.send(data);
}
