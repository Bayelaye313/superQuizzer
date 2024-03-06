let searchedQuestions = [];

function detectNewMessage() {
  const messageForm = document.querySelector("#main > div._3B19s > div > div._5kRIK > div.n5hs2j7m.oq31bsqd.gx1rr48f.qh5tioqs > div:nth-child(27) > div > div > div.UzMP7._1uv-a > div._1BOF7._2AOIt > div:nth-child(1) > div > div.copyable-text > div > span._11JPr.selectable-text.copyable-text > span > strong");
  if (messageForm) {
    messageForm.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        chrome.runtime.sendMessage({ action: "newMessage" });
      }
    });
  }
}

function processLastBoldTextEndingWithQuestionMark() {
  const lastBoldTextEndingWithQuestionMark = document.querySelectorAll("div.message-in.focusable-list-item._1AOLJ._2UtSC._1jHIY strong._11JPr");
  const lastElement = lastBoldTextEndingWithQuestionMark[lastBoldTextEndingWithQuestionMark.length - 1];
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
  processLastBoldTextEndingWithQuestionMark();
});

observer.observe(document.body, { subtree: true, childList: true });
