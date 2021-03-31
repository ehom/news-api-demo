const Util = {
  decodeHtml: (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
};

const fetchJson = async (resource) => {
 let response = await fetch(resource);
 return await response.json();
};

const fetchJsonS = async (resources) => {
  let promises = resources.map(resource => {
    return fetchJson(resource);
  });
  return await Promise.all(promises);
};
