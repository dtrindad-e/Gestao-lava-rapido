const vehicles = {};

function getRodizio(placa) {
  const final = placa.slice(-1);
  const mapa = {
    "1": "Segunda-feira", "2": "Segunda-feira",
    "3": "Terça-feira",   "4": "Terça-feira",
    "5": "Quarta-feira",  "6": "Quarta-feira",
    "7": "Quinta-feira",  "8": "Quinta-feira",
    "9": "Sexta-feira",   "0": "Sexta-feira"
  };
  return mapa[final] || "Desconhecido";
}

const form = document.getElementById("vehicle-form");
const listDiv = document.getElementById("vehicle-list");
const totalDiv = document.querySelector(".total");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const categoria = document.getElementById("categoria").value.toUpperCase();
  const modelo = document.getElementById("modelo").value;
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const placa = document.getElementById("placa").value;

  if (!vehicles[categoria]) vehicles[categoria] = [];
  vehicles[categoria].push({ modelo, quantidade, placa });

  form.reset();
  render();
});

function render() {
  listDiv.innerHTML = "";
  let total = 0;

  for (const cat in vehicles) {
    const header = document.createElement("div");
    header.className = "category";
    header.textContent = `🔹 ${cat} — Total: ${vehicles[cat].length}`;
    listDiv.appendChild(header);

    vehicles[cat].forEach((v, i) => {
      const item = document.createElement("div");
      item.className = "vehicle";
      item.innerHTML = `• ${v.modelo} – ${v.quantidade} (Rodízio: ${getRodizio(v.placa)}) <span onclick="removeItem('${cat}', ${i})">🗑️</span>`;
      listDiv.appendChild(item);
      total++;
    });
  }

  totalDiv.textContent = `📊 Total Geral: ${total} veículos`;
}

function removeItem(categoria, index) {
  vehicles[categoria].splice(index, 1);
  if (vehicles[categoria].length === 0) delete vehicles[categoria];
  render();
}