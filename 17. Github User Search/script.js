const APIURL = "https://api.github.com/users/";

const form = document.querySelector("#form");
const search = document.getElementById("search");
const card = document.querySelector(".card");
const notFound = document.getElementById("notFound");
const found = document.getElementById("found");

const img = document.querySelector(".avatar");
const name = document.getElementById("name");
const bio = document.getElementById("bio");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repository = document.getElementById("repository");

// Can use then , catch as well
// axios
//   .get(APIURL + "abhinavjeph")
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

const getUser = async (username) => {
  try {
    // destructure res object to get data
    const { data } = await axios(APIURL + username);
    createCard(data);
  } catch (err) {
    console.log(err.response.status);
    if (err.response.status == 404) {
      createCard();
    }
  }
};

function createCard(userData) {
  if (!userData) {
    notFound.style.display = "block";
    found.style.display = "none";

    const mssgHtml = "<h1>User not found :(</h1>";
    notFound.innerHTML = mssgHtml;
  } else {
    notFound.style.display = "none";
    found.style.display = "flex";

    img.src = userData.avatar_url;
    name.innerText = userData.login;
    bio.innerText = userData.bio;
    followers.innerText = userData.followers;
    following.innerText = userData.following;
    repository.innerText = userData.public_repos;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  card.style.display = "block";
  getUser(search.value);
  search.value = "";
});
