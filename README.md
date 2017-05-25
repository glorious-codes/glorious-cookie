# Glorious Cookie

[![CircleCI](https://circleci.com/gh/rafaelcamargo/glorious-cookie.svg?style=svg)](https://circleci.com/gh/rafaelcamargo/glorious-cookie)
[![Test Coverage](https://codeclimate.com/github/rafaelcamargo/glorious-cookie/badges/coverage.svg)](https://codeclimate.com/github/rafaelcamargo/glorious-cookie/coverage)
[![Code Climate](https://codeclimate.com/github/rafaelcamargo/glorious-cookie/badges/gpa.svg)](https://codeclimate.com/github/rafaelcamargo/glorious-cookie)

## Install

Glorious Cookie is available via npm:
```
npm i gcookie --save
```

Once installed, you just need insert it on your page:
``` html
<script src="/node_modules/gcookie/dist/gcookie.min.js"></script>
```

## Usage

Intending to be as simple as possible, Glorious Cookie has only three methods.

### Set

``` javascript
/*
** @key: String [required]
** @value: String [required]
** @days: Number [optional] - If not provided, cookie is removed when the user closes the browser.
** @path: String [optional] - If not provided, cookie is valid for the entire site.
*/
gcookie.set(key, value, days, path);
```

### Get

``` javascript
/*
** @key: String [optional] - If not provided, all cookies will be returned.
*/
gcookie.get(key);
```

### Remove

``` javascript
/*
** @key: String [required]
*/
gcookie.remove(key);
```

**Note:** If cookies are not available, a warning will be logged when trying to set or remove a cookie.

## Release History

- 2017/05/25 v0.1.0 : Initial release
