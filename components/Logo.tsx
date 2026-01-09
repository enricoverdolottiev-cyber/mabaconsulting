'use client'

import React from 'react'

interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  // Dimensioni calcolate per Space Grotesk Bold - Ulteriore ingrandimento del 13% (da 30px a 34px)
  // Usa variabili per facilitare future modifiche: tutto scala proporzionalmente
  const fontSize = 34 // Aumentato del 13% (da 30px a 34px) - logo dominante e autorevole
  const mHeight = fontSize // L'altezza della "M" corrisponde al font-size
  const stemWidth = fontSize * 0.229 // Larghezza prima asta verticale (proporzionale al font-size)
  const baselineY = fontSize // La baseline del testo corrisponde al font-size
  const overlap = 0.5 // Sovrapposizione sub-pixel: bandiera si estende oltre per eliminare il gap

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
      </defs>

      {/* Bandiera italiana laterale - completamente fusa con la "M" */}
      {/* Layering: rect PRIMA del text per garantire che la bandiera stia "sotto" */}
      {/* Sovrapposizione sub-pixel: la bandiera si estende oltre stemWidth per sovrapporsi alla "M" */}
      {/* Il bordo destro della bandiera (x = stemWidth + overlap) si sovrappone al bordo sinistro della "M" */}
      <rect
        x="0"
        y="0"
        width={stemWidth + overlap}
        height={mHeight}
        fill="url(#flagGradient)"
      />

      {/* Testo "MaBa Consulting" - INVARIATO (posizione x, y, fontSize, stile) */}
      {/* Posizione originale mantenuta: x = stemWidth (senza offset) */}
      {/* La bandiera si estende oltre per creare la sovrapposizione necessaria */}
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
    </svg>
  )
}
