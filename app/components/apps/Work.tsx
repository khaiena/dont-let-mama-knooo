'use client'

import { useState } from 'react'

type WorkFile = {
  id: string
  name: string
  icon: string
  type: 'email' | 'spreadsheet' | 'memo' | 'schedule'
}

const FILES: WorkFile[] = [
  { id: 'email1', name: 'RE - Budget Approval Q1.eml', icon: '📧', type: 'email' },
  { id: 'email2', name: 'FW - Team Lunch Friday.eml', icon: '📧', type: 'email' },
  { id: 'email3', name: 'Meeting Room Booking.eml', icon: '📧', type: 'email' },
  { id: 'petty1', name: 'Petty Cash March 2003.xls', icon: '📊', type: 'spreadsheet' },
  { id: 'petty2', name: 'Petty Cash Feb 2003.xls', icon: '📊', type: 'spreadsheet' },
  { id: 'memo1', name: 'Internal Memo - Dress Code.doc', icon: '📄', type: 'memo' },
  { id: 'memo2', name: 'SOP Reimbursement 2003.doc', icon: '📄', type: 'memo' },
  { id: 'sched1', name: 'Meeting Schedule March.doc', icon: '📅', type: 'schedule' },
]

const CONTENT: Record<string, React.ReactNode> = {
  email1: (
    <div style={{ padding: '12px', fontSize: '11px', lineHeight: '1.8' }}>
      <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '12px' }}>
        <div><b>From:</b> handoko.s@perusahaan.co.id</div>
        <div><b>To:</b> maya.r@perusahaan.co.id</div>
        <div><b>Date:</b> Monday, March 10, 2003 9:14 AM</div>
        <div><b>Subject:</b> RE: Budget Approval Q1</div>
      </div>
      <p>Maya,</p><br />
      <p>Terima kasih sudah mengirimkan laporannya. Untuk budget Q1 sudah saya approve, tolong koordinasi dengan Bu Sari untuk pencairan dana.</p><br />
      <p>Satu hal lagi — mohon pastikan petty cash report bulan Februari sudah direkap sebelum rapat Jumat.</p><br />
      <p>Regards,<br />Handoko S.<br />Finance Manager</p>
    </div>
  ),
  email2: (
    <div style={{ padding: '12px', fontSize: '11px', lineHeight: '1.8' }}>
      <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '12px' }}>
        <div><b>From:</b> diana.k@perusahaan.co.id</div>
        <div><b>To:</b> all-jakarta@perusahaan.co.id</div>
        <div><b>Date:</b> Tuesday, March 11, 2003 11:32 AM</div>
        <div><b>Subject:</b> FW: Team Lunch Friday!</div>
      </div>
      <p>Halo semua! 🎉</p><br />
      <p>Reminder team lunch Jumat ini jam 12.00 di Restoran Sederhana lantai 1. Ditanggung kantor, jadi harap hadir ya!</p><br />
      <p>Yang mau pesan makanan duluan bisa reply ke email ini.</p><br />
      <p>Cheers,<br />Diana K.<br />HR Department</p>
    </div>
  ),
  email3: (
    <div style={{ padding: '12px', fontSize: '11px', lineHeight: '1.8' }}>
      <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '8px', marginBottom: '12px' }}>
        <div><b>From:</b> facility@perusahaan.co.id</div>
        <div><b>To:</b> maya.r@perusahaan.co.id</div>
        <div><b>Date:</b> Wednesday, March 12, 2003 8:55 AM</div>
        <div><b>Subject:</b> Meeting Room Booking Confirmed</div>
      </div>
      <p>Dear Maya,</p><br />
      <p>Booking meeting room Mawar untuk Jumat, 14 Maret 2003 pukul 14.00–16.00 telah dikonfirmasi.</p><br />
      <p>Mohon konfirmasi jika ada perubahan minimal 2 jam sebelumnya.</p><br />
      <p>Regards,<br />Facility Management</p>
    </div>
  ),
  petty1: (
    <div style={{ padding: '8px', fontSize: '11px' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '12px' }}>
        📊 Petty Cash Report — Maret 2003
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
        <thead>
          <tr style={{ background: '#d4d0c8' }}>
            <th style={{ border: '1px solid #999', padding: '3px 6px', textAlign: 'left' }}>Tanggal</th>
            <th style={{ border: '1px solid #999', padding: '3px 6px', textAlign: 'left' }}>Keterangan</th>
            <th style={{ border: '1px solid #999', padding: '3px 6px', textAlign: 'right' }}>Jumlah</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['03/03', 'Fotokopi dokumen tender', 'Rp 12.500'],
            ['05/03', 'Tinta printer HP', 'Rp 85.000'],
            ['07/03', 'Snack rapat direksi', 'Rp 145.000'],
            ['10/03', 'Ongkir dokumen ke Surabaya', 'Rp 35.000'],
            ['12/03', 'Kertas HVS A4 (2 rim)', 'Rp 48.000'],
            ['14/03', 'Kue ulang tahun Bu Diana', 'Rp 120.000'],
            ['17/03', 'Materai 6000 (10 lembar)', 'Rp 65.000'],
            ['20/03', 'Baterai remote AC ruang rapat', 'Rp 15.000'],
          ].map(([tgl, ket, jml], i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#f5f5f5' }}>
              <td style={{ border: '1px solid #ccc', padding: '3px 6px' }}>{tgl}</td>
              <td style={{ border: '1px solid #ccc', padding: '3px 6px' }}>{ket}</td>
              <td style={{ border: '1px solid #ccc', padding: '3px 6px', textAlign: 'right' }}>{jml}</td>
            </tr>
          ))}
          <tr style={{ background: '#d4d0c8', fontWeight: 'bold' }}>
            <td colSpan={2} style={{ border: '1px solid #999', padding: '3px 6px' }}>TOTAL</td>
            <td style={{ border: '1px solid #999', padding: '3px 6px', textAlign: 'right' }}>Rp 525.500</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
  petty2: (
    <div style={{ padding: '8px', fontSize: '11px' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '12px' }}>
        📊 Petty Cash Report — Februari 2003
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
        <thead>
          <tr style={{ background: '#d4d0c8' }}>
            <th style={{ border: '1px solid #999', padding: '3px 6px', textAlign: 'left' }}>Tanggal</th>
            <th style={{ border: '1px solid #999', padding: '3px 6px', textAlign: 'left' }}>Keterangan</th>
            <th style={{ border: '1px solid #999', padding: '3px 6px', textAlign: 'right' }}>Jumlah</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['02/02', 'Spidol whiteboard (1 set)', 'Rp 22.000'],
            ['06/02', 'Snack rapat bulanan', 'Rp 98.000'],
            ['11/02', 'Fotokopi + jilid laporan', 'Rp 31.500'],
            ['14/02', 'Bunga meja resepsionis', 'Rp 75.000'],
            ['19/02', 'Tinta stempel', 'Rp 18.000'],
            ['25/02', 'Tissue box (6 pcs)', 'Rp 42.000'],
          ].map(([tgl, ket, jml], i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#f5f5f5' }}>
              <td style={{ border: '1px solid #ccc', padding: '3px 6px' }}>{tgl}</td>
              <td style={{ border: '1px solid #ccc', padding: '3px 6px' }}>{ket}</td>
              <td style={{ border: '1px solid #ccc', padding: '3px 6px', textAlign: 'right' }}>{jml}</td>
            </tr>
          ))}
          <tr style={{ background: '#d4d0c8', fontWeight: 'bold' }}>
            <td colSpan={2} style={{ border: '1px solid #999', padding: '3px 6px' }}>TOTAL</td>
            <td style={{ border: '1px solid #999', padding: '3px 6px', textAlign: 'right' }}>Rp 286.500</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
  memo1: (
    <div style={{ padding: '16px', fontSize: '11px', lineHeight: '1.8', maxWidth: '500px' }}>
      <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '16px', fontSize: '13px' }}>
        MEMORANDUM INTERNAL<br />
        PT NUSANTARA GLOBAL INDONESIA
      </div>
      <div style={{ marginBottom: '12px' }}>
        <div><b>Kepada:</b> Seluruh Karyawan</div>
        <div><b>Dari:</b> HR Department</div>
        <div><b>Perihal:</b> Ketentuan Pakaian Kerja</div>
        <div><b>Tanggal:</b> 1 Maret 2003</div>
      </div>
      <p>Dengan hormat,</p><br />
      <p>Sehubungan dengan beberapa catatan yang masuk ke departemen HR, kami ingin mengingatkan kembali ketentuan pakaian kerja yang berlaku di lingkungan perusahaan.</p><br />
      <p>Pakaian kerja resmi (formal attire) wajib dikenakan pada hari Senin–Kamis. Pada hari Jumat, karyawan diperbolehkan mengenakan pakaian kasual yang tetap sopan dan rapi.</p><br />
      <p>Demikian harap menjadi perhatian. Terima kasih atas kerjasamanya.</p><br />
      <p>Hormat kami,<br />HR Department</p>
    </div>
  ),
  memo2: (
    <div style={{ padding: '16px', fontSize: '11px', lineHeight: '1.8' }}>
      <div style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '16px', fontSize: '13px' }}>
        SOP REIMBURSEMENT KARYAWAN 2003<br />
        PT NUSANTARA GLOBAL INDONESIA
      </div>
      <p><b>1. Ketentuan Umum</b></p>
      <p>Reimbursement dapat diajukan untuk pengeluaran yang berhubungan langsung dengan kepentingan perusahaan dan telah mendapat persetujuan atasan.</p><br />
      <p><b>2. Dokumen yang Diperlukan</b></p>
      <p>— Formulir reimbursement (tersedia di meja sekretaris)<br />
      — Kwitansi/bon asli<br />
      — Tanda tangan persetujuan atasan langsung</p><br />
      <p><b>3. Batas Waktu Pengajuan</b></p>
      <p>Maksimal 14 hari kerja setelah pengeluaran terjadi.</p><br />
      <p><b>4. Proses Pencairan</b></p>
      <p>Pencairan dilakukan setiap hari Jumat melalui Finance Department.</p>
    </div>
  ),
  sched1: (
    <div style={{ padding: '12px', fontSize: '11px' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '12px' }}>
        📅 Jadwal Meeting — Maret 2003
      </div>
      {[
        { tgl: 'Senin, 10 Maret', waktu: '09.00–10.30', judul: 'Rapat Koordinasi Divisi', ruang: 'Ruang Melati', peserta: 'Semua kepala divisi' },
        { tgl: 'Rabu, 12 Maret', waktu: '13.00–14.00', judul: 'Review Budget Q1', ruang: 'Ruang Mawar', peserta: 'Finance + Direksi' },
        { tgl: 'Jumat, 14 Maret', waktu: '14.00–16.00', judul: 'Presentasi Tender Proyek Baru', ruang: 'Ruang Mawar', peserta: 'Tim Proyek + Klien' },
        { tgl: 'Senin, 17 Maret', waktu: '10.00–11.00', judul: 'One-on-one dengan Pak Handoko', ruang: 'Ruang Direksi', peserta: 'Maya R.' },
        { tgl: 'Kamis, 27 Maret', waktu: '09.00–12.00', judul: 'Training MS Excel Intermediate', ruang: 'Lab Komputer', peserta: 'Staf Admin + Sekretaris' },
      ].map((item, i) => (
        <div key={i} style={{
          marginBottom: '10px',
          padding: '8px',
          background: i % 2 === 0 ? '#f0f4ff' : 'white',
          border: '1px solid #ddd',
        }}>
          <div style={{ fontWeight: 'bold', color: '#000080' }}>{item.judul}</div>
          <div style={{ color: '#555' }}>{item.tgl} · {item.waktu}</div>
          <div>📍 {item.ruang} · 👥 {item.peserta}</div>
        </div>
      ))}
    </div>
  ),
}

export default function Work() {
  const [selected, setSelected] = useState<string | null>(null)
  const [opened, setOpened] = useState<string | null>(null)

  if (opened) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'Tahoma, Arial, sans-serif' }}>
        {/* Toolbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 8px',
          background: '#d4d0c8',
          borderBottom: '1px solid #808080',
          fontSize: '11px',
        }}>
          <button
            onClick={() => setOpened(null)}
            style={{
              background: 'var(--win-button-face)',
              border: '2px solid',
              borderColor: '#ffffff #808080 #808080 #ffffff',
              padding: '2px 8px',
              cursor: 'default',
              fontSize: '11px',
            }}
          >
            ← Back
          </button>
          <span style={{ color: '#555' }}>
            {FILES.find(f => f.id === opened)?.name}
          </span>
        </div>
        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', background: 'white' }}>
          {CONTENT[opened]}
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'Tahoma, Arial, sans-serif' }}>
      {/* Toolbar */}
      <div style={{
        padding: '4px 8px',
        background: '#d4d0c8',
        borderBottom: '1px solid #808080',
        fontSize: '11px',
        color: '#555',
      }}>
        📁 Work — {FILES.length} items
      </div>

      {/* File list */}
      <div style={{ flex: 1, overflowY: 'auto', background: 'white' }}>
        {FILES.map((file, i) => (
          <div
            key={file.id}
            onClick={() => setSelected(file.id)}
            onDoubleClick={() => setOpened(file.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 8px',
              background: selected === file.id ? '#000080' : i % 2 === 0 ? 'white' : '#f9f9f9',
              color: selected === file.id ? 'white' : 'black',
              cursor: 'default',
              fontSize: '11px',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <span style={{ fontSize: '16px' }}>{file.icon}</span>
            <span>{file.name}</span>
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div style={{
        padding: '2px 8px',
        background: '#d4d0c8',
        borderTop: '1px solid #808080',
        fontSize: '10px',
        color: '#555',
      }}>
        {selected ? FILES.find(f => f.id === selected)?.name : `${FILES.length} objects`}
      </div>
    </div>
  )
}