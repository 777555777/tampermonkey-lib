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
      onClickFunction()
    } catch (error) {
      throw new Error("onClick run script failed:", error)
    }
  })
}

/**
 * Erstellt und zeigt einen einfachen Lade-Indikator (Spinner) an.
 * @returns {HTMLElement} Das Lade-Indikator-Element.
 */
function createLoadingIndicator() {
  const loadingDiv = document.createElement("div")
  loadingDiv.id = "loadingIndicator"
  loadingDiv.innerHTML = `
    <div
    style="
        width: 300px;
        height: 200px;
        border-radius: 16px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99999;
        background: rgba(100, 100, 100, 0.25);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        border: 1px solid rgba(255, 255, 255, 0.25);
    "
    >
    <div
        style="
        position: fixed;
        top: 53%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99999;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: Arial, sans-serif;
        "
    >
        <div
        style="
            border: 8px solid #f3f3f3;
            border-top: 8px solid hsl(26, 92%, 48%);
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 2s linear infinite;
        "
        ></div>
        <p style="margin-top: 1rem; text-align: center; color: hsl(26, 92%, 48%)">Download läuft...</p>
    </div>
    </div>
`
  document.body.appendChild(loadingDiv)
  return loadingDiv
}

/**
 * Entfernt den Lade-Indikator (Spinner) aus dem DOM.
 * @param {HTMLElement} loadingIndicator - Das Lade-Indikator-Element.
 */
function removeLoadingIndicator(loadingIndicator) {
  if (loadingIndicator) {
    document.body.removeChild(loadingIndicator)
  }
}

/**
 * Aktualisiert den Lade-Indikator mit dem Fortschritt des Downloads.
 * @param {HTMLElement} loadingIndicator - Das Lade-Indikator-Element.
 * @param {number} receivedLength - Die bisher empfangene Datenmenge in Bytes.
 * @param {number} contentLength - Die gesamte Datenmenge in Bytes.
 */
function updateLoadingIndicator(loadingIndicator, receivedLength, contentLength) {
  const percentage = (receivedLength / contentLength) * 100
  loadingIndicator.querySelector("p").innerText = `Download läuft... ${Math.floor(percentage)}%`
}

unsafeWindow.createSimpleButton = createSimpleButton
unsafeWindow.createLoadingIndicator = createLoadingIndicator
unsafeWindow.removeLoadingIndicator = removeLoadingIndicator
unsafeWindow.updateLoadingIndicator = updateLoadingIndicator
