// ==UserScript==
// @name         lib-ui.js
// @namespace    https://github.com/777555777/tampermonkey-lib
// @version      0.1.0
// @description  Provides ui elements
// @grant        unsafeWindow
// @match        *://*/*
// ==/UserScript==

/**
 * Erstellt einen einfachen Button und fügt ihn der Seite hinzu.
 * @param {string} btnText - Der Text, der auf dem Button angezeigt wird.
 * @param {Function} onClickFunction - Die Funktion, die beim Klicken auf den Button ausgeführt wird.
 */
const createSimpleButton = function (btnText, onClickFunction) {
  const btnStyles = `
    button#simpleBtn {
        border: none;
        background: hsl(26, 92%, 48%);
        color: hsl(0, 0%, 100%);
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        box-shadow: 3px 3px 5px rgba(58, 58, 58, 0.25);
        position: fixed;
        bottom: 16px;
        right: 16px;
        z-index: 99999;
        cursor: pointer;
    }
    button#simpleBtn:hover,
    button#simpleBtn:active {
        background: hsl(26, 92%, 42%);
    }
    button#simpleBtn:disabled {
        background: hsl(0, 0%, 45%);
        cursor: not-allowed;
    }
    `
  const styleSheet = document.createElement("style")
  styleSheet.type = "text/css"
  styleSheet.innerText = btnStyles
  document.head.appendChild(styleSheet)

  const runBtn = document.createElement("button")
  runBtn.id = "simpleBtn"
  runBtn.innerText = btnText
  document.body.appendChild(runBtn)

  runBtn.addEventListener("click", function () {
    try {
      onClickFunction(currentLocation)
    } catch (error) {
      throw new Error("onClick run script failed:", error)
    }
  })
}

unsafeWindow.createSimpleButton = createSimpleButton
