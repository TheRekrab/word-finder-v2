const resultTitle = document.getElementById("result_title");
const resultText = document.getElementById("result_text");
const exWord = document.getElementById("ex_word");
const searchForm = document.getElementById("search_bar");
const searchBtn = document.getElementById("search_btn");
const searchInput = document.getElementById("search_input");

async function defineWord() {

	const word = searchInput.value.trim();

	if (word === "") {
		searchInput.value = ""; // No empty words!
		return;
	}

	console.info(`Search for ${word} starting...`);

	const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

	let res = await fetch(URL);

	let obj = await res.json();

	let code = res.status;

	if (code === 404) {
		// Not a word
		resultTitle.innerHTML = `${word}:`;
		resultText.innerHTML = "<span class=\"definition\">Sorry, pal. No definitions found.</span>";
		return;
	}

	let html = "";

	let definitions = obj[0].meanings;

	for (let useCase of definitions) {
		let partOfSpeech = useCase.partOfSpeech;
		html += `<i>${partOfSpeech}:</i><br>`;
		console.debug(partOfSpeech);
		for (let definition of useCase.definitions) {
			html += `<span class="definition">-> ${definition.definition}</span><br>`;
			console.debug(`${definition.definition}`);
		}
		html += "<br>";
	}

	resultTitle.innerHTML = `${word}:`;
	resultText.innerHTML = html;
	
	searchInput.value = "";
}

searchForm.onsubmit = function () {
	defineWord();
	return false;
}
