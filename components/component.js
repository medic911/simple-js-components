(function(){
    "use strict";

    class Component {

        constructor(options) {
            this.el         = options.el;
            this.data       = options.data;
            this._template  = document.querySelector(options.template).innerHTML;

            this.render();
        }

        render() {
            this.el.innerHTML = TemplateEngine.render(this._template, this.data);
        }

        trigger(type, options) {
            let event = new CustomEvent(type, {
                bubbles: true,
                detail: options
            });

            this.el.dispatchEvent(event);
        }
    }

    window.Component = Component;
})(window);
