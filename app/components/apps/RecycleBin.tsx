'use client'

const ITEMS = [
  { name: 'draft email to handoko.doc', icon: '📄', date: 'March 8, 2003', size: '2 KB' },
  { name: 'petty cash jan SALAH.xls', icon: '📊', date: 'Feb 28, 2003', size: '14 KB' },
  { name: 'foto kantor lama.jpg', icon: '🖼️', date: 'Feb 14, 2003', size: '340 KB' },
  { name: 'surat resign JANGAN DIKIRIM.doc', icon: '📄', date: 'Jan 30, 2003', size: '3 KB' },
]

export default function RecycleBin() {
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
        🗑️ Recycle Bin — {ITEMS.length} items
      </div>

      <div style={{ flex: 1, background: 'white', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
          <thead>
            <tr style={{ background: '#d4d0c8', borderBottom: '1px solid #808080' }}>
              <th style={{ padding: '3px 8px', textAlign: 'left', fontWeight: 'normal' }}>Name</th>
              <th style={{ padding: '3px 8px', textAlign: 'left', fontWeight: 'normal' }}>Date Deleted</th>
              <th style={{ padding: '3px 8px', textAlign: 'left', fontWeight: 'normal' }}>Size</th>
            </tr>
          </thead>
          <tbody>
            {ITEMS.map((item, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#f9f9f9' }}>
                <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0' }}>
                  {item.icon} {item.name}
                </td>
                <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', color: '#555' }}>
                  {item.date}
                </td>
                <td style={{ padding: '4px 8px', borderBottom: '1px solid #f0f0f0', color: '#555' }}>
                  {item.size}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        padding: '2px 8px',
        background: '#d4d0c8',
        borderTop: '1px solid #808080',
        fontSize: '10px',
        color: '#555',
      }}>
        {ITEMS.length} items · right-click to restore or delete permanently
      </div>
    </div>
  )
}