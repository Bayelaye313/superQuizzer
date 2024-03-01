// background.js

// Écoute les messages envoyés par content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "boldText") {
      const boldTexts = request.boldTexts;
      // Lance une recherche web pour chaque texte en gras
      boldTexts.forEach(text => {
        chrome.tabs.create({url: "https://www.google.com/search?q=" + encodeURIComponent(text)});
      });
    }
  });
  