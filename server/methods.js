import { Accounts } from 'meteor/accounts-base'


export const methods = {
  'idIsNotTaken'(options){
    const { type, value } = options
    
    if (!value) {
      return false
    }

    const account = type === "username"
                  ? Accounts.findUserByUsername(value)
                  : Accounts.findUserByEmail(value)

    return !account
  }
}