import { create } from 'zustand'

export type WindowId =
  | 'my-documents'
  | 'photos'
  | 'music'
  | 'videos'
  | 'work'
  | 'paint'
  | 'calculator'
  | 'notepad'
  | 'recycle-bin'
  | 'ending-note'

export interface WindowState {
  id: WindowId
  title: string
  icon: string
  x: number
  y: number
  width: number
  height: number
  isMinimized: boolean
  zIndex: number
}

interface Store {
  windows: WindowState[]
  activeWindow: WindowId | null
  openWindow: (id: WindowId) => void
  closeWindow: (id: WindowId) => void
  minimizeWindow: (id: WindowId) => void
  focusWindow: (id: WindowId) => void
  moveWindow: (id: WindowId, x: number, y: number) => void
}

const WINDOW_DEFAULTS: Record<WindowId, Partial<WindowState>> = {
  'my-documents': { title: 'My Documents', icon: '📁', width: 400, height: 300 },
  'photos':       { title: 'Photos',        icon: '🖼️', width: 450, height: 350 },
  'music':        { title: 'Music',         icon: '🎵', width: 320, height: 400 },
  'videos':       { title: 'Videos',        icon: '📹', width: 480, height: 360 },
  'work':         { title: 'Work',          icon: '💼', width: 420, height: 320 },
  'paint':        { title: 'Paint',         icon: '🎨', width: 600, height: 480 },
  'calculator':   { title: 'Calculator',    icon: '🧮', width: 220, height: 300 },
  'notepad':      { title: 'Notepad',       icon: '📝', width: 380, height: 280 },
  'recycle-bin':  { title: 'Recycle Bin',   icon: '🗑️', width: 360, height: 260 },
  'ending-note': { title: 'Note for Mama ♡', icon: '💌', width: 520, height: 360 },

}

let zCounter = 10

export const useWindowStore = create<Store>((set, get) => ({
  windows: [],
  activeWindow: null,

  openWindow: (id) => {
    const existing = get().windows.find(w => w.id === id)
    if (existing) {
      // just focus it if already open
      set(state => ({
        windows: state.windows.map(w =>
          w.id === id ? { ...w, isMinimized: false, zIndex: ++zCounter } : w
        ),
        activeWindow: id,
      }))
      return
    }

    const defaults = WINDOW_DEFAULTS[id]
    const offset = get().windows.length * 24
    const newWindow: WindowState = {
      id,
      title: defaults.title!,
      icon: defaults.icon!,
      x: 80 + offset,
      y: 60 + offset,
      width: defaults.width!,
      height: defaults.height!,
      isMinimized: false,
      zIndex: ++zCounter,
    }

    set(state => ({
      windows: [...state.windows, newWindow],
      activeWindow: id,
    }))
  },

  closeWindow: (id) => {
    set(state => ({
      windows: state.windows.filter(w => w.id !== id),
      activeWindow: state.activeWindow === id ? null : state.activeWindow,
    }))
  },

  minimizeWindow: (id) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
      activeWindow: null,
    }))
  },

  focusWindow: (id) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, zIndex: ++zCounter } : w
      ),
      activeWindow: id,
    }))
  },

  moveWindow: (id, x, y) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, x, y } : w
      ),
    }))
  },
}))