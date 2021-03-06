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
const repoBox = document.getElementById("repoBox");

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
    getRepos(username);
  } catch (err) {
    console.log(err.response.status);
    if (err.response.status == 404) {
      createCard();
    }
  }
};

async function getRepos(username) {
  try {
    const { data } = await axios(APIURL + username + "/repos?sort=created");
    addReposToCard(data);
  } catch (err) {
    console.log(err);
    console.log("Problem in adding repos");
  }
}

function addReposToCard(repos) {
  repos.splice(0, 10).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.innerText = repo.name;
    repoEl.target = "_blank";
    repoBox.appendChild(repoEl);
  });
}

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
  if (search.value) {
    card.style.display = "block";
    repoBox.innerHTML = "";
    getUser(search.value);
    search.value = "";
  }
});
