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

/**
 * Lädt eine Datei von einer gegebenen URL herunter und zeigt dabei einen Lade-Indikator an.
 * @param {string} fileUrl - Die URL der Datei, die heruntergeladen werden soll.
 * @param {string} fileName - Der Name, unter dem die Datei gespeichert werden soll.
 */
async function downloadFileWithProgress(fileUrl, fileName) {
  const loadingIndicator = createLoadingIndicator()

  try {
    const response = await fetch(fileUrl)
    const reader = response.body.getReader()
    const contentLength = +response.headers.get("Content-Length")
    let receivedLength = 0
    const chunks = []

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
      receivedLength += value.length

      // Fortschrittsanzeige aktualisieren
      updateLoadingIndicator(loadingIndicator, receivedLength, contentLength)
    }

    const blob = new Blob(chunks)
    const a = document.createElement("a")
    const objectUrl = URL.createObjectURL(blob)
    a.href = objectUrl
    a.download = fileName
    document.body.appendChild(a)
    a.style.display = "none"
    a.click()
    URL.revokeObjectURL(objectUrl)
    document.body.removeChild(a)
  } catch (err) {
    console.error("Error downloading the file: ", err)
  } finally {
    removeLoadingIndicator(loadingIndicator)
  }
}

unsafeWindow.querySelectorSafe = querySelectorSafe
unsafeWindow.sleep = sleep
unsafeWindow.downloadFileWithProgress = downloadFileWithProgress
