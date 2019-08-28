export default function externalComponent(baseUrl) {
  return async function (name) {
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
      script.src = `${baseUrl}/${id.split('.')[0]}/${id}.umd.min.js`;
      document.head.appendChild(script);
    });

    return window[name];
  }
}

