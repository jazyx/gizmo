import { Meteor } from 'meteor/meteor';
import Phrases from '/imports/api/phrases';
import { phrases } from './phrases'
import { createStructure } from './structure'


function insertPhrases() {
  phrases.forEach( phraseData => {
    phraseData.createdAt = new Date()
    Phrases.insert(phraseData)
  })
}


Meteor.startup(() => {
  // If the Phrases collection is empty, add some data.
  const phraseCursor = Phrases.find()
  const phraseCount = phraseCursor.count()

  if (!phraseCount) {
    insertPhrases()
  }

  if (Meteor.isDevelopment) {
    createStructure()
  }
});
