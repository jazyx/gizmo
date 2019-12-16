/**
 * verify.js
 * 
 * Call verify(<string>, <pattern or type>)
 * Returns true or false
 * 
 */


import { check } from 'meteor/check'
// import { Match } from 'meteor/check'
// https://docs.meteor.com/api/check.html


/**
 * Require:
 *  • a minimum of 8 characters
 *  • including Uppercase, lowercase, number and non-alphanumeric
 *  • either in Latin or in Cyrillic characters
 */
const password = [
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/
, /^(?=.*[А-ЯЁ])(?=.*[а-яё])(?=.*[0-9])(?=.*[^А-ЯЁа-яё0-9]).{8,}$/
]



const email = [
  /^[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)[a-z0-9-]{2,}$/
]



export const verify = (string, pattern, callback) => {
  const checks = {
    password
  , email
  }
  const types = Object.keys(checks)

  if (types.indexOf(pattern) < 0) {
    try {
      return check(string, pattern)
    } catch(error) {
      return false
    }
  }

  if (pattern === "email") {
    // Convert to punycode if necessary, so that non-ASCII domains
    // can be used <https://en.wikipedia.org/wiki/Punycode>
    string = string.split("@")
    string = string.map( chunk => Punycode.toASCII(chunk))
                   .join("@")
  }

  const fail = checks[pattern].every( regex => (
    !regex.test(string)
  ))

  if (typeof callback === "function") {
    callback(string, pattern, !fail)
  }

  return !fail
}