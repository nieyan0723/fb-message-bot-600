'use strict';

//const WIT_TOKEN = process.env.WIT_TOKEN
var WIT_TOKEN = 'J6FWFF63EQWCEVSSBVHUBZFNYZ7KM4GNJ6FWFF63EQWCEVSSBVH'
if (!WIT_TOKEN) {
  throw new Error('Missing WIT_TOKEN. Go to https://wit.ai/docs/quickstart to get one.')
}


//var FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN
var FB_PAGE_TOKEN = 'EAAEfrRktRMkBAKUV9SrUoW1n1MMF5n9vQcHZCZChZBF04RI1h7gJTLLIkrpZBbKzhxpq5f8T0T8pqZCTnhSbsbIzTSNc1jvB8RHlZATHGRBGVZBWGld2aXbgXLudBTbyXlBZAJdAIN4y8l2eYti0SF0mfceZBsspolXV11gxG2rWcs0WC0lFMZAJ1m'
if (!FB_PAGE_TOKEN) {
	throw new Error('Missing FB_PAGE_TOKEN. Go to https://developers.facebook.com/docs/pages/access-tokens to get one.')
}

//var FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN
var FB_VERIFY_TOKEN = 'just_do_it'
module.exports = {
  WIT_TOKEN: WIT_TOKEN,
  FB_PAGE_TOKEN: FB_PAGE_TOKEN,
  FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
}