const outputDiv = document.getElementById("outputDiv");
const nameHeader = document.getElementById("nameHeader");
const submitButton = document.getElementById("submitButton");
const nameTextBox = document.getElementById("nameTextBox");


window.onload = () => {
    submitButton.onclick = onSubmitButtonClicked;
}



function onSubmitButtonClicked(){
    outputDiv.innerHTML = "";
    getName(nameTextBox.value);
}
async function getName(name){
    nameHeader.innerHTML = `Estimated Nationality of ${name}`
    try{
        const data = await nationalizeIo(name);
        console.log(data);
        for(let i of data.country){
            let percentage = Math.floor(i.probability * 100) + "%";
            let countryCode = i.country_id;
            let output = `Country: ${countryCode}, Probability: ${percentage}`
            outputDiv.appendChild(createParagraph(output))
        }



    } catch(error){
        console.log("Error calling API");
    }
}


function createParagraph(content){
    let p = document.createElement("p");
    p.classList.add("h4");
    p.textContent = content;
    return p;
}


async function nationalizeIo(name) {
    let response = await fetch(
        `https://api.nationalize.io?name=${name}`);
    let data = await response.json();

    return data;
}

