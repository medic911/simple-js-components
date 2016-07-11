(function(){
    "use strict";

    /**
     * Базовый класс для компонента
     */
    class Component {

        /**
         * Constructor
         *
         * @param options - входные параметры
         */
        constructor(options) {
            this.el         = options.el;
            this.data       = options.data || {};
            this._template  = document.querySelector(options.template).innerHTML;

            this.render();
        }

        /**
         * Рендер компонента в DOM
         */
        render() {
            this.el.innerHTML = TemplateEngine.renderView(this._template, this.data);
        }

        /**
         * Event listener для события компонента
         *
         * @param type      - название события
         * @param callback  - функция-обработчик
         */
        on(type, callback) {
            this.el.addEventListener(type, callback);
        }

        /**
         * Регистрация события
         *
         * @param type      - название события
         * @param callback  - функция-обработчик
         */
        initEvent(type, callback) {
            this.el.addEventListener(type, callback.bind(this));
        }

        /**
         * Создание кастомного события
         *
         * @param type      - название события
         * @param options   - параметры события
         */
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
