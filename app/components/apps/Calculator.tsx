'use client'

import { useState } from 'react'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [prev, setPrev] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
      return
    }
    if (!display.includes('.')) setDisplay(display + '.')
  }

  const handleOperator = (op: string) => {
    const current = parseFloat(display)
    if (prev !== null && !waitingForOperand) {
      const result = calculate(prev, current, operator!)
      setDisplay(String(result))
      setPrev(result)
    } else {
      setPrev(current)
    }
    setOperator(op)
    setWaitingForOperand(true)
  }

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case '+': return a + b
      case '-': return a - b
      case '*': return a * b
      case '/': return b !== 0 ? a / b : 0
      default: return b
    }
  }

  const handleEquals = () => {
    const current = parseFloat(display)
    if (prev !== null && operator) {
      const result = calculate(prev, current, operator)
      setDisplay(String(parseFloat(result.toFixed(10))))
      setPrev(null)
      setOperator(null)
      setWaitingForOperand(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPrev(null)
    setOperator(null)
    setWaitingForOperand(false)
  }

  const handlePlusMinus = () => {
    setDisplay(String(parseFloat(display) * -1))
  }

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100))
  }

  const btn = (
    label: string,
    onClick: () => void,
    wide = false,
    dark = false
  ) => (
    <button
      onClick={onClick}
      style={{
        gridColumn: wide ? 'span 2' : 'span 1',
        background: dark ? '#d4d0c8' : 'white',
        border: '2px solid',
        borderColor: '#ffffff #808080 #808080 #ffffff',
        fontSize: '12px',
        fontFamily: 'Tahoma, Arial, sans-serif',
        cursor: 'default',
        padding: '4px',
        textAlign: 'right',
      }}
    >
      {label}
    </button>
  )

  return (
    <div style={{ padding: '8px', background: '#d4d0c8', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {/* Display */}
      <div style={{
        background: 'white',
        border: '2px solid',
        borderColor: '#808080 #ffffff #ffffff #808080',
        padding: '4px 8px',
        textAlign: 'right',
        fontSize: '16px',
        fontFamily: 'Tahoma, Arial, sans-serif',
        minHeight: '28px',
        wordBreak: 'break-all',
      }}>
        {display}
      </div>

      {/* Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
        {btn('C', handleClear, false, true)}
        {btn('+/-', handlePlusMinus, false, true)}
        {btn('%', handlePercent, false, true)}
        {btn('÷', () => handleOperator('/'), false, true)}
        {btn('7', () => inputNumber('7'))}
        {btn('8', () => inputNumber('8'))}
        {btn('9', () => inputNumber('9'))}
        {btn('×', () => handleOperator('*'), false, true)}
        {btn('4', () => inputNumber('4'))}
        {btn('5', () => inputNumber('5'))}
        {btn('6', () => inputNumber('6'))}
        {btn('-', () => handleOperator('-'), false, true)}
        {btn('1', () => inputNumber('1'))}
        {btn('2', () => inputNumber('2'))}
        {btn('3', () => inputNumber('3'))}
        {btn('+', () => handleOperator('+'), false, true)}
        {btn('0', () => inputNumber('0'), true)}
        {btn('.', inputDecimal)}
        {btn('=', handleEquals, false, true)}
      </div>
    </div>
  )
}