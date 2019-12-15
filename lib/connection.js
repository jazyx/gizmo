import storage from './storage'



class Connection {
  constructor() {
    this.userData = storage.getItem("userdata") || []

    const defaultUser = this.userData[0]
    if (defaultUser) {
      if (defaultUser.autoLogin) {
        this.login(defaultUser)
      } else {
        this.action = "Login"
      }
    } else {
      this.action = "Register"
    }
  }

  login(user) {
    this.currentUser = user
    this.action = "Logout"
  }


  getAction() {
    return this.action
  }
}


export default connection = new Connection()