// ==UserScript==
// @name         lib-util.js
// @namespace    https://github.com/777555777/tampermonkey-lib
// @version      0.1.0
// @description  Provides utility functions
// @grant        unsafeWindow
// @match        *://*/*
// ==/UserScript==

/**
 * Wählt sicher ein DOM-Element aus und gibt ein Konsolen error aus falls das Selektieren fehlschlägt.
 * @param {string} selector - Der Selektor des Elements.
 * @param {HTMLElement} [sourceElement=document] - Das Element, in dem gesucht werden soll.
 * @returns {HTMLElement | undefined} Das ausgewählte Element oder undefined, wenn das Element nicht gefunden wurde.
 */
function querySelectorSafe(selector, sourceElement = document) {
  const element = sourceElement.querySelector(selector)
  if (element) {
    return element
  } else {
    console.error(`Selector: ${selector} was not able to find a value!`)
    return undefined
  }
}

unsafeWindow.querySelectorSafe = querySelectorSafe

/**
 * Erzeugt eine Promise, die nach einer bestimmten Anzahl von Millisekunden plus einer zufälligen Verzögerung erfüllt wird.
 * @param {number} milliseconds - Die Anzahl der Millisekunden, die mindestens gewartet werden soll.
 * @param {number} [maxRandom=0] - Die obere Grenze für die zusätzliche zufällige Verzögerung.
 * @returns {Promise<void>} Eine Promise, die nach der angegebenen Anzahl von Millisekunden plus der zufälligen Verzögerung erfüllt wird.
 */
function sleep(milliseconds, maxRandom = 0) {
  const randomDelay = Math.floor(Math.random() * maxRandom)
  return new Promise((resolve) => setTimeout(resolve, milliseconds + randomDelay))
}

unsafeWindow.sleep = sleep

/**
 * Erstellt einen einfachen Button und fügt ihn der Seite hinzu.
 * @param {string} btnText - Der Text, der auf dem Button angezeigt wird.
 * @param {Function} onClickFunction - Die Funktion, die beim Klicken auf den Button ausgeführt wird.
 */
function createSimpleButton(btnText, onClickFunction) {
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
