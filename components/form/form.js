(function(){
    "use strict";

    // import
    let Component = window.Component;

    /**
     * @class Form
     * Компонент форма
     */
    class Form extends Component {

        /**
         * @inheritDoc
         */
        constructor(options) {
            super(options);
            this.initEvent('submit', this._onSubmit);
        }

        /**
         * Элемент DOM по name
         *
         * @param {string} name - имя поля
         *
         * @returns {Object}
         */
        getField(name) {
            return this.el.querySelector(`[name="${name}"]`);
        }

        /**
         * Регистрация события "submit формы"
         *
         * @param {Object} event
         * @private
         */
        _onSubmit(event) {
            event.preventDefault();

            this.trigger('form.submit', {
                anchor: this.getField('anchor').value,
                href: this.getField('href').value
            });
        }
    }

    // export
    window.Form = Form;

})(window);
