import { useState } from 'react'

let portalRoot: HTMLDivElement | null = null

function getPortalRoot(): HTMLDivElement {
  if (!portalRoot) {
    portalRoot = document.createElement('div')
    portalRoot.id = 'portal-root'
    document.body.appendChild(portalRoot)
  }
  return portalRoot
}

export function usePortal(): HTMLDivElement {
  const [root] = useState(getPortalRoot)
  return root
}
