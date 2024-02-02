const pokeApiUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const nameEle = document.getElementById("pokemon-name");
const idEle = document.getElementById("pokemon-id");
const weightEle = document.getElementById("weight");
const heightEle = document.getElementById("height");
const typesEle = document.getElementById("types");
const hpEle = document.getElementById("hp");
const attackEle = document.getElementById("attack");
const defenseEle = document.getElementById("defense");
const specialAttackEle = document.getElementById("special-attack");
const specialDefenseEle = document.getElementById("special-defense");
const speedEle = document.getElementById("speed");
const spriteContainer = document.getElementById("sprite-container");

const fetchData = async () => {
  try {
    const pokeNameOrId = searchInput.value.toLowerCase();
    const res = await fetch(`${pokeApiUrl}/${pokeNameOrId}`);
    const data = await res.json();

    nameEle.textContent = `${data.name.toUpperCase()}`;
    idEle.textContent = `#${data.id}`;
    weightEle.textContent = `Weight: ${data.weight}`;
    heightEle.textContent = `Height: ${data.height}`;
    spriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">`;

    hpEle.textContent = data.stats[0].base_stat;
    attackEle.textContent = data.stats[1].base_stat;
    defenseEle.textContent = data.stats[2].base_stat;
    specialAttackEle.textContent = data.stats[3].base_stat;
    specialDefenseEle.textContent = data.stats[4].base_stat;
    speedEle.textContent = data.stats[5].base_stat;

    //Setting types
    types.innerHTML = data.types.map(item => `<span class="type ${item.type.name}">${item.type.name}</span>`).join("");

  } catch (err) {
    resetDisplay();
    alert("Pokémon not found");
    console.log(`Pokémon not found Error: ${err}`)
  }

};


const resetDisplay = () => {
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove();

  nameEle.textContent = "";
  idEle.textContent = "";
  weightEle.textContent = "";
  heightEle.textContent = "";
  hpEle.textContent = "";
  attackEle.textContent = "";
  defenseEle.textContent = "";
  specialAttackEle.textContent = "";
  specialDefenseEle.textContent = "";
  speedEle.textContent = "";
  types.innerHTML = "";
};


// searchBtn.addEventListener("click", e => {
//   e.preventDefault();
//   fetchData();
// });

searchBtn.addEventListener("click", fetchData);

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchData();
  }
});
