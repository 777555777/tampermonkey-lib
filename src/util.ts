/**
 * Wählt sicher ein DOM-Element aus und gibt ein Konsolen error aus falls das Selektieren fehlschlägt.
 * @param selector - Der Selektor des Elements.
 * @param sourceElement - Das Element, in dem gesucht werden soll.
 * @returns Das ausgewählte Element oder undefined, wenn das Element nicht gefunden wurde.
 */
export function querySelectorSafe(selector: string, sourceElement: Document | Element = document): Element | undefined {
  let element = sourceElement.querySelector(selector)
  if (element) {
    return element
  } else {
    console.error(`Selector: ${selector} was not able to find a value!`)
    return undefined
  }
}

/**
 * Erzeugt eine Promise, die nach einer bestimmten Anzahl von Millisekunden plus einer zufälligen Verzögerung erfüllt wird.
 * @param milliseconds - Die Anzahl der Millisekunden, die mindestens gewartet werden soll.
 * @param maxRandom - Die obere Grenze für die zusätzliche zufällige Verzögerung.
 * @returns Eine Promise, die nach der angegebenen Anzahl von Millisekunden plus der zufälligen Verzögerung erfüllt wird.
 */
export function sleep(milliseconds: number, maxRandom: number = 0): Promise<void> {
  const randomDelay = Math.floor(Math.random() * maxRandom)
  return new Promise((resolve) => setTimeout(resolve, milliseconds + randomDelay))
}
