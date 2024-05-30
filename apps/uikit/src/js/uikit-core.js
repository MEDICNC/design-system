import { each } from 'uikit-util';
import boot from './api/boot';
import UIkit from './api/index';
import * as components from './core/index';
import './vendor/jquery-3.7.1.min.js';
import './vendor/multiple-select.js';

// register components
each(components, (component, name) => UIkit.component(name, component));

boot(UIkit);

export default UIkit;
