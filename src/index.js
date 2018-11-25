// @flow

require('@babel/polyfill');


const TOKEN_URL = "https://account.withings.com/oauth2/token";
const GET_SLEEP_URL = "https://wbsapi.withings.net/v2/sleep";
const CLIENT_ID = "19ebd55de81b7ad118180158edf1367589b3a768348bd780d8664cca653539fb";
const CLIENT_SECRET = "de6fab119525d4179aab6ebbdaa61cd515c782bf5f367fb6f41b829169d70c1a";
var REFRESH_TOKEN = "7aa4532cee4c7661819d757d45980f6c11646f89";
var ACCESS_TOKEN = "77b08cbda8d498bf16dea4927dd784085576cdb7";

const axios = require('axios');
const queryString = require('query-string');

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const requestJSON = {
  'refresh_token': REFRESH_TOKEN,
  'grant_type': 'refresh_token',
  'client_id': CLIENT_ID,
  'client_secret': CLIENT_SECRET
};
const requestBody = queryString.stringify(requestJSON);

async function refreshToken() {
  try {
    const refreshTokenPost = await axios.post(TOKEN_URL, requestBody, config);
    console.log(refreshTokenPost.data);
  } catch (e) {
    console.error(e.response);
  }
}

async function getSleep(access_token) {
  var date = new Date();
  const requestParams = {
    'action': 'get',
    'access_token': access_token,
    'startdate': +date.setMinutes(date.getMinutes() - 10),
    'enddate': +date.setMinutes(date.getMinutes() + 10)
  };

  try {
    const getSleep = await axios.get(GET_SLEEP_URL, {
      params: requestParams
    });
    console.log(getSleep.data);
  } catch (e) {
    console.error(e.response);
  }
}

getSleep(ACCESS_TOKEN);
