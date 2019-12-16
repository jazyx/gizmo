import { Meteor } from 'meteor/meteor'
import React from 'react'
import { render } from 'react-dom'
import App from './ui/App'



Meteor.startup(() => {
  render(<App />, document.getElementById('root'));
});


// Accounts.onEmailVerificationLink(emailVerified) needs to be in
// top-level code, but not in Meteor.startup

const emailVerified = (token, completeRegistrationFunction) => {
  Accounts.verifyEmail(token, (error) => {
    if (!error) {
      completeRegistrationFunction()
    } else {
      console.warn("Accounts.verifyEmail " + error)
      // Verify email link expired [403]
    }
  })
}

Accounts.onEmailVerificationLink(emailVerified)