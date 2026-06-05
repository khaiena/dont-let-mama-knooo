
'use client'

import { useState, useEffect } from 'react'
import { useWindowStore, WindowId } from './store/windowStore'
import Window from './components/Window'
import Calculator from './components/apps/Calculator'
import Notepad from './components/apps/Notepad'
import Photos from './components/apps/Photos'
import Videos from './components/apps/Videos'
import Music from './components/apps/Music'
import Work from './components/apps/Work'
import Paint from './components/apps/Paint'
import MyDocuments from './components/apps/MyDocuments'
import RecycleBin from './components/apps/RecycleBin'
import EndingNote from './components/apps/EndingNote'

const DESKTOP_ICONS: { id: WindowId; label: string; icon: string }[] = [
  { id: 'my-documents', label: 'My Documents', icon: '📁' },
  { id: 'photos',       label: 'Photos',        icon: '🖼️' },
  { id: 'music',        label: 'Music',         icon: '🎵' },
  { id: 'videos',       label: 'Videos',        icon: '📹' },
  { id: 'work',         label: 'Work',          icon: '💼' },
  { id: 'paint',        label: 'Paint',         icon: '🎨' },
  { id: 'calculator',   label: 'Calculator',    icon: '🧮' },
  { id: 'notepad',      label: 'Notepad',       icon: '📝' },
  { id: 'recycle-bin',  label: 'Recycle Bin',   icon: '🗑️' },
  { id: 'ending-note' as WindowId, label: 'Note for Mama', icon: '💌' },
]

export default function Desktop() {
  const [time, setTime] = useState('')
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const { windows, openWindow } = useWindowStore()

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const h = now.getHours().toString().padStart(2, '0')
      const m = now.getMinutes().toString().padStart(2, '0')
      setTime(`${h}:${m}`)
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: 'var(--win-bg)' }}
      onClick={() => setSelectedIcon(null)}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-4">
        {DESKTOP_ICONS.map((icon) => (
          <button
            key={icon.id}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedIcon(icon.id)
            }}
            onDoubleClick={(e) => {
              e.stopPropagation()
              openWindow(icon.id)
            }}
            className="flex flex-col items-center gap-1 w-16 p-1 cursor-default"
            style={{
              background: selectedIcon === icon.id
                ? 'rgba(0,0,128,0.4)'
                : 'transparent',
              border: selectedIcon === icon.id
                ? '1px dotted white'
                : '1px solid transparent',
            }}
          >
            <span className="text-3xl">{icon.icon}</span>
            <span
              style={{
                color: 'white',
                fontSize: '11px',
                textShadow: '1px 1px 1px black',
                wordBreak: 'break-word',
                width: '100%',
                textAlign: 'center',
              }}
            >
              {icon.label}
            </span>
          </button>
        ))}
      </div>

      {/* Render Windows */}
        {windows.map((win) => (
         <Window key={win.id} id={win.id}>
          {win.id === 'calculator' && <Calculator />}
          {win.id === 'notepad' && <Notepad />}
          {win.id === 'photos' && <Photos />}
          {win.id === 'videos' && <Videos />}
          {win.id === 'music' && <Music />}
          {win.id === 'work' && <Work />}
          {win.id === 'paint' && <Paint />}
          {win.id === 'my-documents' && <MyDocuments />}
          {win.id === 'recycle-bin' && <RecycleBin />}
          {win.id === 'ending-note' && <EndingNote />}
          </Window>
            ))}

      {/* Taskbar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-9 flex items-center px-1 gap-1"
        style={{
          background: 'var(--taskbar-bg)',
          borderTop: '2px solid',
          borderColor: 'var(--win-border-light)',
        }}
      >
        {/* Start Button */}
        <button
          className="h-7 px-2 flex items-center gap-1 font-bold text-xs"
          style={{
            background: 'var(--win-button-face)',
            border: '2px solid',
            borderColor: 'var(--win-border-light) var(--win-border-darker) var(--win-border-darker) var(--win-border-light)',
          }}
        >
          <span>🪟</span>
          <span>Start</span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 mx-1" style={{ background: 'var(--win-border-dark)' }} />

        {/* Open Windows in Taskbar */}
        <div className="flex-1 flex gap-1">
          {windows.map((win) => (
            <button
              key={win.id}
              className="h-7 px-2 flex items-center gap-1 text-xs"
              style={{
                background: 'var(--win-button-face)',
                border: '2px solid',
                borderColor: 'var(--win-border-light) var(--win-border-darker) var(--win-border-darker) var(--win-border-light)',
                maxWidth: '140px',
              }}
              onClick={() => openWindow(win.id)}
            >
              <span>{win.icon}</span>
              <span className="truncate">{win.title}</span>
            </button>
          ))}
        </div>

        {/* Clock */}
        <div
          className="h-7 px-2 flex items-center text-xs"
          style={{
            border: '2px solid',
            borderColor: 'var(--win-border-darker) var(--win-border-light) var(--win-border-light) var(--win-border-darker)',
          }}
        >
          {time}
        </div>
      </div>
    </div>
  )
}