'use client'

import React from 'react'

interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  // Dimensioni calcolate per Space Grotesk Bold - Ulteriore ingrandimento del 13% (da 30px a 34px)
  // Usa variabili per facilitare future modifiche: tutto scala proporzionalmente
  const fontSize = 34 // Aumentato del 13% (da 30px a 34px) - logo dominante e autorevole
  const capHeightRatio = 0.72 // Rapporto cap-height / font-size per Space Grotesk Bold
  const mCapHeight = fontSize * capHeightRatio // Altezza effettiva della lettera maiuscola 'M'
  const stemWidth = fontSize * 0.229 // Larghezza prima asta verticale (proporzionale al font-size)
  const baselineY = fontSize // La baseline del testo corrisponde al font-size
  const mTop = baselineY - mCapHeight // Coordinata Y superiore della 'M' (cap-height line)
  const flagHeight = mCapHeight // Altezza della bandiera = altezza della 'M'
  const overlap = 0.5 // Sovrapposizione sub-pixel: bandiera si estende oltre per eliminare il gap
  const flagWidth = stemWidth + overlap // Larghezza totale della bandiera
  // Posizionamento bandiera: bordo destro allineato al centro della prima asta verticale della 'M'
  // La prima asta inizia a stemWidth (dove inizia il testo), la sua larghezza è stemWidth
  // Il punto medio dell'asta è: stemWidth + (stemWidth / 2) = stemWidth * 1.5
  const mFirstStemStart = stemWidth // Coordinata X iniziale della prima asta verticale
  const mFirstStemCenter = mFirstStemStart + (stemWidth / 2) // Punto medio esatto della prima asta verticale
  // Il bordo destro della bandiera (flagX + flagWidth) deve coincidere con mFirstStemCenter
  const flagX = mFirstStemCenter - flagWidth // Posizionamento: bordo destro bandiera = centro asta

  // Calcolo viewBox dinamico basato sulle dimensioni del logo
  const viewBoxWidth = 450 // Larghezza sufficiente per contenere il testo ingrandito
  const viewBoxHeight = fontSize + 12 // Altezza: font-size + padding verticale aumentato

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      style={{ height: '2.125rem', width: 'auto' }}
    >
      <defs>
        {/* Gradiente bandiera italiana: Rosso, Bianco, Verde */}
        <linearGradient id="flagGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#CE2B37" />
          <stop offset="33.3%" stopColor="#CE2B37" />
          <stop offset="33.3%" stopColor="#FFFFFF" />
          <stop offset="66.6%" stopColor="#FFFFFF" />
          <stop offset="66.6%" stopColor="#009246" />
          <stop offset="100%" stopColor="#009246" />
        </linearGradient>
        {/* Sottile bordo/glow per far risaltare la bandiera sopra la M */}
        <filter id="flagGlow">
          <feGaussianBlur stdDeviation="0.3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Testo "MaBa Consulting" - Renderizzato prima per stare sotto la bandiera */}
      <text
        x={stemWidth}
        y={baselineY}
        fontSize={fontSize}
        fontFamily="var(--font-space-grotesk), 'Space Grotesk', system-ui, sans-serif"
        fontWeight="700"
        fill="#FFFFFF"
        letterSpacing="-0.05em"
      >
        MaBa Consulting
      </text>

      {/* Bandiera italiana sovrapposta alla prima asta verticale della "M" */}
      {/* Layering: rect DOPO il text per garantire che la bandiera stia "sopra" */}
      {/* Posizionamento di precisione: bordo destro (striscia rossa) allineato al centro dell'asta */}
      {/* La metà sinistra dell'asta è coperta dalla bandiera, la metà destra è visibile */}
      {/* Allineamento geometrico verticale: y e height corrispondono esattamente alla lettera maiuscola 'M' */}
      <rect
        x={flagX}
        y={mTop}
        width={flagWidth}
        height={flagHeight}
        fill="url(#flagGradient)"
        filter="url(#flagGlow)"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="0.1"
      />
    </svg>
  )
}
