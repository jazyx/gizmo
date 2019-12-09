import React, { Component } from 'react';
import { StyledAudioButton } from './styles'


export default class AudioButton extends Component {
  constructor(props) {
    super(props)
    // { play: <boolean>, disabled: <boolean>[, src: <string>] }
    // if disabled, then no src is required
    const defaults = {
      play:     false
    , size:     10 // vmin
    , radius:    5 // vmin
    }

    this.fadeTime = 500
    this.volume   = 1.0
    this.paused   = false

    this.togglePlay  = this.togglePlay.bind(this)
    this.preload     = this.preload.bind(this)
    this.audioLoaded = this.audioLoaded.bind(this)

    this.state = Object.assign(defaults, props)

    // Ensure that the button is disabled if there is no src, and
    // enabled it only when the src is sufficiently preloaded
    this.state.disabled = true

    if (this.props.src) {
      this.preload()
    }
  }


  preload() {
    const doThePreloadThing = () => {     
      new Promise((resolve, reject) => {
        this.audio = new Audio()
        this.audio.oncanplaythrough = () => resolve()
        this.audio.onerror          = (error) => reject(error)
        this.audio.src              = this.props.src
        this.audio.load() // required for iOS
      }).then(
        (success) => this.audioLoaded()
      , (error)   => console.log("Audio Error", this.audio.src)
      )
    }

    setTimeout(doThePreloadThing, 0)      
  }


  audioLoaded() {
    this.setState({ disabled: false })

    this.audio.onended = () => this.playDone()

    if (this.state.play) {
      this.togglePlay(true)
    }
  }


  togglePlay(play) {
    if (this.props.disabled) {
      return
    }
    // If called from audioLoaded, this.state.disabled may still be
    // true, because this.setState is asynchronous.
    
    if (typeof play !== "boolean") {
      // The call did NOT come from audioLoaded. play is an event
      play.stopPropagation()

      if (this.state.disabled) {
        // This should not happen
        console.log("togglePlay called while disabled")
        return

      } else {
        // No parameter is sent from onClick
        play = !this.state.play
      }
    }

    this.setState({ play })

    if (play) {
      this._play()

    } else {
      this._pause()
    }
  }


  playDone() {
    const play = false
    this.audio.volume = this.volume
    this.paused = false
    this.done = true
    this.setState({ play })
  }


  _play() {
    if (!this.paused) {
      this.audio.play()
                .then( success => true 
                     , failure => this.togglePlay(false)
                     )
    } else {  
      this.audio.volume = 0
      this.audio.play()
      this._fade(this.audio, +1)
    }
  }


  _pause() {
    this._fade(this.audio, -1)
        .then( result => {    
          this.audio.pause()
          this.paused = true
          this.setState({ play: false })
        }
      )
  }


  _fade(audio, direction) {
    let volume  = (direction < 0)
                ? audio.volume
                : this.volume
    const delay = 10 // ms
    const delta = (volume / this.fadeTime) * delay
    if (audio.volume === 0) {
      volume = 0
    }

    const promise = new Promise((resolve, reject) => {
      const fade = () => {
        volume += delta * direction
        volume = Math.max(0, Math.min(volume, this.volume))
        audio.volume = volume

        if (volume === this.volume) {
          resolve("faded in")

        } else if (!volume ) {
          resolve("faded out")

        } else {
          setTimeout(fade, delay)
        }
      }

      fade()
    })

    return promise
  }


  getIcon(playing) {
    if (this.props.disabled || this.state.disabled) {
      return "disabled"
    } else if (playing || this.state.play) {
      return "pause"
    } else {
      return "play"
    }
  }


  render() {
    if (this.audio && this.audio.src.indexOf(this.props.src) < 0) {
      this.paused = false
      this._fade(this.audio, -1)
      this.preload() // this.audio changes with new props.src
    }

    let playing = false

    // Play the audio automatically if it is ready to be played,
    // has not yet been played and has just be enabled in props.
    if (this.done) {
      this.done = false

    } else if (
         !this.state.disabled 
      && !this.props.disabled 
      &&  this.props.play
      && !this.paused
    ) {
      this._play()
      playing = true
    }

    const icon = this.getIcon(playing)

    return (
      <StyledAudioButton
        size={this.state.size}
        radius={this.state.radius}
        icon={icon}
        onClick={(event) => this.togglePlay(event)}
      />
    )

  }
}