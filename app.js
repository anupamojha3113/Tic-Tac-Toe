const boxes = document.querySelectorAll(".box");
const main = document.querySelector(".main");
const msgContainer = document.querySelector(".msgContainer");
const newGame = document.querySelectorAll(".reset-btn");
const msg = document.querySelector(".msg");
let cnt = 0;

const WinnerPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const updateBox = (box) => {
    box.addEventListener("click", () => {
        const currentPlayer = cnt % 2 === 0 ? "X" : "O";
        box.innerText = currentPlayer;
        cnt++;
        box.disabled = true;

        const winner = checkWinner();
        if (winner) {
            displayWinner(`Winner is ${winner}`);
            disableAllBoxes();
        } else if (cnt === 9) {
            displayWinner("Draw");
            disableAllBoxes();
        }
    });
};

const checkWinner = () => {
    for (const pattern of WinnerPattern) {
        const c_x = pattern.filter(i => boxes[i].disabled && boxes[i].innerText === "X").length;
        const c_o = pattern.filter(i => boxes[i].disabled && boxes[i].innerText === "O").length;
        if (c_x === 3) return "X";
        else if (c_o === 3) return "O";
    }
    return "";
};

const displayWinner = (winner) => {
    msgContainer.classList.remove("hide");
    msg.innerText = winner;
};

const disableAllBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
    main.classList.add("hide");
};

const enableAllBoxes = () => {
    main.classList.remove("hide");
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
};

boxes.forEach(updateBox);

newGame.forEach(btn => {
    btn.addEventListener("click", () => {
        enableAllBoxes();
        cnt = 0;
        msgContainer.classList.add("hide");
    });
});