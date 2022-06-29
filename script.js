import { q, createCard } from "./utils.js";
import { GET, POST, DELETE } from "./api.js";

const BASE_URL = "https://edgemony-backend.herokuapp.com/series";

const removeSerieBtnEl = q(".remove-serie");
const deleteInputEl = q(".delete");

const body = {
  favorite: false,
  genres: ["scifi"],

  new: false,
  poster: "https://images-na.ssl-images-amazon.com/images/I/91MteSqsrJL.jpg",
  rating: 50,
  seasons: 4,
  title: "Rick e Morty",
};

// ------------ il nuovo GET tramite funzione async/await
GET(BASE_URL).then((data) => {
  data.map((serie) => {
    const imgOrPlaceholder = serie.poster || "https://picsum.photos/200/300";

    try {
      // if (!serie.description) {
      //   throw new Error('La serie non contiene una descrizione');
      // }
      createCard(document.body, imgOrPlaceholder, serie.title, serie.id);
    } catch (error) {
      console.log(error);
    }
  });
});

// ------------ il nuovo DELETE tramite funzione async/await
deleteInputEl.addEventListener("input", (eventInput) => {
  removeSerieBtnEl.addEventListener("click", (eventClick) => {
    DELETE(BASE_URL, eventInput.target.value).then(() => location.reload());
  });
});

const submitBtnel = q(".submitSerie");
const body2 = {};
const titleInputEl = q(".titleToAdd");
const urlInputEl = q(".posterToAdd");
const yearInputEl = q(".yearToAdd");

titleInputEl.addEventListener("input", (event) => {
  body2["title"] = event.target.value;
});
urlInputEl.addEventListener("input", (event) => {
  body2["poster"] = event.target.value;
});
yearInputEl.addEventListener("input", (event) => {
  body2["year"] = event.target.value;
});

submitBtnel.addEventListener("click", () => {
  POST(BASE_URL, body2).then(() => location.reload());
});

// const addingPoster = document.getElementById("posterToAdd").value;
// console.log(addingPoster);
// const addingYear = document.getElementById("yearToAdd").value;
// console.log(addingYear);
