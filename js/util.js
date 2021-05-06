const Util = {
  decodeHtml: (html) => {
    let p = document.createElement("p");
    p.innerHTML = html;
    return p.innerText;
  }
};

const URL = (url) => {
  return `https://cors.bridged.cc/${url}`;
};

const fetchJson = async (resource) => {
 let response = await fetch(URL(resource));
 return await response.json();
};

const fetchJsonS = async (resources) => {
  let promises = resources.map(resource => {
    return fetchJson(resource);
  });
  return await Promise.all(promises);
};

function Utf16String(s) {
  this.s = s;
  this.hexValues = [...s].map(word => {
    return `U+${word.charCodeAt(0).toString(16).padStart(4, '0')}`;
  });
}

Utf16String.prototype.isCorrupted = function() {
  return this.hexValues.includes("U+fffd");
};

Utf16String.prototype.isGreek = function() {
  const greekChars = /([\u0370-\u03FF]+)/g;
  const found = this.s.match(greekChars);
  console.debug('matches: ', found);
  return found !== null;
};

Utf16String.prototype.toHexString = function() {
  return this.hexValues.join(' ');
};
