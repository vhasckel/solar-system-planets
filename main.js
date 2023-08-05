import { apiKey } from "./key.js";

const planetContainer = document.querySelector("#planets-container");
const filterInput = document.querySelector("#filter");
const planetNotFound = document.querySelector(".not-found");

planetNotFound.style.display = "none";

const getPlanets = async () => {
  try {
    const response = await fetch(
      `https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": `${apiKey}`,
          "X-RapidAPI-Host": "planets-info-by-newbapi.p.rapidapi.com",
          "source": "/key.js",
          "headers": [
            {
              "key": "Content-Type",
              "value": "application/javascript"
            }
          ]
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const createPlanetCard = (data) => {
  return `
  <div class="card-container">
    <div class="card-title">
      <img src="${data.imgSrc.img}" alt="${data.imgDescription}"/>
      <h1>${data.name}</h1>
    </div>
    <div>
      <p>${data.description}</p>
    </div>
  </div>
`;
};

const addPlanetsIntoDOM = async () => {
  try {
    const planets = await getPlanets();
    const planetsToShow = planets.slice(0, 8);

    const planetsTemplate = planetsToShow.map(createPlanetCard).join("");

    planetContainer.innerHTML += planetsTemplate;

    planetNotFound.style.display =
      planetsToShow.length === 0 ? "block" : "none";
  } catch (error) {
    console.error(error);
  }
};
addPlanetsIntoDOM();

let timeoutInput;

const handleInputValue = (event) => {
  const inputValue = event.target.value.toLowerCase();
  const cards = document.querySelectorAll(".card-container");
  let foundMatchingPlanet = false;

  cards.forEach((card) => {
    const planetName = card
      .querySelector(".card-title")
      .textContent.toLowerCase();
    const cardContainerInputValues = planetName.includes(inputValue);

    if (cardContainerInputValues) {
      card.style.display = "flex";
      foundMatchingPlanet = true;
    } else {
      card.style.display = "none";
    }
  });

  if (!foundMatchingPlanet) {
    planetNotFound.style.display = "block";
  } else {
    planetNotFound.style.display = "none";
  }
};

filterInput.addEventListener("input", (event) => {
  clearTimeout(timeoutInput);
  timeoutInput = setTimeout(handleInputValue(event), 300);
});
