import { Meteor } from 'meteor/meteor';
import Phrases from '/imports/api/phrases';
import { phrases } from './phrases'

function insertPhrases() {
  console.log("phrases", phrases)

  phrases.forEach( phraseData => {
    phraseData.createdAt = new Date()
    Phrases.insert(phraseData)
  })
}

Meteor.startup(() => {
  // If the Phrases collection is empty, add some data.
  const phraseCursor = Phrases.find()
  const phraseCount = phraseCursor.count()

  console.log("Startup", phraseCount)

  if (!phraseCount) {
    insertPhrases()
  }
});
