const exampleWord = document.getElementById("ex_word");

async function isWord(word) {
    const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    const res = await fetch(URL, {method: "HEAD"});

    return (res.status == 200);
}

async function getRandomWord() {
    const url = "https://random-word-api.herokuapp.com/word";

    let obj;

    let res = await fetch(url);

    obj = await res.json();

    return obj[0];
}

let randomword;

async function getExampleWord() {
	while(true) {
		randomword = await getRandomWord();
		let isValidWord = await isWord(randomword);
		if (isValidWord) {
			break;
		}
	}
	exampleWord.innerHTML = `${randomword}`;
	console.info(`Example word is ${randomword}`);
}

getExampleWord();
