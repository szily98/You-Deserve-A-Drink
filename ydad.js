function searchCocktail() {
  const cocktailName = document.getElementById("cocktailNameInput").value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayCocktailResults(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function displayCocktailResults(data) {
  const cocktailResultsDiv = document.getElementById("cocktailResults");
  cocktailResultsDiv.innerHTML = "";

  if (data.drinks) {
    data.drinks.forEach((drink) => {
      const drinkName = drink.strDrink;
      const drinkInstructions = drink.strInstructions;
      const drinkImage = drink.strDrinkThumb;

      let ingredients = [];
      for (let i = 1; i <= 15; i++) {
        const ingredient = drink["strIngredient" + i];
        const measure = drink["strMeasure" + i];
        if (ingredient && measure) {
          ingredients.push(`${measure} ${ingredient}`);
        } else if (ingredient) {
          ingredients.push(ingredient);
        }
      }

      const drinkElement = document.createElement("div");
      drinkElement.classList.add("cocktail");

      let html = `
            <div class="drink-container">
                <h3>${drinkName}</h3>
                <p>${ingredients}</p>
                <p>${drinkInstructions}</p>
                <img src="${drinkImage}" alt="${drinkName}">
            </div>
        `;

      drinkElement.innerHTML = html;

      cocktailResultsDiv.appendChild(drinkElement);

      cocktailResultsDiv.appendChild(drinkElement);
    });
  } else {
    cocktailResultsDiv.innerHTML = "<p>No cocktails found.</p>";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const quoteButton = document.getElementById("quoteButton");
  const jokeButton = document.getElementById("jokeButton");
  const contentDiv = document.getElementById("content");

  quoteButton.addEventListener("click", function () {
    fetchQuote();
  });

  jokeButton.addEventListener("click", function () {
    fetchJoke();
  });

  function fetchQuote() {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        const quote = data.content;
        displayContent(quote);
      })
      .catch((error) => console.error("Error fetching quote:", error));
  }

  function fetchJoke() {
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((response) => response.json())
      .then((data) => {
        const setup = data.setup;
        const punchline = data.punchline;
        const joke = `${setup} ${punchline}`;
        displayContent(joke);
      })
      .catch((error) => console.error("Error fetching joke:", error));
  }

  function displayContent(content) {
    contentDiv.textContent = content;
  }
});

// Drink if you game

let buttonGame = document.getElementById("buttonGame");
let displayContainer = document.querySelector(".content");

let game = [
  `You’re still only on your first drink`,
  `You’re still sober!`,
  `You’re drinking wine`,
  `You’re drinking beer`,
  `You’ve never had a bad hangover`,
  `You’ve been drunk in the last 48 hours`,
  `You’ve ever been arrested`,
  `You’re a smoker`,
  `You’ve got children`,
  `You’ve never left the country`,
  `You can speak more than one language`,
  `You’re the tallest in the room`,
  `You’re the shortest in the room`,
  `You’ve never driven a car`,
  `You’ve got a tattoo`,
  `You’re wearing heels`,
  `You’re engaged or married`,
  `You’re single`,
  `You’ve been texting whilst playing this game!`,
];

const contentDiv = document.getElementById("content");

function displayContent(gameValue) {
  contentDiv.textContent = gameValue;
}

buttonGame.addEventListener("click", () => {
  let gameValue = game[Math.floor(Math.random() * game.length)];
  displayContent(gameValue);
});

async function assignRandomDrinks() {
  const player1 = document.getElementById("player1").value.trim();
  const player2 = document.getElementById("player2").value.trim();
  const player3 = document.getElementById("player3").value.trim();
  const player4 = document.getElementById("player4").value.trim();

  if (player1 === "" || player2 === "" || player3 === "" || player4 === "") {
    alert("Please enter names for all players.");
    return;
  }

  const response1 = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/random.php`
  );
  const data1 = await response1.json();
  const drink1 = data1.drinks[0].strDrink;

  const response2 = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/random.php`
  );
  const data2 = await response2.json();
  const drink2 = data2.drinks[0].strDrink;

  const response3 = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/random.php`
  );
  const data3 = await response3.json();
  const drink3 = data3.drinks[0].strDrink;

  const response4 = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/random.php`
  );
  const data4 = await response4.json();
  const drink4 = data4.drinks[0].strDrink;

  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = `
      <p><strong>${player1}</strong> gets <em>${drink1}</em></p>
      <p><strong>${player2}</strong> gets <em>${drink2}</em></p>
      <p><strong>${player3}</strong> gets <em>${drink3}</em></p>
      <p><strong>${player4}</strong> gets <em>${drink4}</em></p>
  `;
}

function takeSips() {
  const player1 = document.getElementById("player1").value.trim();
  const player2 = document.getElementById("player2").value.trim();
  const player3 = document.getElementById("player3").value.trim();
  const player4 = document.getElementById("player4").value.trim();

  const sips1 = Math.floor(Math.random() * 10) + 1;
  const sips2 = Math.floor(Math.random() * 10) + 1;
  const sips3 = Math.floor(Math.random() * 10) + 1;
  const sips4 = Math.floor(Math.random() * 10) + 1;

  const players = [];
  if (player1) players.push(player1);
  if (player2) players.push(player2);
  if (player3) players.push(player3);
  if (player4) players.push(player4);

  const randomPlayerIndex = Math.floor(Math.random() * players.length);
  const randomPlayer = players[randomPlayerIndex];

  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = `
      <p><strong>${randomPlayer}</strong>, take ${sips1} sips</p>
  `;

  for (let i = 0; i < players.length; i++) {
    if (i !== randomPlayerIndex) {
      resultContainer.innerHTML += `
              <p><strong>${players[i]}</strong>, take ${
        i % 2 === 0 ? sips1 : sips2
      } sips</p>
          `;
    }
  }
}

document
  .getElementById("cocktailForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const ingredients = document.getElementById("ingredients").value.trim();

    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredients}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.drinks === null) {
          document.getElementById("cocktailInfo").innerHTML =
            "No cocktails found with these ingredients.";
        } else {
          const randomIndex = Math.floor(Math.random() * data.drinks.length);
          const cocktailId = data.drinks[randomIndex].idDrink;
          fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`
          )
            .then((response) => response.json())
            .then((cocktailData) => {
              const cocktailName = cocktailData.drinks[0].strDrink;
              const cocktailIngredients = [];
              for (let i = 1; i <= 15; i++) {
                const ingredient = cocktailData.drinks[0][`strIngredient${i}`];
                if (ingredient) {
                  cocktailIngredients.push(ingredient);
                }
              }
              const cocktailInstructions =
                cocktailData.drinks[0].strInstructions;

              const cocktailHTML = `
                          <h2>${cocktailName}</h2>
                          <h3>Ingredients:</h3>
                          <ul>
                              ${cocktailIngredients
                                .map((ingredient) => `<li>${ingredient}</li>`)
                                .join("")}
                          </ul>
                          <h3>Instructions:</h3>
                          <p>${cocktailInstructions}</p>
                      `;
              document.getElementById("cocktailInfo").innerHTML = cocktailHTML;
            })
            .catch((error) =>
              console.error("Error fetching cocktail data:", error)
            );
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  });
