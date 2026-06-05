'use client'

import { useState } from 'react'

export default function Notepad() {
  const [text, setText] = useState(`Meeting notes - 14 March 2003

- Call Mr. Handoko re: budget approval
- Print petty cash report before Friday
- Remind Bu Sari about team lunch

TO DO:
- Pick up Bebe from school 3pm
- Buy cat food (Whiskas, tuna flavor)
- Return library book!!`)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Menu bar */}
      <div style={{
        display: 'flex',
        gap: '8px',
        padding: '2px 4px',
        borderBottom: '1px solid #808080',
        fontSize: '11px',
        background: '#d4d0c8',
      }}>
        {['File', 'Edit', 'Format', 'View', 'Help'].map(menu => (
          <button key={menu} style={{
            background: 'transparent',
            border: 'none',
            cursor: 'default',
            fontSize: '11px',
            fontFamily: 'Tahoma, Arial, sans-serif',
            padding: '1px 4px',
          }}>
            {menu}
          </button>
        ))}
      </div>

      {/* Text area */}
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        style={{
          flex: 1,
          resize: 'none',
          border: 'none',
          outline: 'none',
          padding: '4px',
          fontFamily: 'Courier New, monospace',
          fontSize: '12px',
          lineHeight: '1.5',
          background: 'white',
          color: 'black',
        }}
        spellCheck={false}
      />

      {/* Status bar */}
      <div style={{
        padding: '1px 4px',
        borderTop: '1px solid #808080',
        fontSize: '11px',
        background: '#d4d0c8',
      }}>
        Ln 1, Col 1
      </div>
    </div>
  )
}