const input = document.getElementById("input");
const searchBtn = document.getElementById("search");
const loading = document.getElementById("loading");
const defBox = document.getElementById("def");
const audioBox = document.getElementById("audio");
const not_found = document.getElementById("not_found");

const apiKey = "6576a802-4267-49b5-bfe1-a719bdc2eb95";

// getting subdirectory folder according to their documentation
function getSubdirectry(soundName) {
  if (soundName.startsWith("bix")) return "bix";
  if (soundName.startsWith("gg")) return "gg";
  if (soundName.startsWith("_")) return "number";
  for (let i = 0; i < 10; i++) {
    if (soundName[0] == i) return "number";
  }
  return soundName[0];
}

// Function to add audio element in audioBox
function renderSound(soundName) {
  const subdirectry = getSubdirectry(soundName);

  const audio = document.createElement("audio");
  audio.src = `https://media.merriam-webster.com/soundc11/${subdirectry}/${soundName}.wav`;
  audio.controls = true;

  audioBox.appendChild(audio);
}

// Main function -> fetch api
async function showResult(word) {
  loading.style.display = "block";
  defBox.innerHTML = "";
  audioBox.innerHTML = "";
  not_found.innerHTML = "";
  // AJAX call
  const response = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`
  );
  const data = await response.json();

  //   If no related word found (data is empty array)
  if (data.length == 0) {
    loading.style.display = "none";
    const textElement = document.createElement("div");
    textElement.innerText = "Word Not Found :(";
    not_found.appendChild(textElement);
  }

  //   If word not found, but have suggestions for it.
  else if (typeof data[0] === "string") {
    loading.style.display = "none";
    const question = document.createElement("h2");
    question.innerHTML = "Do you mean?";
    not_found.appendChild(question);

    data.forEach((element) => {
      const suggestion = document.createElement("span");
      suggestion.classList.add("suggestions", "colored");
      suggestion.innerText = element;
      //   adding click event on each suggestion
      suggestion.addEventListener("click", (e) => {
        const word = e.target.innerHTML;
        input.value = word;
        showResult(word);
      });
      not_found.appendChild(suggestion);
    });
  }

  //   If actual word found
  else {
    const definition = data[0].shortdef[0];
    loading.style.display = "none";
    defBox.innerText = definition;
    //   getting soundName
    const soundName = data[0].hwi.prs[0].sound.audio;
    if (soundName) {
      renderSound(soundName);
    }
  }
}

searchBtn.addEventListener("click", () => {
  const word = input.value;
  if (word != "") {
    showResult(word);
  }
});

document.addEventListener("keypress", (e) => {
  const word = input.value;
  //   e.which is depricated
  if (e.key == "Enter" && word != "") {
    showResult(word);
  }
});
