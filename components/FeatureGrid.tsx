'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/contexts/I18nContext'

export default function FeatureGrid() {
  const { dictionary } = useI18n()

  // Helper function to split text into two lines for boxes
  const splitText = (text: string) => {
    // For "OFFERTA AL CLIENTE" or similar patterns with 3+ words
    if (text.includes(' AL ') || text.includes(' AL')) {
      const parts = text.split(/ AL /i)
      return { line1: parts[0], line2: 'AL ' + (parts[1] || '') }
    }
    // For "NEEDS ANALYSIS", "CLIENT OFFER" (2 words)
    const words = text.split(' ')
    if (words.length >= 2) {
      // Split at middle point for 2 words
      const mid = Math.ceil(words.length / 2)
      return {
        line1: words.slice(0, mid).join(' '),
        line2: words.slice(mid).join(' ')
      }
    }
    // Fallback: single word
    return { line1: text, line2: '' }
  }

  return (
    <section id="method" className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/10 scroll-mt-20 overflow-x-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="max-w-4xl mx-auto">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tighter font-sans">
              {dictionary.features.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="gradient-text">{dictionary.features.title.split(' ').slice(-1)[0]}</span>
            </h2>
            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed font-sans px-2">
              {dictionary.features.subtitle}
            </p>
          </motion.div>
        </div>

        {/* SVG Container - Metodo Ad Hoc Flowchart - Responsive con scroll controllato su mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full mt-8 sm:mt-12 md:mt-16"
        >
          {/* Container con scroll orizzontale solo su mobile, centrato su desktop */}
          <div className="overflow-x-auto overflow-y-visible -mx-4 sm:mx-0 pb-4 sm:pb-0">
            <div className="min-w-[800px] sm:min-w-0 mx-auto max-w-6xl">
              <svg
                viewBox="0 0 1400 600"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto min-h-[300px] sm:min-h-[400px] md:min-h-[500px]"
                preserveAspectRatio="xMidYMid meet"
                style={{ fontFamily: 'inherit' }}
              >
            <defs>
              <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#0070FF', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#00D9FF', stopOpacity: 1 }} />
              </linearGradient>

              <marker
                id="head-blue"
                markerWidth="7"
                markerHeight="7"
                refX="7"
                refY="3.5"
                orient="auto"
              >
                <path d="M0,0 L7,3.5 L0,7 Z" fill="#0070FF" />
              </marker>
              <marker
                id="head-cyan"
                markerWidth="7"
                markerHeight="7"
                refX="7"
                refY="3.5"
                orient="auto"
              >
                <path d="M0,0 L7,3.5 L0,7 Z" fill="#00D9FF" />
              </marker>

              <style>
                {`
                  @keyframes dashMove {
                    from { stroke-dashoffset: 50; }
                    to { stroke-dashoffset: 0; }
                  }
                  .wow-arrow {
                    stroke-dasharray: 10, 6;
                    animation: dashMove 2.5s linear infinite;
                    fill: none;
                    stroke-width: 3;
                  }
                  .text-font {
                    font-family: inherit;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                  }
                  @media (max-width: 640px) {
                    .text-font {
                      font-size: 10px !important;
                      letter-spacing: 0.1em;
                    }
                  }
                  .box-rect {
                    fill: rgba(0, 112, 255, 0.05);
                    stroke-width: 1.2;
                  }
                `}
              </style>
            </defs>

            {/* Barra CLIENTE - Allineata ai Bordi Esterni */}
            <g>
              <rect
                x="80"
                y="50"
                width="1240"
                height="70"
                rx="35"
                fill="none"
                stroke="#0070FF"
                strokeWidth="1.5"
                opacity="0.4"
              />
              <text
                x="700"
                y="94"
                textAnchor="middle"
                className="text-font"
                fontSize="24"
                fill="white"
              >
                {dictionary.metodo.cliente}
              </text>
            </g>

            {/* Connessioni Verticali - Frecce Animate con Wow Effect */}
            <g>
              {/* Box 1: Freccia singola BASSO (Cliente → Box) - Centro X: 180 */}
              <path
                d="M180 120 V340"
                stroke="#0070FF"
                markerEnd="url(#head-blue)"
                className="wow-arrow"
              />
              
              {/* Box 2: Doppia freccia bidirezionale - Centro X: 440 */}
              <path
                d="M430 120 V340"
                stroke="#0070FF"
                markerEnd="url(#head-blue)"
                className="wow-arrow"
              />
              <path
                d="M450 340 V130"
                stroke="#0070FF"
                markerEnd="url(#head-blue)"
                className="wow-arrow"
              />
              
              {/* Box 3: Freccia singola ALTO (Box → Cliente) - Centro X: 700 */}
              <path
                d="M700 340 V130"
                stroke="#0070FF"
                markerEnd="url(#head-blue)"
                className="wow-arrow"
              />
              
              {/* Box 4: Freccia singola ALTO (Box → Cliente) - Centro X: 960 */}
              <path
                d="M960 340 V130"
                stroke="#00D9FF"
                markerEnd="url(#head-cyan)"
                className="wow-arrow"
              />
              
              {/* Box 5: Freccia singola BASSO (Cliente → Box) - Centro X: 1220 */}
              <path
                d="M1220 120 V340"
                stroke="#00D9FF"
                markerEnd="url(#head-cyan)"
                className="wow-arrow"
              />
            </g>

            {/* Box Processo - Simmetria Perfetta con Spaziatura Uniforme */}
            <g fontSize="13" fill="white" textAnchor="middle" className="text-font">
              {/* Box 1: ANALISI ESIGENZA - Centro X: 180 */}
              <g transform="translate(80, 350)">
                <rect
                  width="200"
                  height="100"
                  rx="12"
                  className="box-rect"
                  stroke="#0070FF"
                />
                <text x="100" y="45">
                  {splitText(dictionary.metodo.step1).line1}
                  <tspan x="100" dy="25">{splitText(dictionary.metodo.step1).line2}</tspan>
                </text>
              </g>

              {/* Box 2: PROGETTO INTERVENTO - Centro X: 440 */}
              <g transform="translate(340, 350)">
                <rect
                  width="200"
                  height="100"
                  rx="12"
                  className="box-rect"
                  stroke="#0070FF"
                />
                <text x="100" y="45">
                  {splitText(dictionary.metodo.step2).line1}
                  <tspan x="100" dy="25">{splitText(dictionary.metodo.step2).line2}</tspan>
                </text>
              </g>

              {/* Box 3: OFFERTA AL CLIENTE - Centro X: 700 (Centro SVG) */}
              <g transform="translate(600, 350)">
                <rect
                  width="200"
                  height="100"
                  rx="12"
                  className="box-rect"
                  stroke="#0070FF"
                />
                <text x="100" y="45">
                  {splitText(dictionary.metodo.step3).line1}
                  <tspan x="100" dy="25">{splitText(dictionary.metodo.step3).line2}</tspan>
                </text>
              </g>

              {/* Box 4: SVILUPPO ATTIVITÀ - Centro X: 960 */}
              <g transform="translate(860, 350)">
                <rect
                  width="200"
                  height="100"
                  rx="12"
                  fill="rgba(0, 217, 255, 0.08)"
                  stroke="#00D9FF"
                  strokeWidth="1.2"
                />
                <text x="100" y="45">
                  {splitText(dictionary.metodo.step4).line1}
                  <tspan x="100" dy="25">{splitText(dictionary.metodo.step4).line2}</tspan>
                </text>
              </g>

              {/* Box 5: FEEDBACK ATTIVITÀ - Centro X: 1220 */}
              <g transform="translate(1120, 350)">
                <rect
                  width="200"
                  height="100"
                  rx="12"
                  fill="rgba(0, 217, 255, 0.08)"
                  stroke="#00D9FF"
                  strokeWidth="1.2"
                />
                <text x="100" y="45">
                  {splitText(dictionary.metodo.step5).line1}
                  <tspan x="100" dy="25">{splitText(dictionary.metodo.step5).line2}</tspan>
                </text>
              </g>
            </g>

            {/* Connessioni Orizzontali - Frecce Animate con Wow Effect (60px costanti) */}
            <g fill="none">
              {/* Box 1 → Box 2 */}
              <path
                d="M280 400 H340"
                stroke="#0070FF"
                strokeWidth="3"
                markerEnd="url(#head-blue)"
                className="wow-arrow"
              />
              {/* Box 2 → Box 3 */}
              <path
                d="M540 400 H600"
                stroke="#0070FF"
                strokeWidth="3"
                markerEnd="url(#head-blue)"
                className="wow-arrow"
              />
              {/* Box 3 → Box 4 (Punto Critico - Tratteggiata Animata) */}
              <path
                d="M800 400 H860"
                stroke="#0070FF"
                strokeWidth="3"
                strokeDasharray="10, 6"
                fill="none"
                markerEnd="url(#head-blue)"
                className="wow-arrow"
              />
              {/* Box 4 → Box 5 */}
              <path
                d="M1060 400 H1120"
                stroke="#00D9FF"
                strokeWidth="3"
                markerEnd="url(#head-cyan)"
                className="wow-arrow"
              />
            </g>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

