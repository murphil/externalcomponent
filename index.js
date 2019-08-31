module.exports = function (baseUrl, name) {
  if (this[name]) return this[name];

  this[name] = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.addEventListener('load', () => {
      resolve(this[name]);
    });
    script.addEventListener('error', () => {
      reject(new Error(`Error loading ${name}`));
    });
    script.src = `${baseUrl}/${name.split('.')[0]}/${name}.umd.min.js`;
    document.head.appendChild(script);
  });

  return this[name];
}

