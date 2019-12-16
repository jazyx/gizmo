import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base'
import { verify } from '../../../../lib/verify'
import { debounce
       , removeFrom
       } from '../../../../lib/utilities'
import l10n from '../../../../lib/l10n'



class Register extends Component {
  constructor(props) {
    super(props)
    const dbDelay = 500

    this.state = {
      username: ""
    , email: ""
    , password: ""
    , confirm: ""
    , rolloverText: ""
    , touched: {}
    , emailTaken: false
    , valid:{
        username: false
      , email:    true
      , password: false
      , confirm:  true
      , form:     false
      }
    }

    this.strings = {
      username:    l10n.getString("username")
    , email:       l10n.getString("email")
    , emailHolder: l10n.getString("emailHolder")
    , password:    l10n.getString("password")
    , invalid:     l10n.getString("invalid")
    , confirm:     l10n.getString("confirm")
    , register:    l10n.getString("register")
    , login:       l10n.getString("login")
    }

    this.checkUsername         = this.checkUsername.bind(this)
    this.checkEmail            = this.checkEmail.bind(this)
    this.checkPassword         = this.checkPassword.bind(this)
    this.confirmPassword       = this.confirmPassword.bind(this)
    this.nameIsNotTaken        = this.nameIsNotTaken.bind(this)
    this.emailIsNotTaken       = this.emailIsNotTaken.bind(this)
    this.idNotTaken            = this.idNotTaken.bind(this)
    this.confirm               = this.confirm.bind(this)
    this.getClass              = this.getClass.bind(this)
    this.rollover              = this.rollover.bind(this)
    this.register              = this.register.bind(this)
    this.registerCallback      = this.registerCallback.bind(this)

    this.debouncedIdIsNotTaken = debounce(this.idNotTaken, dbDelay)
    this.debouncedVerify       = debounce(verify, dbDelay)
    this.debouncedConfirm      = debounce(this.confirm, dbDelay)
  }


  checkUsername(event) {
    const username = event.target.value
    const touched = this.state.touched
    touched.username = true

    this.setState({ username, touched }) // will update next render

    if ( username) {
      this.debouncedIdIsNotTaken(
        "username"
      , username
      , this.nameIsNotTaken
      )      

    } else {
      this.setState({ username })
      // Wait for this.state.username to clear before validating
      setTimeout(() => this.validate("username", false), 0)
    }
  }


  checkEmail(event) {
    const email = event.target.value
    const touched = this.state.touched
    touched.email = true

    this.setState({ email, touched })

    if (!email) {
      return this.validate("email", true)
    }

    const callback = (value, type, result) => {
      if (result) {
        // The email is valid
        this.idNotTaken(type, value, this.emailIsNotTaken)

      } else {
        this.emailTaken = false // since it is invalid
        this.validate("email", false)
      }
    }

    this.validate("email", true) // to hide the feedback while typing
    this.debouncedVerify(email, "email", callback)
  }


  idNotTaken(type, value, callback) {
    const options = { type, value }
    Meteor.call('idIsNotTaken', options, callback)
  }


  nameIsNotTaken(error, result) {
    const valid = (error)
                ? false
                : (result === true)
    this.validate("username", valid)
  }


  emailIsNotTaken(error, result) {
    const valid = (error)
                ? false
                : (result === true)
    this.emailTaken = !result
    this.validate("email", valid)
  }


  checkPassword(event) {
    const password = event.target.value
    const touched = this.state.touched
    touched.password = true
    touched.confirm = true

    this.setState({ password, touched })
    this.validate("password", true) // temporarily

    const callback = (password, type, result) => {
      this.validate("confirm", password === this.state.confirm)
      this.validate("password", result)
    }

    this.debouncedVerify(password, "password", callback)
  }


  confirmPassword(event) {
    const confirm = event.target.value
    const touched = this.state.touched
    touched.confirm = true

    this.setState({ confirm, touched })
    this.validate("confirm", true)

    this.debouncedConfirm(confirm)
 }


  confirm(confirm) {
    this.validate("confirm", this.state.password === confirm)
  }


  validate(key, value) {
    const valid = this.state.valid
    valid[key] = value

    const keys = Object.keys(valid)
    removeFrom(keys, "form")
    valid.form = keys.every( key => this.state.valid[key])

    this.setState({ valid })
    this.rollover({ target: { id: key }})
  }


  rollover(event) {
    let target = event.target
    let id
    do {
      id = target.id
      target = target.parentNode
    } while (target && !id)

    let rolloverText = ""

    const userNameError = () => {
      if (!this.state.username) {
        return l10n.getString("userNameEmpty")
      } else {
        const filler = { "%1": this.state.username }
        return l10n.getString("userNameTaken", filler)
      }
    }

    const emailRollover = (isSuggestion) => {
      let rolloverText = ""

      if (!this.state.email) {
        if (isSuggestion) {
          rolloverText = (
            <span>
             {l10n.getString("emailBenefits")}
            </span>
          )
        }

      } else if (!this.state.valid["email"]) {
        if (this.emailTaken) {
          rolloverText = l10n.getString(
            "emailTaken"
          , { "%1": this.state.email }
          )
        } else {
          rolloverText = l10n.getString("invalidEmail")
        }
      }

      return rolloverText
    }

    const registerErrors = () => {
      const fillers = {
        "%1": this.state.valid["username"]
            ? ""
            : userNameError()
      , "%2": this.state.valid["email"]
            ? ""
            : emailRollover()
      , "%3": this.state.valid["password"]
            ? ""
            : l10n.getString("invalidPassword")
      , "%4": this.state.valid["confirm"]
            ? ""
            : l10n.getString("confirmMustMatch")
      }

      const rawText   = l10n.getString("registerErrors", fillers)
      const textMap   = JSON.parse(rawText)
      const listItems = textMap.li.filter( item => item )
                                  .map(( item, index ) => (
                                    <li
                                      key={index}
                                    >
                                     {item}
                                    </li>
                                  ))
      return (
        <div>
          <p>{textMap.p}</p>
          <ul>{listItems}</ul>
        </div>
      )
    }

    const getRolloverText = (id) => {
      switch (id) {
        case "username":
          return <p>{userNameError()}</p>
        case "email":
          return <p>{emailRollover()}</p>
        case "password":
          return <p>{l10n.getString("invalidPassword")}</p>
        case "confirm":
          return <p>{l10n.getString("confirmMustMatch")}</p>
        case "form":
          return registerErrors()
      }
    }

    if (event.type !== "mouseleave") {
      if (!this.state.valid[id]) {
        rolloverText = getRolloverText(id)
      } else if ( id === "email" ){
        rolloverText = emailRollover("suggestion")
      }
    }

    this.setState({ rolloverText })
  }


  getClass(type) {
    let className = ""

    if (this.state.touched[type]) {
      if (!this.state.valid[type]) {
        className = "error"
      }
    }

    return className
  }


  register(event) {
    const { username, email, password } = this.state
    const options = { username, email, password }
    Accounts.createUser(options, this.registerCallback)

    event.preventDefault()
    return false
  }


  registerCallback(error, result) {
    const { username, emails } = Meteor.user()
    let email = this.state.email
    let verified = false

    if (email && (email = email.toLowerCase())) {
      verified = emails.reduce((verified, emailData) => {
        if (emailData.address.toLowerCase() === email) {
          return emailData.verified
        } else {
          return verified
        }
      }, verified)

      if (!verified) {
        this.sendVerificationEmail(email)
      }
    }
  }


  sendVerificationEmail(email) {
    const code = l10n.getLanguage()

    Meteor.call('sendVerificationEmail', email, code, (error, result) => {
      if (error) {
        console.warn("Error from sendVerificationEmail", error)
      } else {
        // TODO: Tell user verification email has been sent
      }
    })
  }


  render() {
    return (
      <form
        onSubmit={this.register}
      >
        <h1>{this.strings.register}</h1>
        <label
          id="username"
          onMouseEnter={this.rollover}
          onMouseLeave={this.rollover}
        >
          {this.strings.username + ":"}
          <input
            type="text"
            placeholder={this.strings.username}
            value={this.state.username}
            onChange={this.checkUsername}
            className={this.getClass("username")}
            required
          />
        </label>
        <label
          id="email"
          onMouseEnter={this.rollover}
          onMouseLeave={this.rollover}
        >
          {this.strings.email + ":"}
          <input
            type="text"
            placeholder={this.strings.emailHolder}
            value={this.state.email}
            onChange={this.checkEmail}
            className={this.getClass("email")}
          />
        </label>
        <label
          id="password"
          onMouseEnter={this.rollover}
          onMouseLeave={this.rollover}
        >
          {this.strings.password + ":"}
          <input
            type="password"
            placeholder={this.strings.password}
            value={this.state.password}
            onChange={this.checkPassword}
            className={this.getClass("password")}
            required
          />
        </label>
        <label
          id="confirm"
          onMouseEnter={this.rollover}
          onMouseLeave={this.rollover}
        >
          {this.strings.confirm + ":"}
          <input
            type="password"
            value={this.state.confirm}
            onChange={this.confirmPassword}
            className={this.getClass("confirm")}
            required
          />
        </label>
        <div>
          <button
            id="login"
            type="button"
            onClick={() => this.props.setDisplay("Login")}
          >
            {this.strings.login}
          </button>
          <button
            id="form"
            type="submit"
            disabled={!this.state.valid.form}
            onMouseEnter={this.rollover}
            onMouseLeave={this.rollover}
          >
            {this.strings.register}
          </button>
        </div>
        <div
          id="errors"
        >
          {this.state.rolloverText}
        </div>
      </form>
    );
  }
}


export default Register


// /home/blackslate/Repos/Gizmo/App/client/ui/Views/Account/Register.jsx
// /home/blackslate/Repos/Gizmo/App/client/ui/Components/AccountPage.jsx