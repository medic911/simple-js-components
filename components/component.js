(function(){
    "use strict";

    // import
    let TemplateEngine  = window.TemplateEngine;

    /**
     * @class Component
     * Базовый класс компонента
     */
    class Component {

        /**
         * Constructor
         *
         * @param {Object} options - входные параметры
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
         * Поиск объекта в DOM
         *
         * @param {string} attrName     - имя атрибута
         * @param {string} attrValue    - значение атрибута
         *
         * @returns {Object}
         */
        findByAttr(attrName, attrValue) {
            return this.el.querySelector(`[${attrName}="${attrValue}"]`);
        }

        /**
         * Добавление обработчика для события
         *
         * @param {string} type         - название события
         * @param {Function} callback   - функция-обработчик
         */
        on(type, callback) {
            this.el.addEventListener(type, callback.bind(this));
        }

        /**
         * Регистрация кастомного события
         *
         * @param {string} type      - название события
         * @param {Object} options   - параметры события
         */
        trigger(type, options) {
            let event = new CustomEvent(type, {
                bubbles: true,
                detail: options
            });

            this.el.dispatchEvent(event);
        }
    }

    // export
    window.Component = Component;

})(window);
