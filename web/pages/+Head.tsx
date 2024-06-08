import { ReactNode } from 'react'

export default function HeadDefault({ children }: { children?: ReactNode }) {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content" />
      {children}
    </>
  )
}
