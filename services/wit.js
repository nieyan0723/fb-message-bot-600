'use strict'

var Config = require('../config')
var FB = require('../connectors/facebook')
var Wit = require('node-wit').Wit
var request = require('request')


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
    printWikidataDescription(celebrity);
  } else if (greetings) {
    console.log("Hi! You can say something like 'Tell me about Beyonce'");
  } else {
    console.log("Umm. I don't recognize that name. Which celebrity do you want to learn about?");
  }
};

const printWikidataDescription = (celebrity) => {
  const wikidataID = celebrity.external && celebrity.external.wikidata;
  if (!wikidataID) {
    // in case wikidata id isn't available
    console.log(`I recognize ${celebrity.name}!`);
    return;
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
    })
    .catch(err => console.error(err))
};

// SETUP THE WIT.AI SERVICE
var getWit = function () {
	console.log('GRABBING WIT')
	return new Wit({Config.WIT_TOKEN})
}

module.exports = {
	getWit: getWit,
}

// BOT TESTING MODE
if (require.main === module) {
	console.log('Bot testing mode!')
	var client = getWit()
	interactive(client,handleMessage)
}


