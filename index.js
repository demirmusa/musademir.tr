document.addEventListener("DOMContentLoaded", function () {
  const loadingElement = document.getElementById("loading");
  const typewriterElement = document.getElementById("typewriter");

  const messagesStr = `fetch("https://raw.githubusercontent.com/demirmusa/demirmusa/master/README.md")
  .then((response) => response.text())
  .then((markdown) => {
    const converter = new showdown.Converter();
    const html = converter.makeHtml(markdown);
    document.getElementById("markdown-content").innerHTML = html;
    hideLoader();
  })
  .catch((error) => {
    console.error("Error while loading markdown:", error);
    hideLoader();
  });
`;

  const messages = messagesStr.split("\n");

  let currentMessage = 0;
  let currentChar = 0;
  let isLoaderMinTimePassedOrFinished = false;

  function typeNextChar() {
    if (currentChar < messages[currentMessage].length) {
      typewriterElement.textContent += messages[currentMessage][currentChar];
      currentChar++;
      setTimeout(typeNextChar, 4);
    } else {
      currentChar = 0;
      currentMessage++;
      if (currentMessage < messages.length) {
        typewriterElement.textContent += "\n"; // Satır atla
        setTimeout(typeNextChar, 7);
      } else {
        isLoaderMinTimePassedOrFinished = true;
      }
    }
  }

  function fetchReadme() {
    fetch(
      "https://raw.githubusercontent.com/demirmusa/demirmusa/master/README.md"
    )
      .then((response) => response.text())
      .then((markdown) => {
        const converter = new showdown.Converter();
        const html = converter.makeHtml(markdown);
        document.getElementById("markdown-content").innerHTML = html;
        hideLoader();
      })
      .catch((error) => {
        console.error("Error while loading markdown:", error);
        hideLoader();
      });
  }

  function hideLoader() {
    if (!isLoaderMinTimePassedOrFinished) {
      setTimeout(hideLoader, 50);
      return;
    }
    loadingElement.classList.add("fade-out");
    setTimeout(() => (loadingElement.style.display = "none"), 1000);
  }

  typeNextChar();
  fetchReadme();
  setTimeout(() => (isLoaderMinTimePassedOrFinished = true), 2000);
});
