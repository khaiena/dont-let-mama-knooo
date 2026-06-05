'use client'

import { useRef, useState, useEffect } from 'react'

const COLORS = [
  '#000000', '#808080', '#800000', '#808000',
  '#008000', '#008080', '#000080', '#800080',
  '#ffffff', '#c0c0c0', '#ff0000', '#ffff00',
  '#00ff00', '#00ffff', '#0000ff', '#ff00ff',
  '#ff8040', '#804000', '#80ff00', '#004040',
  '#0080ff', '#8000ff', '#ff0080', '#ff8080',
]

type Tool = 'pencil' | 'eraser' | 'fill' | 'line'

export default function Paint() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tool, setTool] = useState<Tool>('pencil')
  const [color, setColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [size, setSize] = useState(3)
  const [drawing, setDrawing] = useState(false)
  const [lineStart, setLineStart] = useState<{ x: number; y: number } | null>(null)
  const [snapshot, setSnapshot] = useState<ImageData | null>(null)
  const lastPos = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    return {
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    }
  }

  const floodFill = (ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: string) => {
    const canvas = ctx.canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    const idx = (y * canvas.width + x) * 4
    const targetR = data[idx], targetG = data[idx + 1], targetB = data[idx + 2]

    const hex = fillColor.replace('#', '')
    const fillR = parseInt(hex.slice(0, 2), 16)
    const fillG = parseInt(hex.slice(2, 4), 16)
    const fillB = parseInt(hex.slice(4, 6), 16)

    if (targetR === fillR && targetG === fillG && targetB === fillB) return

    const match = (i: number) =>
      Math.abs(data[i] - targetR) < 30 &&
      Math.abs(data[i + 1] - targetG) < 30 &&
      Math.abs(data[i + 2] - targetB) < 30

    const stack = [[x, y]]
    while (stack.length) {
      const [cx, cy] = stack.pop()!
      const i = (cy * canvas.width + cx) * 4
      if (cx < 0 || cx >= canvas.width || cy < 0 || cy >= canvas.height) continue
      if (!match(i)) continue
      data[i] = fillR; data[i + 1] = fillG; data[i + 2] = fillB; data[i + 3] = 255
      stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1])
    }
    ctx.putImageData(imageData, 0, 0)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getPos(e)
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    if (tool === 'fill') {
      floodFill(ctx, pos.x, pos.y, color)
      return
    }

    if (tool === 'line') {
      setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height))
      setLineStart(pos)
      setDrawing(true)
      return
    }

    setDrawing(true)
    lastPos.current = pos
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, size / 2, 0, Math.PI * 2)
    ctx.fillStyle = tool === 'eraser' ? '#ffffff' : color
    ctx.fill()
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return
    const pos = getPos(e)
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    if (tool === 'line' && lineStart && snapshot) {
      ctx.putImageData(snapshot, 0, 0)
      ctx.beginPath()
      ctx.moveTo(lineStart.x, lineStart.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.strokeStyle = color
      ctx.lineWidth = size
      ctx.lineCap = 'round'
      ctx.stroke()
      return
    }

    if (!lastPos.current) return
    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color
    ctx.lineWidth = tool === 'eraser' ? size * 4 : size
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    lastPos.current = pos
  }

  const handleMouseUp = () => {
    setDrawing(false)
    setLineStart(null)
    setSnapshot(null)
    lastPos.current = null
  }

  const handleClear = () => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const TOOLS: { id: Tool; icon: string; label: string }[] = [
    { id: 'pencil', icon: '✏️', label: 'Pencil' },
    { id: 'eraser', icon: '🧹', label: 'Eraser' },
    { id: 'fill',   icon: '🪣', label: 'Fill' },
    { id: 'line',   icon: '📏', label: 'Line' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'Tahoma, Arial, sans-serif' }}>
      {/* Menu bar */}
      <div style={{
        display: 'flex',
        gap: '8px',
        padding: '2px 4px',
        borderBottom: '1px solid #808080',
        fontSize: '11px',
        background: '#d4d0c8',
      }}>
        {['File', 'Edit', 'View', 'Image', 'Colors', 'Help'].map(m => (
          <button key={m} style={{
            background: 'transparent',
            border: 'none',
            cursor: 'default',
            fontSize: '11px',
            fontFamily: 'Tahoma, Arial, sans-serif',
            padding: '1px 4px',
          }}>{m}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Toolbox */}
        <div style={{
          width: '52px',
          background: '#d4d0c8',
          borderRight: '1px solid #808080',
          padding: '4px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          flexShrink: 0,
        }}>
          {/* Tools grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
            {TOOLS.map(t => (
              <button
                key={t.id}
                title={t.label}
                onClick={() => setTool(t.id)}
                style={{
                  width: '22px',
                  height: '22px',
                  background: tool === t.id ? '#000080' : '#d4d0c8',
                  border: '2px solid',
                  borderColor: tool === t.id
                    ? '#808080 #ffffff #ffffff #808080'
                    : '#ffffff #808080 #808080 #ffffff',
                  cursor: 'default',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {t.icon}
              </button>
            ))}
          </div>

          {/* Size picker */}
          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'center' }}>
            {[1, 3, 5, 8].map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  width: '36px',
                  height: '14px',
                  background: size === s ? '#000080' : 'white',
                  border: '1px solid #808080',
                  cursor: 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{
                  width: `${Math.min(s * 3, 28)}px`,
                  height: `${Math.min(s, 8)}px`,
                  background: size === s ? 'white' : '#333',
                  borderRadius: '999px',
                }} />
              </button>
            ))}
          </div>

          {/* Clear button */}
          <button
            onClick={handleClear}
            style={{
              marginTop: '8px',
              fontSize: '9px',
              padding: '2px',
              background: '#d4d0c8',
              border: '2px solid',
              borderColor: '#ffffff #808080 #808080 #ffffff',
              cursor: 'default',
            }}
          >
            Clear
          </button>
        </div>

        {/* Canvas area */}
        <div style={{ flex: 1, overflow: 'auto', background: '#808080', padding: '8px' }}>
          <canvas
            ref={canvasRef}
            width={520}
            height={380}
            style={{
              display: 'block',
              background: 'white',
              cursor: tool === 'eraser' ? 'cell' : tool === 'fill' ? 'crosshair' : 'crosshair',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>
      </div>

      {/* Color palette */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 8px',
        background: '#d4d0c8',
        borderTop: '1px solid #808080',
        flexShrink: 0,
      }}>
        {/* Active colors */}
        <div style={{ position: 'relative', width: '32px', height: '28px', flexShrink: 0 }}>
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '18px',
            height: '18px',
            background: bgColor,
            border: '1px solid #808080',
          }} />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '18px',
            height: '18px',
            background: color,
            border: '1px solid #808080',
          }} />
        </div>

        {/* Palette */}
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '192px', gap: '1px' }}>
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              onContextMenu={e => { e.preventDefault(); setBgColor(c) }}
              title={c}
              style={{
                width: '16px',
                height: '16px',
                background: c,
                border: color === c ? '2px solid #000080' : '1px solid #808080',
                cursor: 'default',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
        <div style={{ fontSize: '9px', color: '#555', marginLeft: '4px' }}>
          left click = fg<br />right click = bg
        </div>
      </div>
    </div>
  )
}