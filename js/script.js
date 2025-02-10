document.querySelector("#submit").addEventListener("click",submit);
document.querySelectorAll(".radioButton").forEach() .addEventListener("checked",changeChecked);

function submit(event){
    const form = event.target;
    const data = new FormData(form);

    const nbPlayer = parseInt(data.get("nbPlayer"));
    console.log(nbPlayer);
    const   

    event.preventDefault();
}