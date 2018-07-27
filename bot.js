'use strict'

let Wit = null;
let interactive = null;

var Config = require('./config')
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;

// LETS SAVE USER SESSIONS
var sessions = {}

const accessToken = (() => {
  return Config.WIT_TOKEN;
})();

var firstEntityValue = function (entities, entity) {
	var val = entities && entities[entity] &&
		Array.isArray(entities[entity]) &&
		entities[entity].length > 0 &&
		entities[entity][0].value

	if (!val) {
		return null
	}
	return typeof val === 'object' ? val.value : val
}

const handleMessage = ({entities}) => {
  const greetings = firstEntityValue(entities, 'greetings');
  const celebrity = firstEntityValue(entities, 'notable_person');
  if (celebrity) {
    // We can call wikidata API for more info here
   return printWikidataDescription(celebrity);
  } else if (greetings) {
    console.log("Hi! You can say something like 'Tell me about Beyonce'");
    return "Hi! You can say something like 'Tell me about Beyonce'";
  } else {
    console.log("Umm. I don't recognize that name. Which celebrity do you want to learn about?");
    return "Umm. I don't recognize that name. Which celebrity do you want to learn about?";
  }
};

const printWikidataDescription = (celebrity) => {
  const wikidataID = celebrity.external && celebrity.external.wikidata;
  if (!wikidataID) {
    // in case wikidata id isn't available
    console.log(`I recognize ${celebrity.name}!`);
    return "I recognize ${celebrity.name}!";
  }
  const fullUrl = `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=${wikidataID}&props=descriptions&languages=en`;
  return fetch(fullUrl, {
    method: 'GET',
    headers: new Headers({
      'Api-User-Agent': 'wit-ai-example'
    })
  })
    .then(response => Promise.resolve(response.json()))
    .then(data => {
      console.log(`ooo yes I know ${celebrity.name} -- ${data.entities[wikidataID].descriptions.en.value}`);
      return "ooo yes I know ${celebrity.name} -- ${data.entities[wikidataID].descriptions.en.value}";
    })
    .catch(err => console.error(err))
};


var findOrCreateSession = function (fbid) {
  var sessionId

  // DOES USER SESSION ALREADY EXIST?
  Object.keys(sessions).forEach(k => {
    if (sessions[k].fbid === fbid) {
      // YUP
      sessionId = k
    }
  })

  // No session so we will create one
  if (!sessionId) {
    sessionId = new Date().toISOString()
    sessions[sessionId] = {
      fbid: fbid,
      context: {
        _fbid_: fbid
      }
    }
  }

  return sessionId
}

var read = function (sender, message, reply) {

		var replyMessage = handleMessage(message)
		reply(sender, replyMessage)
	
}




module.exports = {
	findOrCreateSession: findOrCreateSession,
	read: read,
}