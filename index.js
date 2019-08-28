export function loadExt(baseUrl, name) {
  if (window[name]) return window[name];

  window[name] = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.addEventListener('load', () => {
      resolve(window[name]);
    });
    script.addEventListener('error', () => {
      reject(new Error(`Error loading ${name}`));
    });
    script.src = `${baseUrl}/${name.split('.')[0]}/${name}.umd.min.js`;
    document.head.appendChild(script);
  });

  return window[name];
}

export function externalComponent(baseUrl) {
  return function (name) {
    return () => loadExt(baseUrl, name)
  }
}

