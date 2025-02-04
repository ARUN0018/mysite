var players = [
  { name: "Raghav", game: "bb" },
  { name: "Arun", game: "fb" },
  { name: "Lokesh", game: "cricket" },
];
var sort = function (players) {
  players.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  return players;
};
console.log(sort(players));
