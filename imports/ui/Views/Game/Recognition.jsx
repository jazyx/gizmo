// /home/blackslate/Repos/Gizmo/App/imports/ui/Views/Game.jsx

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Phrases from '../../../api/phrases';
import AudioButton from '../../AudioButton'
import Navigation from '../../Navigation'
import { StyledPage
       , StyledFrame
       , StyledText
       , StyledPhrase
       , StyledAnswersList
       , StyledAnswerLi
       , StyledAudioButton
       , StyledReplayButton
       } from '../../styles'

const Jazyx = Session.get("Jazyx")
const audio = {
      play: false
    , disabled: true
    , size: 10
    , radius: 5
    }


class Recognition extends Component {
  constructor(props) {
    super(props) // { phrases: [ {...}, ... ] } <<< starts empty
    this.imageFolder = Jazyx.image.folder
    this.state = {
      index: -1
    , maxIndex: 0
    , disabled: {}
    }
    this.cloze = "…………………"
    this.placeholder = this.imageFolder + "question.png"
    this.randomizeArray = this.randomizeArray.bind(this)
    this.showPhrase = this.showPhrase.bind(this)
  }


  componentDidMount() {
    this.randomizeArray()
  }


  randomizeArray() {
    const phraseCount = this.props.phrases.length

    if (phraseCount < 1) {
      return setTimeout(this.randomizeArray, 10)
    }



    this.showPhrase(0)
  }


  showPhrase(index) {
    const last = this.props.phrases.length - 1

    switch (index) {
      case undefined:
      case "next":
        index = this.getNext(last)
      break
      case "prev":
        index = this.state.index - 1
      break
      default:
        if (isNaN(index)) {
          index = this.state.index
        } else {
          index = Math.max(0, Math.min(index, last))
        }
      break
    }

    const phraseData = this.props.phrases[index]
    const text = phraseData.cue.replace(/_+/, this.cloze)

    const distractors = phraseData.distractors
    const insert = Math.floor(Math.random() * distractors.length)
    const disabled = distractors.reduce((map, distractor) => {
        map[distractor.phrase] = false
        return map
      }
    , {}
    )

    this.setState({ index, insert, disabled, text, correct: false })
  }


  getNext(last) {
    const index = this.state.index + 1
    if (index === last) {
      this.setState({ complete: true })
    }

    return index
  }


  checkAnswer(event, isCorrect, answer) {
    const disabled = this.state.disabled

    if (answer && disabled[answer.phrase]) {
      return
    }

    if (isCorrect) {
      this.showCorrect()

    } else {
      disabled[answer.phrase] = true
      this.setState({ disabled, dontPlay: true })
    }
  }


  showCorrect() {
    this.setState({ correct: true, dontPlay: false })
    // so that full phrase plays

    if (this.state.correct) {
      return
    }

    // Create correct answer...
    const phraseData = this.props.phrases[this.state.index]
    let text = phraseData.cue.replace(/_+/, phraseData.answer.phrase)

    // ... and ensure that sentences begin with a Capital
    const regex = /(?:^|[.!?]['"]?\s+["']?)([a-zа-ё])/g
    let match
      , index
    while (match = regex.exec(text)) {
      index = match.index - 1 + match[0].length
      text = text.substring(0, index)
           + match[1].toUpperCase()
           + text.substring(index + 1)
    }

    const maxIndex = Math.min( this.state.maxIndex + 1
                             , this.props.phrases.length - 1
                             )

    this.setState({ text, maxIndex })
  }


  getAnswers(phraseData) {
    const answers = phraseData.distractors.map((answer, index) => {
      const disabled = this.state.correct
                    || this.state.disabled[answer.phrase]

      return (
        <StyledAnswerLi
          key={index}
          disabled={disabled}
          onClick={(event) => this.checkAnswer(event, false, answer)}
        >
          <div>
            <p>{answer.phrase}</p>
            <AudioButton
              disabled={disabled}
              src={answer.audio}
              size={audio.size}
              radius={audio.radius}
            />
          </div>
        </StyledAnswerLi>
      )
    })

    const answer = (
      <StyledAnswerLi
       key={"right"}
       className={this.state.correct ? "correct" : ""}
       onClick={(event) => this.checkAnswer(event, true)}
      >
        <div>
          <p>{phraseData.answer.phrase}</p>
          <AudioButton
            src={phraseData.answer.audio}
            size={audio.size}
            radius={audio.radius}
          />
        </div>
      </StyledAnswerLi>
    )

    answers.splice(this.state.insert, 0, answer)

    return answers
  }


  inProgress() {
    const phraseData = this.props.phrases[this.state.index] || {}
    const answers = this.getAnswers(phraseData)
    const image = this.state.correct
                ? this.imageFolder + phraseData.image
                : this.placeholder

    return (
      <StyledPage>

        <StyledFrame
          backgroundImage={`url(${image})`}
        >
          <AudioButton
            src={phraseData.audio}
            disabled={!this.state.correct}
            play={!this.state.dontPlay}
          />
        </StyledFrame>

        <StyledFrame>

          <StyledPhrase>
            {this.state.text}
          </StyledPhrase>
          <StyledAnswersList>
            {answers}
          </StyledAnswersList>

          <Navigation
            id="navigation"
            onClick={this.showPhrase}
            first={this.state.index === 0}
            last={this.state.index === this.state.maxIndex}
          />
        </StyledFrame>
      </StyledPage>
    );
  }


  complete() {
    return (
      <div>
        <h1>Victory!</h1>
        <StyledReplayButton
          onClick={() => {
            this.setState({ complete: false })
            this.showPhrase(0)
          }}
        >
          Play Again
        </StyledReplayButton>
      </div>
    )
  }


  render() {
    if (this.state.index < 0) {
      return ""
    } else if (this.state.complete) {
      return this.complete()
    } else {
      return this.inProgress()
    }
  }
}


export default RecognitionContainer = withTracker(() => {
  return {
    phrases: Phrases.find({ tags: "recognition" }).fetch(),
  };
})(Recognition);



