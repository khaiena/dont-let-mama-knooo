'use client'

import { useState } from 'react'

const VIDEOS = [
  {
    id: 1,
    filename: 'Toy_Story_2_(1999).avi',
    emoji: '🤠',
    duration: '1:32:00',
    size: '698 MB',
    note: 'buat bebe',
  },
  {
    id: 2,
    filename: 'Spirited_Away_2001.avi',
    emoji: '🐉',
    duration: '2:04:00',
    size: '702 MB',
    note: 'buat bebe - film jepang bagus',
  },
  {
    id: 3,
    filename: 'Doraemon_Movie_2002.avi',
    emoji: '🤖',
    duration: '1:38:00',
    size: '650 MB',
    note: 'buat bebe',
  },
  {
    id: 4,
    filename: 'Titanic_(1997)_DVDRIP.avi',
    emoji: '🚢',
    duration: '3:14:00',
    size: '1.4 GB',
    note: '',
  },
  {
    id: 5,
    filename: 'Pretty_Woman_1990.avi',
    emoji: '👗',
    duration: '1:59:00',
    size: '699 MB',
    note: '',
  },
]

export default function Videos() {
  const [selected, setSelected] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)

  const selectedVideo = VIDEOS.find(v => v.id === selected)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'Tahoma, Arial, sans-serif' }}>
      {/* File list */}
      <div style={{ flex: 1, overflowY: 'auto', background: 'white' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
          <thead>
            <tr style={{ background: '#d4d0c8', borderBottom: '1px solid #808080' }}>
              <th style={{ padding: '3px 8px', textAlign: 'left', fontWeight: 'normal' }}>Name</th>
              <th style={{ padding: '3px 8px', textAlign: 'left', fontWeight: 'normal' }}>Duration</th>
              <th style={{ padding: '3px 8px', textAlign: 'left', fontWeight: 'normal' }}>Size</th>
            </tr>
          </thead>
          <tbody>
            {VIDEOS.map(video => (
              <tr
                key={video.id}
                onClick={() => { setSelected(video.id); setPlaying(false) }}
                onDoubleClick={() => setPlaying(true)}
                style={{
                  background: selected === video.id ? '#000080' : 'transparent',
                  color: selected === video.id ? 'white' : 'black',
                  cursor: 'default',
                }}
              >
                <td style={{ padding: '3px 8px' }}>
                  {video.emoji} {video.filename}
                  {video.note && (
                    <span style={{ color: selected === video.id ? '#adf' : '#888', marginLeft: '6px' }}>
                      [{video.note}]
                    </span>
                  )}
                </td>
                <td style={{ padding: '3px 8px' }}>{video.duration}</td>
                <td style={{ padding: '3px 8px' }}>{video.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Player area */}
      <div style={{
        height: '120px',
        background: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '8px',
        borderTop: '2px solid #808080',
      }}>
        {playing && selectedVideo ? (
          <>
            <div style={{ fontSize: '40px' }}>{selectedVideo.emoji}</div>
            <div style={{ color: '#aaa', fontSize: '10px' }}>
              Now playing: {selectedVideo.filename}
            </div>
          </>
        ) : (
          <div style={{ color: '#555', fontSize: '11px' }}>
            double-click file untuk memutar
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{
        background: '#d4d0c8',
        padding: '4px 8px',
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        borderTop: '1px solid #808080',
      }}>
        {['⏮️', '⏪', playing ? '⏸️' : '▶️', '⏩', '⏭️', '⏹️'].map((ctrl, i) => (
          <button
            key={i}
            onClick={() => {
              if (ctrl === '▶️' || ctrl === '⏸️') setPlaying(p => !p)
              if (ctrl === '⏹️') setPlaying(false)
            }}
            style={{
              width: '24px',
              height: '22px',
              background: 'var(--win-button-face)',
              border: '2px solid',
              borderColor: '#ffffff #808080 #808080 #ffffff',
              cursor: 'default',
              fontSize: '10px',
            }}
          >
            {ctrl}
          </button>
        ))}
        <div style={{
          flex: 1,
          height: '8px',
          background: 'white',
          border: '1px solid #808080',
          marginLeft: '4px',
        }} />
      </div>
    </div>
  )
}