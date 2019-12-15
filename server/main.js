import { Meteor } from 'meteor/meteor';
import { Phrases } from '/imports/api/phrases';
import { phrases } from '../imports/data/phrases'
import { createStructure } from './structure'
import { methods } from './methods'



Meteor.methods(methods)



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
})
