// background.js

// Écoute les messages envoyés par content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "boldText") {
    console.log("Texte en gras détecté :", request.boldText);
    const boldText = request.boldText;
    // Lance une recherche web pour le texte en gras
    const searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(boldText);
    console.log("URL de recherche :", searchUrl);
    chrome.tabs.create({url: searchUrl});
  }
});
  