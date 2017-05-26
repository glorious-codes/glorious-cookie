var ONE_DAY_IN_MILLISECONDS = 86400000;
var COOKIES_UNAVAILABLE_WARNING_BASE_DESCRIPTION = 'It was not possible to ' +
                                                    '%a a cookie with the ' +
                                                    'key: %k';

var _public = {};

_public.set = function(key, value, days, path, action) {
  action = action || 'set';
  if(isCookieAvailable())
    document.cookie = buildCookieData(key, value, days, path);
  else
    logCookiesUnavailableWarning(key, value, action);
};

_public.get = function(key){
  var allCookies = getAllCookies();
  if(key)
    return allCookies[key] ? allCookies[key] : null;
  return allCookies;
};

_public.remove = function(key, path){
  _public.set(key, '', -1, path, 'remove');
};

function isCookieAvailable(){
  return hasCookieSupport() && isCookieEnabled();
}

function hasCookieSupport(){
  return document && typeof document.cookie == 'string';
}

function isCookieEnabled(){
  var tomorrow = new Date(new Date().getTime() + ONE_DAY_IN_MILLISECONDS);
  document.cookie = 'test=test;path=/;expires=' + tomorrow.toUTCString();
  var isCookieEnabled = document.cookie.indexOf('test') > -1;
  document.cookie = 'test=;path=/;expires=' + new Date(0).toUTCString();
  return isCookieEnabled;
}

function buildCookieData(key, value, days, path){
  var options = buildCookieOptions(days, path);
  var encodedValue = encodeURIComponent(value);
  return key + '=' + encodedValue + ';' + options.path + options.expiration;
}

function buildCookieOptions(days, path){
  return {
    expiration: buildExpirationValue(days),
    path: buildPathValue(path)
  };
}

function buildExpirationValue(days){
  if(days){
    var ONE_DAY = 24*60*60*1000;
    var today = new Date();
    var expiration = new Date(today.setTime(today.getTime() + (days*ONE_DAY)));
    return 'expires=' + expiration.toUTCString();
  }
  return '';
}

function buildPathValue(path){
  path = path || '/';
  return 'path=' + path + ';';
}

function getAllCookies(){
  var cookies = document.cookie.split(';');
  return convertCookiesToObject(cookies);
}

function convertCookiesToObject(cookies){
  var cookiesObj = {};
  for (var i = 0; i < cookies.length; i++)
    convertCurrentCookieToObject(cookies[i], cookiesObj);
  return cookiesObj;
}

function convertCurrentCookieToObject(cookie, cookies){
  var key = buildCookieProperty(cookie.split('=')[0]);
  var value = buildCookieProperty(cookie.split('=')[1]);
  cookies[key] = decode(value);
}

function buildCookieProperty(property){
  if(property)
    return property.trim();
  return '';
}

function logCookiesUnavailableWarning(key, value, action){
  var description = buildCookiesUnavailableWarningDescription(key, value, action);
  console.warn('Cookies Unavailable', description);
  return _public;
}

function buildCookiesUnavailableWarningDescription(key, value, action){
  var description = COOKIES_UNAVAILABLE_WARNING_BASE_DESCRIPTION;
  if(action == 'set')
    description += ' and value: ' + decode(value);
  return description.replace('%a', action).replace('%k', key);
}

function decode(value){
  return decodeURIComponent(value);
}

module.exports = _public;
