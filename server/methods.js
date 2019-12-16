import { Accounts } from 'meteor/accounts-base'
import l10n from '../lib/l10n'



// https://docs.meteor.com/api/passwords.html#Accounts-emailTemplates
Accounts.emailTemplates.siteName = 'Russkiy.fun'
Accounts.emailTemplates.from = 'Russkiy.fun Admin <accounts@lexogram.com>'



// METHODS // METHODS // METHODS // METHODS // METHODS // METHODS //


export const methods = {
  'idIsNotTaken'(options){
    const { type, value } = options //"username"|"email","name[@a.co]"
    
    if (!value) {
      return false
    }

    const account = type === "username"
                  ? Accounts.findUserByUsername(value)
                  : Accounts.findUserByEmail(value)
    return !account
  }

, 'sendVerificationEmail'(email, code){
    const codeSetTo = l10n.setLanguage(code)

    console.log("codeSetTo:", codeSetTo)

    const subject = () => {
      return l10n.getString("verifyEmailSubject")
    }

    const text = (user, url) => {
      const greeting = l10n.getString("verifyEmailGreeting")
                     + ( user.username
                       ? ", " + user.username
                       : ""
                       )
                     + "!\n\n"
      const text = l10n.getString("verifyEmailText", { "%": url })

      return greeting + text
    }

    const html = (user, url) => {
      const greeting = l10n.getString("verifyEmailGreeting")
                     + ( user.username
                       ? ", " + user.username
                       : ""
                       )
                     + "!"
      const html = l10n.getString("verifyEmailHTML", { "%": url })
      return `<p>${greeting}</p>${html}`
    }

    const userId   = Meteor.userId()

    Accounts.emailTemplates.verifyEmail = { subject, text, html }

    const result = Accounts.sendVerificationEmail( userId, email )

    return { userId, email, result }
  }
}