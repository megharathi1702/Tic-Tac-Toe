let boxes= document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset_button");
let newgamebtn= document.querySelector("#newgame-btn");
let msg=document.querySelector("#msg");
let msgcontainer = document.querySelector(".msg-container");

let turnO= true;
let count=0;

const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const resetgame=()=>{
    turnO=true;
    enableboxes();
    msgcontainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled=true;
        count++;

        let iswinner = checkwinner();
        if (count === 9 && !iswinner) {
            gameDraw();
          }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgcontainer.classList.remove("hide");
    disableboxes();
}

const disableboxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableboxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulations , ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();

}

const checkwinner=()=>{
    for(let pattern of winPatterns){
        let pos1Val= boxes[pattern[0]].innerText;
        let pos2Val= boxes[pattern[1]].innerText;
        let pos3Val= boxes[pattern[2]].innerText;

        if(pos1Val!=""||pos2Val!=""||pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                console.log("winner", pos1Val);
                showWinner(pos1Val);
            }
        }

    }
};

newgamebtn.addEventListener("click", resetgame);
reset_btn.addEventListener("click",resetgame);

