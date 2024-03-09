//le content js
let searchedQuestions = [];

function detectNewMessage() {
  const messageForm = document.querySelector("#main > div._3B19s  strong");
  if (messageForm) {
    messageForm.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        chrome.runtime.sendMessage({ action: "newMessage" });
      }
    });
  }
}

function processlastquestion() {
  const lastquestion = document.querySelectorAll("div.message-in.focusable-list-item strong._11JPr");
  const lastElement = lastquestion[lastquestion.length - 1];
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

const observer = new MutationObserver(() => {
  processlastquestion();
});

observer.observe(document.body, { subtree: true, childList: true });
