const Util = {
  decodeHtml: (html) => {
    let txt = document.createElement("p");
    txt.innerHTML = html;
    return txt.innerText;
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
  const LOWER_BYTE = (code) => code & 0xff;
  const HIGH_BYTE = (code) => code >> 8;

  this.hexValues = [...s].map(word => {
    return `U+${word.charCodeAt(0).toString(16).padStart(4, '0')}`;
  });

  // to do
  // detect if utf-16 string is in little or big endian
  // return utf string in bytes
}

Utf16String.prototype.isCorrupted = function() {
  return this.hexValues.includes("U+fffd");
};

Utf16String.prototype.toHexString = function() {
  return this.hexValues.join(' ');
};
