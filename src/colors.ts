export function RGBtoYIQ(rgb: number[]): number[] {
  const [r, g, b] = rgb
  const y = (r * 299 + g * 587 + b * 114) / 1000
  const i = (r * 596 + g * -274 + b * -322) / 1000
  const q = (r * 211 + g * 523 + b * 312) / 1000

  return [y, i, q]
}

const luminosityThreshold = 160

export function isLightBackground(el: Element) {
  const style = window.getComputedStyle(el)
  if (!style || !style.backgroundColor) return false
  const color = style!.backgroundColor!.match(/^rgb\((\d+),\s?(\d+),\s?(\d+)\)$/)
  if (!color) return false
  const rgb = color.slice(1, 4).map(x => parseInt(x))
  const yiq = RGBtoYIQ(rgb)
  return yiq[0] > luminosityThreshold
}
