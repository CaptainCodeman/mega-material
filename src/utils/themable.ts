/*
 * Copyright © Reach Digital (https://www.reachdigital.io/)
 * See LICENSE.txt for license details.
 */
import { CSSResult, CSSResultArray } from 'lit-element'

const themes: Map<string, CSSResult[]> = new Map()

export const theme = (componentName: string, css: CSSResult): void => {
  themes.set(componentName, [...(themes.get(componentName) || []), css].filter(Boolean))
}

export const themable = (componentName: string): CSSResultArray => {
  return (themes.get(componentName) || []).filter(Boolean)
}
