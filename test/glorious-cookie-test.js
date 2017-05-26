var chai = require('chai');
var expect = require('chai').expect;
var spies = require('chai-spies');

var window, $document

chai.use(spies);

describe('Glorious Cookie', function(){

  var $document, gcookie, cookiesMock, originalCookie;

  beforeEach(function(){
    global.window = require('./window-mock');
    $document = require('../src/providers').$document;
    gcookie = require('../src/glorious-cookie');
    cookiesMock = 'name=jo%C3%A3o;age=23;city=s%C3%A3o%20paulo';
  });

  afterEach(function(){
    $document.cookie = '';
    delete global.window;
  });

  it('should set a cookie', function(){
    gcookie.set('name','rafael');
    expect($document.cookie).to.equal('name=rafael;path=/;');
  });

  it('should set a cookie with options', function(){
    var FIVE_DAYS_IN_MILI = 432000000;
    var now = new Date();
    var expiration = new Date(now.getTime() + FIVE_DAYS_IN_MILI).toUTCString();

    gcookie.set('name','joão', 5, '/contact');
    expect($document.cookie).to.equal('name=jo%C3%A3o;path=/contact;expires=' + expiration);
  });

  it('should get all cookies', function(){
    var cookies;

    $document.cookie = cookiesMock;
    cookies = gcookie.get();
    expect(cookies.name).to.equal('joão');
    expect(cookies.age).to.equal('23');
    expect(cookies.city).to.equal('são paulo');
  });

  it('should get a specific cookie', function(){
    var name;

    $document.cookie = cookiesMock;
    name = gcookie.get('name');
    expect(name).to.equal('joão');
  });

  it('should return null when getting an non existing cookie', function(){
    var country;

    $document.cookie = cookiesMock;
    country = gcookie.get('country');
    expect(country).to.equal(null);
  });

  it('should remove a cookie', function(){
    var name;

    $document.cookie = cookiesMock;
    gcookie.remove('name');
    name = gcookie.get('name');
    expect(name).to.equal(null);
  });

  it('should log warning when trying set cookie, but cookies are not available', function(){
    var message = 'It was not possible to set a cookie with the key: name and ' +
                  'value: rafael';

    delete $document.cookie;
    chai.spy.on(console, 'warn');
    gcookie.set('name','rafael');
    expect(console.warn).to.have.been.called.with('Cookies Unavailable', message);
  });

  it('should log warning when trying remove cookie, but cookies are not available', function(){
    var message = 'It was not possible to remove a cookie with the key: name';

    delete $document.cookie;
    chai.spy.on(console, 'warn');
    gcookie.remove('name');
    expect(console.warn).to.have.been.called.with('Cookies Unavailable', message);
  });

});
