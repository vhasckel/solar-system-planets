const planetContainer = document.querySelector("#planets-container");
const filterInput = document.querySelector("#filter");
const planetNotFound = document.querySelector(".not-found");

const getPlanets = async () => {
  const response = await fetch(
    `https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "caeb637140mshdda52c75192f919p1abe7fjsnbbcef2e106a0",
        "X-RapidAPI-Host": "planets-info-by-newbapi.p.rapidapi.com",
      },
    }
  );
  return await response.json();
};

const addPlanetsIntoDOM = async () => {
  const planets = await getPlanets();
  console.log(getPlanets());
  const planetsTemplate = planets
    .map(
      (data) =>
        `
      <div class="card-container">
        <div class="card-title">
          <img src="${data.imgSrc.img}" alt="${data.imgDescription}"/>
          <h1>${data.name}</h1>
        </div>
        <div>
          <p>${data.description}</p>
        </div>
      </div>
  `
    )
    .join("");
  planetContainer.innerHTML += planetsTemplate;
};
addPlanetsIntoDOM();

const showPlanetIfMatchInputValue = (inputValue) => (card) => {
  const planetName = card
    .querySelector(".card-title")
    .textContent.toLowerCase();
  const cardContainerInputValues = planetName.includes(inputValue);

  if (cardContainerInputValues) {
    card.style.display = "flex";
    return;
  }
  card.style.display = "none";

};

const handleInputValue = () => {
  const inputValue = event.target.value.toLowerCase();
  const cards = document.querySelectorAll(".card-container");
  cards.forEach(showPlanetIfMatchInputValue(inputValue));
};

filterInput.addEventListener("input", handleInputValue);
