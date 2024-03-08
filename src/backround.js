chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "boldText") {
    const boldText = request.boldText;
    const searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(boldText);
    
    chrome.tabs.create({ url: searchUrl }, (tab) => {
      chrome.scripting.executeScript(tab.id, {
        function: extractAnswerFromGoogleDOM,
        args: [boldText]
      });
    });
  }
});

function extractAnswerFromGoogleDOM(boldText) {
  const answerElement = document.querySelector("span.ILfuVd b");
  if (answerElement) {
    const answerText = answerElement.textContent.trim();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "answerFromGoogle", answerText: answerText });
    });
  }
}
