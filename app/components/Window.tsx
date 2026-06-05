'use client'

import { useRef } from 'react'
import { useWindowStore, WindowId } from '../store/windowStore'

interface Props {
  id: WindowId
  children?: React.ReactNode
}

export default function Window({ id, children }: Props) {
  const { windows, closeWindow, minimizeWindow, focusWindow, moveWindow } = useWindowStore()
  const win = windows.find(w => w.id === id)
  const dragOffset = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)

  if (!win || win.isMinimized) return null

  const handleMouseDown = (e: React.MouseEvent) => {
    focusWindow(id)
    isDragging.current = true
    dragOffset.current = {
      x: e.clientX - win.x,
      y: e.clientY - win.y,
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      moveWindow(id,
        e.clientX - dragOffset.current.x,
        e.clientY - dragOffset.current.y,
      )
    }

    const handleMouseUp = () => {
      isDragging.current = false
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div
      className="absolute flex flex-col"
      style={{
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
        border: '2px solid',
        borderColor: 'var(--win-border-light) var(--win-border-darker) var(--win-border-darker) var(--win-border-light)',
        background: 'var(--win-body-bg)',
      }}
      onMouseDown={() => focusWindow(id)}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-1 select-none cursor-default"
        style={{
          height: '22px',
          background: 'var(--win-titlebar-active)',
          color: 'var(--win-titlebar-text)',
          flexShrink: 0,
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-1 text-xs font-bold">
          <span>{win.icon}</span>
          <span>{win.title}</span>
        </div>

        {/* Window Controls */}
        <div className="flex gap-px">
          {/* Minimize */}
          <button
            className="w-5 h-4 text-xs flex items-center justify-center"
            style={{
              background: 'var(--win-button-face)',
              border: '2px solid',
              borderColor: 'var(--win-border-light) var(--win-border-darker) var(--win-border-darker) var(--win-border-light)',
              color: 'black',
              lineHeight: 1,
            }}
            onMouseDown={e => e.stopPropagation()}
            onClick={() => minimizeWindow(id)}
          >
            _
          </button>

          {/* Maximize (decorative for now) */}
          <button
            className="w-5 h-4 text-xs flex items-center justify-center"
            style={{
              background: 'var(--win-button-face)',
              border: '2px solid',
              borderColor: 'var(--win-border-light) var(--win-border-darker) var(--win-border-darker) var(--win-border-light)',
              color: 'black',
            }}
            onMouseDown={e => e.stopPropagation()}
          >
            □
          </button>

          {/* Close */}
          <button
            className="w-5 h-4 text-xs flex items-center justify-center font-bold"
            style={{
              background: 'var(--win-button-face)',
              border: '2px solid',
              borderColor: 'var(--win-border-light) var(--win-border-darker) var(--win-border-darker) var(--win-border-light)',
              color: 'black',
            }}
            onMouseDown={e => e.stopPropagation()}
            onClick={() => closeWindow(id)}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-auto p-2" style={{ background: 'white' }}>
        {children ?? (
          <div className="text-xs text-gray-500 p-2">
            (kosong)
          </div>
        )}
      </div>
    </div>
  )
}