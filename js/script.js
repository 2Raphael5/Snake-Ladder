// document.querySelector("#submit").addEventListener("click",submit);

document.querySelectorAll(".radioButton").forEach(function (element) {
    element.addEventListener("change", changeChecked);
  });
  document.querySelectorAll("select").forEach(function (element) {
    element.addEventListener("change", changeOption);
});

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
            players[index].classList.remove("invisible")
            players[index].classList.add("visible")
        }
        else{
            players[index].classList.add("invisible")
            players[index].classList.remove("visible")
        }
    }
}
function changeOption(event){
    let select = event.target;
    alert(select.value);

}