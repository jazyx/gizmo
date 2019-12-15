import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base'
import { verify } from '../../../../lib/verify'
import { debounce
       , removeFrom
       } from '../../../../lib/utilities'
import l10n from '../../../../lib/l10n'


;(function test(){
  // let pass = "james@lexogram.com"
  // console.log(pass, verify(pass, "email"))
  // let fail = "james@lexogram.c"
  // console.log(fail, verify(fail, "email"))


  // pass = "Пароль1A"
  // console.log(pass, verify(pass, "password"))
  // pass = "11Utypjufndu!!"
  // console.log(pass, verify(pass, "password"))
  // pass = "Aa1*Aa1*"
  // console.log(pass, verify(pass, "password"))
  // pass = "This 1 is good"
  // console.log(pass, verify(pass, "password"))

  // fail = "password"
  // console.log(fail, verify(fail, "password"))
  // fail = "Aa1*Aa1"
  // console.log(fail, verify(fail, "password"))
  // fail = "is this as long as you want?"
  // console.log(fail, verify(fail, "password"))
})()



class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ""
    , email: ""
    , password: ""
    , confirm: ""
    , rolloverText: ""
    , touched: {}
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
    }

    this.checkUsername   = this.checkUsername.bind(this)
    this.checkEmail      = this.checkEmail.bind(this)
    this.checkPassword   = this.checkPassword.bind(this)
    this.confirmPassword = this.confirmPassword.bind(this)
    this.nameIsNotTaken  = this.nameIsNotTaken.bind(this)
    this.emailIsNotTaken = this.emailIsNotTaken.bind(this)
    this.getClass        = this.getClass.bind(this)
    this.rollover        = this.rollover.bind(this)
    this.register        = this.register.bind(this)
    this.registerCallback = this.registerCallback.bind(this)
  }

  // Username
  // Email (optional)
  // Password
  // Confirm
  // [Show password]
  // Link to:
  // - Log in
  
  checkUsername(event) {
    const username = event.target.value
    const touched = this.state.touched
    touched.username = true

    this.setState({ username, touched }) // will update next render
   
    if ( username) {
      const options = { type: "username", value: username }
      Meteor.call('idIsNotTaken', options, this.nameIsNotTaken)
  
    } else {
      this.validate("username", false)
    }
  }


  checkEmail(event) {
    const email = event.target.value
    const touched = this.state.touched
    touched.email = true

    this.setState({ email, touched })

    if (!email) {
      this.validate("email", true)

    } else if (verify(email, "email")) {
      const options = { type: "email", value: email }
      Meteor.call('idIsNotTaken', options, this.emailIsNotTaken)

    } else {
      this.validate("email", false)
    }
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
    this.validate("email", valid)   
  }


  checkPassword(event) {
    const password = event.target.value
    const touched = this.state.touched
    touched.password = true

    this.validate("confirm", password === this.state.confirm)
    this.validate("password", verify(password, "password"))

    this.setState({ password, touched })
  }


  confirmPassword(event) {
    const confirm = event.target.value
    const touched = this.state.touched
    touched.confirm = true

    this.validate("confirm", this.state.password === confirm)

    this.setState({ confirm, touched })
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

    const registerErrors = () => {
      const fillers = {
        "%1": this.state.valid["username"]
            ? ""
            : userNameError()
      , "%2": this.state.valid["email"]
            ? ""
            : l10n.getString("invalidEmail")
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
          return <p>{l10n.getString("invalidEmail")}</p>
        case "password":
          return <p>{l10n.getString("invalidPassword")}</p>
        case "confirm":
          return <p>{l10n.getString("confirmMustMatch")}</p>
        case "form":
          return registerErrors()
      }
    } 

    if (event.type !== "mouseleave" && !this.state.valid[id]) {
      rolloverText = getRolloverText(id)
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
    console.log("registerCallback","error:", error, "result:", result)
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
            value={this.props.username}
            onChange={debounce(this.checkUsername, 200, "persist")}
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
            type="email"
            placeholder={this.strings.emailHolder}
            value={this.props.password}
            onChange={debounce(this.checkEmail, 200, "persist")}
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
            value={this.props.password}
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
            value={this.props.confirm}
            onChange={this.confirmPassword}
            className={this.getClass("confirm")}
            required
          />
        </label>
        <div>
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