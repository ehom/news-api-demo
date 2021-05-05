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
  const LOWER_BYTE = (code) => code & 0xff;
  const HIGH_BYTE = (code) => code >> 8;

  this.s = s;
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

Utf16String.prototype.isGreek = function() {
  let isGreek = false;
  // TODO: use Regex?
  // prove that there's greek text
  const isGreekChar = (charCode) => {
    return charCode >= 0x0370 && charCode <= 0x03ff;
  };

  const isAsciiChar = (charCode) => {
    return charCode >= 0x0020 && charCode <= 0x007e;
  };

  for (let i = 0; i < this.s.length; i++) {
    const charCode = this.s.charCodeAt(i);
    if (isGreekChar(charCode) || isAsciiChar(charCode)) {
      isGreek = true;
      break;
    }
  }
  return isGreek;
};

Utf16String.prototype.toHexString = function() {
  return this.hexValues.join(' ');
};
