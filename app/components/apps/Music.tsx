'use client'

import { useState, useEffect, useRef } from 'react'

const PLAYLIST = [
  {
    id: 1,
    title: 'Bring Me To Life',
    artist: 'Evanescence',
    album: 'Fallen',
    year: '2003',
    duration: '3:57',
    emoji: '🖤',
  },
  {
    id: 2,
    title: 'My Immortal',
    artist: 'Evanescence',
    album: 'Fallen',
    year: '2003',
    duration: '4:33',
    emoji: '🖤',
  },
  {
    id: 3,
    title: 'Complicated',
    artist: 'Avril Lavigne',
    album: 'Let Go',
    year: '2002',
    duration: '4:04',
    emoji: '🎸',
  },
  {
    id: 4,
    title: 'Sk8er Boi',
    artist: 'Avril Lavigne',
    album: 'Let Go',
    year: '2002',
    duration: '3:54',
    emoji: '🎸',
  },
  {
    id: 5,
    title: 'I\'m With You',
    artist: 'Avril Lavigne',
    album: 'Let Go',
    year: '2002',
    duration: '3:33',
    emoji: '🎸',
  },
  {
    id: 6,
    title: 'Come Away With Me',
    artist: 'Norah Jones',
    album: 'Come Away With Me',
    year: '2002',
    duration: '3:18',
    emoji: '🎹',
  },
  {
    id: 7,
    title: 'Don\'t Know Why',
    artist: 'Norah Jones',
    album: 'Come Away With Me',
    year: '2002',
    duration: '3:07',
    emoji: '🎹',
  },
  {
    id: 8,
    title: 'Turn Me On',
    artist: 'Norah Jones',
    album: 'Come Away With Me',
    year: '2002',
    duration: '2:33',
    emoji: '🎹',
  },
  {
    id: 9,
    title: 'Pressure',
    artist: 'Paramore',
    album: 'All We Know Is Falling',
    year: '2005',
    duration: '3:08',
    emoji: '🔥',
  },
  {
    id: 10,
    title: 'Emergency',
    artist: 'Paramore',
    album: 'All We Know Is Falling',
    year: '2005',
    duration: '3:32',
    emoji: '🔥',
  },
]

export default function Music() {
  const [currentId, setCurrentId] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const currentSong = PLAYLIST.find(s => s.id === currentId)

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            handleNext()
            return 0
          }
          return p + 0.3
        })
      }, 100)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [playing, currentId])

  const handlePlay = (id: number) => {
    if (currentId === id) {
      setPlaying(p => !p)
    } else {
      setCurrentId(id)
      setProgress(0)
      setPlaying(true)
    }
  }

  const handleNext = () => {
    if (!currentId) return
    const idx = PLAYLIST.findIndex(s => s.id === currentId)
    const next = PLAYLIST[(idx + 1) % PLAYLIST.length]
    setCurrentId(next.id)
    setProgress(0)
    setPlaying(true)
  }

  const handlePrev = () => {
    if (!currentId) return
    const idx = PLAYLIST.findIndex(s => s.id === currentId)
    const prev = PLAYLIST[(idx - 1 + PLAYLIST.length) % PLAYLIST.length]
    setCurrentId(prev.id)
    setProgress(0)
    setPlaying(true)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      fontFamily: 'Tahoma, Arial, sans-serif',
      background: '#1a1a2e',
      color: 'white',
    }}>

      {/* Now Playing */}
      <div style={{
        padding: '12px 16px',
        background: '#16213e',
        borderBottom: '1px solid #333',
        minHeight: '80px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          background: '#0f3460',
          border: '1px solid #444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          flexShrink: 0,
        }}>
          {currentSong ? currentSong.emoji : '🎵'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {currentSong ? (
            <>
              <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {playing ? '▶️ ' : '⏸️ '}{currentSong.title}
              </div>
              <div style={{ fontSize: '11px', color: '#aaa' }}>{currentSong.artist}</div>
              <div style={{ fontSize: '10px', color: '#666' }}>{currentSong.album} · {currentSong.year}</div>
            </>
          ) : (
            <div style={{ color: '#555', fontSize: '11px' }}>double-click lagu untuk memutar</div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: '8px 12px', background: '#16213e', borderBottom: '1px solid #333' }}>
        <div
          style={{
            height: '6px',
            background: '#333',
            borderRadius: '3px',
            cursor: 'pointer',
            position: 'relative',
          }}
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            const pct = ((e.clientX - rect.left) / rect.width) * 100
            setProgress(Math.max(0, Math.min(100, pct)))
          }}
        >
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: '#e94560',
            borderRadius: '3px',
            transition: 'width 0.1s linear',
          }} />
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '8px' }}>
          {[
            { icon: '⏮️', action: handlePrev },
            { icon: playing ? '⏸️' : '▶️', action: () => currentId ? setPlaying(p => !p) : null },
            { icon: '⏭️', action: handleNext },
          ].map((ctrl, i) => (
            <button
              key={i}
              onClick={ctrl.action}
              style={{
                width: '28px',
                height: '28px',
                background: '#0f3460',
                border: '1px solid #444',
                color: 'white',
                cursor: 'default',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {ctrl.icon}
            </button>
          ))}

          {/* Volume */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '8px' }}>
            <span style={{ fontSize: '10px' }}>🔊</span>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              style={{ width: '60px', accentColor: '#e94560' }}
            />
          </div>
        </div>
      </div>

      {/* Playlist */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {PLAYLIST.map((song, idx) => (
          <div
            key={song.id}
            onDoubleClick={() => handlePlay(song.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 12px',
              background: currentId === song.id
                ? '#0f3460'
                : idx % 2 === 0 ? '#1a1a2e' : '#1e1e35',
              borderBottom: '1px solid #222',
              cursor: 'default',
              fontSize: '11px',
            }}
          >
            <span style={{ color: '#555', width: '16px', textAlign: 'right', fontSize: '10px' }}>
              {currentId === song.id && playing ? '▶️' : idx + 1}
            </span>
            <span style={{ fontSize: '14px' }}>{song.emoji}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                color: currentId === song.id ? '#e94560' : 'white',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {song.title}
              </div>
              <div style={{ color: '#666', fontSize: '10px' }}>{song.artist}</div>
            </div>
            <span style={{ color: '#555', fontSize: '10px' }}>{song.duration}</span>
          </div>
        ))}
      </div>
    </div>
  )
}