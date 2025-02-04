type Address = {
  no: number | string;
  street: string;
  state: string;
  country: "IN" | "US";
};

type Player<T = Address> = {
  name: string;
  game: string;
  age?: number;
  address?: T;
};

const players: Player[] = [
  { name: "Raghav", game: "bb" },
  { name: "Arun", game: "fb" },
  {
    name: "Lokesh",
    game: "cricket",
    address: { no: 12, street: "2nd main", state: "Ka", country: "US" },
  },
];

const p: Player<string> = {
  name: "dfds",
  game: "dsfds",
  address: "fgfgrtgergre",
};

type PlayerSort = (players: Player[]) => Player[];

const sort: PlayerSort = function (ps) {
  ps.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  return ps;
};

console.log(sort(players));
