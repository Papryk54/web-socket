const loginForm = document.getElementById("welcome-form");
const messagesSection = document.getElementById("messages-section");
const messagesList = document.getElementById("messages-list");
const addMessageForm = document.getElementById("add-messages-form");
const userNameInput = document.getElementById("username");
const messageContentInput = document.getElementById("message-content");

let userName = "";

const login = (e) => {
	e.preventDefault();
	if (userNameInput.value === "" || !userNameInput) {
		alert("Username can't be empty");
	}
	userName = userNameInput.value;
};

loginForm.addEventListener("submit", login);

function addMessage(author, content) {
	const message = document.createElement("li");
	message.classList.add("message");
	message.classList.add("message--received");
	if (author === userName) message.classList.add("message--self");
	message.innerHTML = `
    <h3 class="message__author">${userName === author ? "You" : author}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
	messagesList.appendChild(message);
}

const sendMessage = (e) => {
	e.preventDefault();
	if (messageContentInput.value === "" || !messageContentInput) {
		alert("Message field can't be empty");
		return;
	}
	addMessage(userName, messageContentInput.value);
	messageContentInput.value = "";
};

addMessageForm.addEventListener("submit", sendMessage);
