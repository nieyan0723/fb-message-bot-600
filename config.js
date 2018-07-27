'use strict';

const WIT_TOKEN = process.env.WIT_TOKEN || 'DYVPU75PEGWLFTLZBFZGCWXU67LCC53J'
if (!WIT_TOKEN) {
  throw new Error('Missing WIT_TOKEN. Go to https://wit.ai/docs/quickstart to get one.')
}


var FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || 'EAAEfrRktRMkBAEfvq5ujBpFGq7huui9yiqASVfctZC7eXYZCCNBaAS1PD8r5eytWUKLilhoEtogZAE2OgURCMEtadTGalasLZApxh4QmLxRi3j8bFjSyjf9tiR3Xemchk7D0MxXZC3CZCtElRcueiWmpGH74uodVR8kfcNWrmrHZAi2MdplVUSf'
if (!FB_PAGE_TOKEN) {
	throw new Error('Missing FB_PAGE_TOKEN. Go to https://developers.facebook.com/docs/pages/access-tokens to get one.')
}

var FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN || 'just_do_it'

module.exports = {
  WIT_TOKEN: WIT_TOKEN,
  FB_PAGE_TOKEN: FB_PAGE_TOKEN,
  FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
}