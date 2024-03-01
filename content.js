// content.js

// Fonction pour détecter le texte en gras sur la page
function getTextInBold() {
    const boldElements = document.querySelectorAll("b, strong"); // Sélectionne les éléments en gras
    const boldTexts = Array.from(boldElements).map(element => element.textContent.trim()); // Récupère le texte des éléments en gras
    return boldTexts;
  }
  
  // Envoie le texte en gras au script d'arrière-plan
  chrome.runtime.sendMessage({
    action: "boldText",
    boldTexts: getTextInBold()
  });
  