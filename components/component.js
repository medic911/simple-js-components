(function(){
    "use strict";

    class Component {

        constructor(options) {
            this.el         = options.el;
            this.data       = options.data || {};
            this._template  = document.querySelector(options.template).innerHTML;

            this.render();
        }

        render() {
            this.el.innerHTML = TemplateEngine.renderView(this._template, this.data);
        }

        on(type, callback) {
            this.el.addEventListener(type, callback);
        }

        _initEvent(type, callback) {
            this.el.addEventListener(type, callback.bind(this));
        }

        _trigger(type, options) {
            let event = new CustomEvent(type, {
                bubbles: true,
                detail: options
            });

            this.el.dispatchEvent(event);
        }
    }

    window.Component = Component;
})(window);
