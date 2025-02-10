// document.querySelector("#submit").addEventListener("click",submit);
document.querySelectorAll(".radioButton").forEach() .addEventListener("checked",changeChecked);

const players = document.querySelectorAll(".player");

// function submit(event){
//     const form = event.target;
//     const data = new FormData(form);

//     event.preventDefault();
// }

function changeChecked(event){
    const radio = event.target;
    for (let index = 0; index < players.length; index++) {
        if(index < radio.value){
            players[index].classList.add("invisible")
            players[index].classList.remove("visible")
        }
        else{
            players[index].classList.remove("invisible")
            players[index].classList.add("visible")
        }
    }
}