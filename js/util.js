const Util = {
  decodeHtml: (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
};

const fetchResource = async (resource) => {
 let response = await fetch(resource);
 return await response.json();
};

const fetchResources = async (resources) => {
  let promises = resources.map(resource => {
    return fetchResource(resource);
  });
  return await Promise.all(promises);
};
