const buttonSend = document.querySelector("#send");
const input = document.querySelector("#input");
const divDisplay = document.querySelector(".message-container");

const socket = io();
socket.on("connect", () => console.log("socket connected!"));

const createBubbleChat = chat => {
    const divMessage = document.createElement("div");
    divMessage.classList.add("message");
    divMessage.innerHTML = chat;
    return divMessage;
}

buttonSend.addEventListener("click", () => {
    const bubbleChat = createBubbleChat(input.value);
    divDisplay.appendChild(bubbleChat);
    socket.emit("send-message", input.value);
    input.value = "";
});

socket.on("new-message", (socketId, message) => {
    const bubbleChat = createBubbleChat(`${socketId} | ${message}`);
    bubbleChat.classList.add("message-r");
    divDisplay.appendChild(bubbleChat);
})