in entrypoint file (App.vue etc.)

```js
window.externalComponent = require('externalcomponent')
import jc from 'JsonComponent'
```

in vue.config.js
```js
const registry = 'http://172.178.1.204:2015/vue-components'
const externalModules = {
    'JsonComponent': 'fb1b7a6223e2328a3db5'
}
module.exports = {
    configureWebpack: config => {
        config.externals = (context, request, callback) => {
            if (request in externalModules) {
                callback(null, `() => window.externalComponent('${registry}','${request}.${externalModules[request]}')`)
            } else {
                callback();
            }
        }
    }
};
```