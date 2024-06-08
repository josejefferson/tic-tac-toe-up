/**
 * Paste richly formatted text.
 *
 * @param {string} rich - the text formatted as HTML
 * @param {string} plain - a plain text fallback
 * https://stackoverflow.com/a/77305170/16787637
 */
export async function copyRichText(rich: string, plain: string) {
  if (typeof ClipboardItem !== 'undefined') {
    // Shiny new Clipboard API, not fully supported in Firefox.
    // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API#browser_compatibility
    const html = new Blob([rich], { type: 'text/html' })
    const text = new Blob([plain], { type: 'text/plain' })
    const data = new ClipboardItem({ 'text/html': html, 'text/plain': text })
    await navigator.clipboard.write([data])
  } else {
    // Fallback using the deprecated `document.execCommand`.
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#browser_compatibility
    const cb = (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/html', rich)
      e.clipboardData?.setData('text/plain', plain)
      e.preventDefault()
    }
    document.addEventListener('copy', cb)
    document.execCommand('copy')
    document.removeEventListener('copy', cb)
  }
}
