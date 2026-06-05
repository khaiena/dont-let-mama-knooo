'use client'

const FOLDERS = [
  { id: 'photos',  icon: '🖼️', name: 'Photos',  items: 6 },
  { id: 'music',   icon: '🎵', name: 'Music',   items: 10 },
  { id: 'videos',  icon: '📹', name: 'Videos',  items: 5 },
  { id: 'work',    icon: '💼', name: 'Work',    items: 8 },
]

import { useWindowStore, WindowId } from '../../store/windowStore'

export default function MyDocuments() {
  const { openWindow } = useWindowStore()

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      fontFamily: 'Tahoma, Arial, sans-serif',
    }}>
      <div style={{
        padding: '4px 8px',
        background: '#d4d0c8',
        borderBottom: '1px solid #808080',
        fontSize: '11px',
        color: '#555',
      }}>
        📁 My Documents — {FOLDERS.length} folders
      </div>

      <div style={{
        flex: 1,
        padding: '12px',
        background: 'white',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        alignContent: 'flex-start',
      }}>
        {FOLDERS.map(folder => (
          <button
            key={folder.id}
            onDoubleClick={() => openWindow(folder.id as WindowId)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              width: '72px',
              padding: '8px 4px',
              background: 'transparent',
              border: '1px solid transparent',
              cursor: 'default',
              fontFamily: 'Tahoma, Arial, sans-serif',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,0,128,0.1)'
              e.currentTarget.style.border = '1px dotted #000080'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.border = '1px solid transparent'
            }}
          >
            <span style={{ fontSize: '36px' }}>{folder.icon}</span>
            <span style={{ fontSize: '11px', textAlign: 'center', lineHeight: '1.3' }}>
              {folder.name}
            </span>
            <span style={{ fontSize: '9px', color: '#888' }}>
              {folder.items} items
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}