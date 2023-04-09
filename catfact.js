const catFactText = document.getElementById("catfact");

async function getCatFact() {
	let obj = await fetch("https://meowfacts.herokuapp.com/");
	let data = await obj.json();
	let fact = data.data[0];
	console.info(`Cat fact: ${fact}`);
	catFactText.innerHTML = fact;
}

getCatFact();
