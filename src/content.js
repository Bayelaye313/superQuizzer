// Variable pour stocker le dernier texte récupéré
let lastProcessedText = '';

// Fonction pour récupérer et traiter le dernier texte en gras se terminant par un point d'interrogation
function processLastBoldTextEndingWithQuestionMark() {
  const lastBoldTextEndingWithQuestionMark = document.querySelector("div.message-in.focusable-list-item._1AOLJ._2UtSC._1jHIY strong._11JPr");

  if (lastBoldTextEndingWithQuestionMark) {
    const boldTextContent = lastBoldTextEndingWithQuestionMark.textContent.trim();

    // Vérifier si le texte est différent du dernier traité
    if (boldTextContent !== lastProcessedText && boldTextContent.endsWith("?")) {
      lastProcessedText = boldTextContent;

      // Envoie le texte en gras se terminant par un point d'interrogation au script d'arrière-plan
      chrome.runtime.sendMessage({
        action: "boldText",
        boldText: boldTextContent
      });
    }
  }
}

// Observer pour détecter les changements sur la page WhatsApp Web
const observer = new MutationObserver(() => {
  processLastBoldTextEndingWithQuestionMark();
});

// Démarre l'observation des changements sur la page
observer.observe(document.body, { subtree: true, childList: true });
