'use client'

import { useState } from 'react'

const PHOTOS = [
  {
    id: 1,
    filename: 'IMG_0042.jpg',
    label: '🐱 Mochi',
    color: '#f5e6c8',
    emoji: '🐱',
    caption: 'kucing oranye duduk di kursi kantor',
  },
  {
    id: 2,
    filename: 'IMG_0087.jpg',
    label: '🍱 Makan siang',
    color: '#c8e6c9',
    emoji: '🍱',
    caption: 'nasi padang di meja kantin',
  },
  {
    id: 3,
    filename: 'IMG_0103.jpg',
    label: '👨‍👩‍👧 Lebaran 2002',
    color: '#fce4ec',
    emoji: '👨‍👩‍👧',
    caption: 'foto keluarga di depan rumah nenek',
  },
  {
    id: 4,
    filename: 'IMG_0119.jpg',
    label: '🎂 Ultah kantor',
    color: '#e3f2fd',
    emoji: '🎂',
    caption: 'kue ulang tahun bu diana di pantry',
  },
  {
    id: 5,
    filename: 'IMG_0134.jpg',
    label: '🌸 Taman',
    color: '#f3e5f5',
    emoji: '🌸',
    caption: 'bunga-bunga di taman depan gedung',
  },
  {
    id: 6,
    filename: 'IMG_0201.jpg',
    label: '👶 Bebe tidur',
    color: '#fff9c4',
    emoji: '👶',
    caption: 'bebe tidur siang di sofa',
  },
]

export default function Photos() {
  const [selected, setSelected] = useState<number | null>(null)

  const selectedPhoto = PHOTOS.find(p => p.id === selected)

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'Tahoma, Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{
        width: '160px',
        borderRight: '1px solid #808080',
        background: '#d4d0c8',
        padding: '4px',
        flexShrink: 0,
        overflowY: 'auto',
      }}>
        <div style={{ fontSize: '10px', color: '#444', marginBottom: '4px', padding: '2px' }}>
          📁 Photos ({PHOTOS.length} items)
        </div>
        {PHOTOS.map(photo => (
          <button
            key={photo.id}
            onClick={() => setSelected(photo.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              width: '100%',
              padding: '3px 4px',
              background: selected === photo.id ? '#000080' : 'transparent',
              color: selected === photo.id ? 'white' : 'black',
              border: 'none',
              cursor: 'default',
              fontSize: '11px',
              textAlign: 'left',
            }}
          >
            <span>{photo.emoji}</span>
            <span style={{ fontSize: '10px' }}>{photo.filename}</span>
          </button>
        ))}
      </div>

      {/* Preview */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        padding: '16px',
      }}>
        {selectedPhoto ? (
          <>
            <div style={{
              width: '200px',
              height: '160px',
              background: selectedPhoto.color,
              borderRadius: '2px',
              border: '1px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '64px',
              marginBottom: '12px',
            }}>
              {selectedPhoto.emoji}
            </div>
            <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>
              {selectedPhoto.filename}
            </div>
            <div style={{ fontSize: '10px', color: '#555', textAlign: 'center' }}>
              {selectedPhoto.caption}
            </div>
          </>
        ) : (
          <div style={{ color: '#888', fontSize: '11px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🖼️</div>
            klik foto untuk melihat
          </div>
        )}
      </div>
    </div>
  )
}