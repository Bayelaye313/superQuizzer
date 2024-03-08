let searchedQuestions = [];

function detectNewMessage() {
  const messageForm = document.querySelector("#main");
  if (messageForm) {
    messageForm.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        processlastQuestion();
      }
    });
  }
}

function processlastQuestion() {
  const lastQuestion = document.querySelectorAll("div.message-in.focusable-list-item strong._11JPr");
  const lastElement = lastQuestion[lastQuestion.length - 1];
  if (lastElement) {
    const boldTextContent = lastElement.textContent.trim();
    if (!searchedQuestions.includes(boldTextContent) && boldTextContent.endsWith("?")) {
      searchedQuestions.push(boldTextContent);
      chrome.runtime.sendMessage({
        action: "boldText",
        boldText: boldTextContent
      });
    }
  }
}

detectNewMessage();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "answerFromGoogle") {
    const response = request.answerText;
    insertResponseInWhatsApp(response);
  }
});

function insertResponseInWhatsApp(response) {
  const inputField = document.querySelector("#main footer div._2_1wd");
  const mainText = document.querySelector("#rep")
  if (inputField) {
    inputField.textContent = response; // Insérer la réponse dans la zone de saisie
    mainText.textContent = response;
    inputField.dispatchEvent(new InputEvent("input", { bubbles: true })); // Déclencher un événement d'entrée pour WhatsApp
  }
}
