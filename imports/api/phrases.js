import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Phrases = new Mongo.Collection('phrases');

if (Meteor.isServer) {  
  Meteor.publish('phrases', function phraseEdition() {
    return Phrases.find();
  });
}