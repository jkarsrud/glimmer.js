import Application from '@glimmer/application';
import { BlankResolver } from '@glimmer/test-utils';

const { module, test } = QUnit;

module('[@glimmer/application] Application InstanceInitializers');

class Component {
  static create() {
    return new Component();
  }
}

test('instance initializers run at initialization', function(assert) {
  let app = new Application({ rootName: 'app', resolver: new BlankResolver() });
  app.registerInitializer({
    initialize(app) {
      app.register('component:/my-app/components/my-component', Component);
    }
  });

  app.initialize();

  assert.ok(app.lookup('component:/my-app/components/my-component'));
  assert.ok(app.lookup('component:/my-app/components/my-component') instanceof Component);
});
