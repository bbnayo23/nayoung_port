import * as icons from '../index'
import type { ComponentType } from 'react'
import type { IconProps } from '../index'

const entries = Object.entries(icons).filter(
  ([name]) => name.startsWith('Icon'),
) as [string, ComponentType<IconProps>][]

export function Showcase() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>@port/icon-library</h1>
      <p style={{ color: '#666' }}>{entries.length}개 아이콘</p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem',
        }}
      >
        {entries.map(([name, Icon]) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem',
              border: '1px solid #eee',
              borderRadius: 8,
            }}
          >
            <Icon size={32} />
            <code style={{ fontSize: 12 }}>{name}</code>
          </div>
        ))}
      </div>
    </main>
  )
}
