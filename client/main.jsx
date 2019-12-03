// Set the Jazyx Session "global" before any other files are loaded
import { Jazyx } from '../lib/jazyx' // Its value is ignored here

import React from 'react'
import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'
import App from '/imports/ui/App'



Meteor.startup(() => {
  render(<App />, document.getElementById('root'));
});
