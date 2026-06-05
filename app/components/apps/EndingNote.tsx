'use client'

import { useState, useMemo, useRef } from 'react'

// ── toddlerify ──────────────────────────────────────────────
const SUBS: Record<string, string> = {
  you: 'u', your: 'ur', are: 'r', love: 'luv',
  mama: 'mmaa', mom: 'moom', the: 'teh', because: 'bcus',
  want: 'wnat', good: 'guud', pretty: 'prety', very: 'vrey',
  sorry: 'sory', thank: 'thnk', know: 'kno', today: 'todey',
  come: 'kome', home: 'hoem', food: 'fuud', sleep: 'slepe',
  please: 'plese', happy: 'hapy', beautiful: 'butiful',
  miss: 'mish', wait: 'wiat', back: 'bcak', nice: 'nise',
  like: 'liek', play: 'payl', okay: 'okei', yes: 'yse',
  this: 'tihs', that: 'taht', when: 'wehn', with: 'wiht',
  from: 'form', i: 'i', my: 'mhy', and: 'adn', so: 'soo',
  too: 'tooo', for: 'fro', not: 'nto', but: 'btu',
}

// stable random per character position so text doesn't jump on every keystroke
function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

function toddlerify(text: string, seed: number): string {
  if (!text) return ''

  const tokens = text.split(/(\s+)/)
  let wordIndex = 0

  return tokens.map(token => {
    if (/^\s+$/.test(token)) {
      // random extra space occasionally
      const r = seededRand(seed + wordIndex * 7)
      return r < 0.15 ? token + ' ' : token
    }

    const lower = token.toLowerCase()
    wordIndex++

    // word substitution
    if (SUBS[lower]) {
      const sub = SUBS[lower]
      // preserve leading capital
      if (token[0] === token[0].toUpperCase() && /[A-Z]/.test(token[0])) {
        return sub.charAt(0).toUpperCase() + sub.slice(1)
      }
      return sub
    }

    // skip very short or non-alpha tokens
    if (token.length < 3 || !/[a-zA-Z]/.test(token)) return token

    // random double letter (stable per word position)
    const r2 = seededRand(seed + wordIndex * 13)
    if (r2 < 0.12) {
      const charIdx = Math.floor(seededRand(seed + wordIndex * 17) * (token.length - 1))
      token = token.slice(0, charIdx + 1) + token[charIdx] + token.slice(charIdx + 1)
    }

    // random missed capital after sentence start
    const r3 = seededRand(seed + wordIndex * 19)
    if (r3 < 0.3 && token[0] === token[0].toUpperCase() && /[A-Z]/.test(token[0])) {
      token = token.charAt(0).toLowerCase() + token.slice(1)
    }

    return token
  }).join('')
}

// ── component ───────────────────────────────────────────────
export default function EndingNote() {
  const [input, setInput] = useState('')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const seed = useRef(Math.floor(Math.random() * 9999))

  const displayed = useMemo(
    () => toddlerify(input, seed.current),
    [input]
  )

  const handleSave = () => {
    if (!displayed.trim()) return
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
    }, 1800)
  }

  // ── saved screen ───────────────────────────────────────────
  if (saved) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: 'white',
        fontFamily: 'Tahoma, Arial, sans-serif',
        gap: '16px',
        padding: '24px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '48px' }}>💾</div>
        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#000080' }}>
          note for mmaa.txt
        </div>
        <div style={{
          background: '#fffde7',
          border: '1px solid #f0c040',
          padding: '16px 24px',
          maxWidth: '320px',
          fontFamily: 'Comic Sans MS, cursive',
          fontSize: '13px',
          lineHeight: '2',
          color: '#333',
          textAlign: 'left',
          transform: 'rotate(-1deg)',
          boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
          whiteSpace: 'pre-wrap',
        }}>
          {displayed}
        </div>
        <div style={{ fontSize: '11px', color: '#888' }}>
          saved to Desktop ✓
        </div>
      </div>
    )
  }

  // ── saving screen ──────────────────────────────────────────
  if (saving) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: 'white',
        fontFamily: 'Tahoma, Arial, sans-serif',
        gap: '12px',
      }}>
        <div style={{ fontSize: '32px' }}>💾</div>
        <div style={{ fontSize: '11px', color: '#555' }}>Saving...</div>
        <div style={{
          width: '200px',
          height: '16px',
          background: '#d4d0c8',
          border: '2px solid',
          borderColor: '#808080 #ffffff #ffffff #808080',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            background: '#000080',
            animation: 'progress 1.8s linear forwards',
          }} />
        </div>
        <style>{`
          @keyframes progress {
            from { width: 0% }
            to { width: 100% }
          }
        `}</style>
      </div>
    )
  }

  // ── main screen ────────────────────────────────────────────
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      fontFamily: 'Tahoma, Arial, sans-serif',
    }}>
      {/* header */}
      <div style={{
        padding: '8px 12px',
        background: '#fffde7',
        borderBottom: '1px solid #f0c040',
        fontSize: '11px',
        color: '#888',
        fontStyle: 'italic',
      }}>
        tulis sesuatu buat mama... 🖊️
      </div>

      {/* two-panel editor */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* left — user types here */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{
            fontSize: '10px',
            color: '#aaa',
            padding: '4px 8px',
            background: '#fafafa',
            borderBottom: '1px solid #eee',
          }}>
            kamu ngetik:
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Dear Mama..."
            style={{
              flex: 1,
              resize: 'none',
              border: 'none',
              outline: 'none',
              padding: '12px',
              fontFamily: 'Courier New, monospace',
              fontSize: '12px',
              lineHeight: '1.8',
              background: '#fafafa',
              color: '#555',
            }}
            spellCheck={false}
          />
        </div>

        {/* divider */}
        <div style={{ width: '1px', background: '#ddd', flexShrink: 0 }} />

        {/* right — toddlerified preview */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{
            fontSize: '10px',
            color: '#aaa',
            padding: '4px 8px',
            background: '#fffde7',
            borderBottom: '1px solid #f0c040',
          }}>
            yang keluar:
          </div>
          <div style={{
            flex: 1,
            padding: '12px',
            fontFamily: 'Comic Sans MS, cursive',
            fontSize: '13px',
            lineHeight: '2',
            background: '#fffde7',
            color: '#333',
            whiteSpace: 'pre-wrap',
            overflowY: 'auto',
          }}>
            {displayed || (
              <span style={{ color: '#ccc', fontFamily: 'Tahoma', fontSize: '11px' }}>
                preview akan muncul di sini...
              </span>
            )}
          </div>
        </div>
      </div>

      {/* footer */}
      <div style={{
        padding: '6px 12px',
        background: '#d4d0c8',
        borderTop: '1px solid #808080',
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <button
          onClick={handleSave}
          disabled={!displayed.trim()}
          style={{
            padding: '3px 16px',
            background: '#d4d0c8',
            border: '2px solid',
            borderColor: displayed.trim()
              ? '#ffffff #808080 #808080 #ffffff'
              : '#d0d0d0 #e8e8e8 #e8e8e8 #d0d0d0',
            cursor: 'default',
            fontSize: '11px',
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: displayed.trim() ? 'black' : '#aaa',
          }}
        >
          💾 Save for Mama
        </button>
      </div>
    </div>
  )
}