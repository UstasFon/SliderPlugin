import jquery from 'jquery';

import Plugin from './js/plugin';

jquery.fn.plugin = function(params) {
    Object.assign(this, new Plugin(params));
};

jquery('.plugin').plugin();
