'use strict'

let Wit = null;
let interactive = null;

var Config = require('./config')
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;

// LETS SAVE USER SESSIONS
var sessions = {}

const accessToken = (() => {
	console.log(">>>>>>>wit token>>>>>>>" + Config.WIT_TOKEN);
  return Config.WIT_TOKEN;
})();

var firstEntityValue = function (entities, entity) {
	var val = entities && entities[entity] &&
		Array.isArray(entities[entity]) &&
		entities[entity].length > 0 &&
		entities[entity][0].value;
    console.log(">>>>>>>val>>>>>>>");
     console.log(val);
	if (!val) {
		return null;
	}
return val;
}

const printWikidataDescription = (celebrity) => {
  var responsewiki;
  const wikidataID = celebrity.external && celebrity.external.wikidata;
  if (!wikidataID) {
    // in case wikidata id isn't available
    console.log(`I recognize ${celebrity.name}!`);
    responsewiki = "I recognize ${celebrity.name}!";
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
      responsewiki = "ooo yes I know " + celebrity.name + " -- " + data.entities[wikidataID].descriptions.en.value;
      console.log(">>>>>>>>>>respdata>>>>>>>>");
      console.log(responsewiki);
    })
    .catch(err => console.error(err))
    return responsewiki;
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
		const client = new Wit({accessToken})

    client.message(message).then(({entities}) => {
              // You can customize your response to these entities
              console.log(">>>>>>>entities>>>>>>>");
              console.log(entities);
              // For now, let's reply with another automatic message
              //reply(sender, `We've received your message: ${message}.`);
              const greetings = firstEntityValue(entities, 'greetings');
              console.log(">>>>>>>greetings>>>>>>>");
              console.log(greetings);
              const celebrity = firstEntityValue(entities, 'notable_person');
              console.log(">>>>>>>celebrity>>>>>>>");
              console.log(celebrity);
             if (celebrity) {
             // We can call wikidata API for more info here
             var respdata = printWikidataDescription(celebrity);
             console.log(">>>>>>>resp>>>>>>>");
             console.log(respdata);
             reply(sender, respdata);
             } else if (greetings) {
             console.log("Hi! You can say something like 'Tell me about Beyonce'");
             reply(sender, "Hi! You can say something like 'Tell me about Beyonce'");
             } else {
             console.log("Umm. I don't recognize that name. Which celebrity do you want to learn about?");
             reply(sender, "Umm. I don't recognize that name. Which celebrity do you want to learn about?");
               }
            })
	
}




module.exports = {
	findOrCreateSession: findOrCreateSession,
	read: read,
}