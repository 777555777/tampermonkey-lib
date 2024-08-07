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

// Funktionen zu unsafeWindow hinzufügen
unsafeWindow.querySelectorSafe = querySelectorSafe
unsafeWindow.sleep = sleep
