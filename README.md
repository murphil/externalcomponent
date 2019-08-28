in entrypoint file (App.vue etc.)

```js
window.externalComponent = require('externalcomponent')
import jc from 'JsonComponent'
```

in vue.config.js
```js
const registry = 'http://172.178.1.204:2015/vue-components'
const externalModules = {
    'JsonComponent': '1.2.3'
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

publish
```bash
version:=`cat package.json | jq -r '.version'`
lib name='JsonComponent' path='src/components/index.vue':
    npx vue-cli-service build --target lib --formats umd-min --no-clean --dest dist --name "{{name}}.{{version}}" {{path}}
    scp "dist/{{name}}.{{version}}.umd.min.js" \
        "dist/{{name}}.{{version}}.umd.min.js.map" \
        eng:~/Downloads/vue-components/{{name}}
```