import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { TimelineMax, Power2 } from "gsap"
import { FB_HEIGHT, FB_WIDTH, stringPosition, fretPosition } from './utils'
import NoteBlip from './NoteBlip'
import Controls from './Controls'

const SVG = styled.svg`
  width: 95%;
  display: block;
  margin: 40px auto;
  visibility: hidden;
  user-select: none;
`

const Fingerboard = styled.rect`
  fill: #b99275;
  stroke: none;
`

const Fret = styled.path`
  stroke-width: 6px;
  stroke: gold;
`

const String = styled.path`
  stroke-linecap: round
`

class Guitar extends React.Component {
  componentDidMount() {
    this.masterTimeline = new TimelineMax({})
    this.masterTimeline
      .set('#guitar', { visibility: 'visible' })
      .add(this.initFretboard())
  }

  initFretboard = () => {
    const tl = new TimelineMax({})
    tl.add('initFretboard')
      .set('.fret, .string', { x: '-100%', opacity: 0 })
      .set('#fingerboard', { opacity: 0 })
      .to('#fingerboard', 0.5, { opacity: 1, ease: Power2.easeOut }, 'initFretboard')
      .staggerTo('.fret', 0.3, { x: '0%', opacity: 1, ease: Power2.easeOut }, 0.05, 'initFretboard+=0.2')
      .staggerTo('.string', 0.3, { x: '0%', opacity: 0.7, ease: Power2.easeOut }, 0.1, 'initFretboard+=0.3')
    return tl
  }

  render() {
    const { noteMap } = this.props
    return (
      <div>
        <SVG
          id="guitar"
          viewBox={`
            -50
            -50
            ${FB_WIDTH + 50}
            ${FB_HEIGHT + 50}
          `}
          aria-labelledby="title"
          ref={(el) => this.svg = el}
        >
          <title id="guitar" lang="en">
            Guitar SVG Note Mapper
          </title>
          <Fingerboard id="fingerboard" x="0" y="0" width={FB_WIDTH} height={FB_HEIGHT} />
          <Fret className="fret" d={`M3,0 V${FB_HEIGHT}`} />
          {' '.repeat(20).split('').map((_, i) => (
            <Fret
              key={`fret-${i}`}
              className="fret"
              d={`M${fretPosition(i + 1)},0 V${FB_HEIGHT}`}
            />
          ))}
          {' '.repeat(6).split('').map((_, i) => (
            <String
              key={`string-${i}`}
              className="string"
              d={`M0,${stringPosition(i)} H${FB_WIDTH}`}
              strokeWidth={3 + (i / 2)}
              stroke={ i < 2 ? 'grey' : 'silver'}
            />
          ))}
          <g>
            {noteMap.map((string, i) => (
              <React.Fragment key={`string-${i}`}>
                {string.map((note, j) => (
                  <NoteBlip
                    key={`note-${j}`}
                    note={note}
                  />
                ))}
              </React.Fragment>
            ))}
          </g>
        </SVG>
        <Controls />
      </div>
    )
  }
}

export default connect(({ guitar: { noteMap } }) => ({ noteMap }))(Guitar)