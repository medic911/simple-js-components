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

            this.anchorField    = this.findByAttr('name', 'anchor');
            this.hrefField      = this.findByAttr('name', 'href');

            this.on('submit', this._onSubmit);
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
                anchor: this.anchorField.value,
                href: this.hrefField.value
            });

            this._clearFields();
        }

        /**
         * Очистка полей формы
         *
         * @private
         */
        _clearFields() {
            this.anchorField.value = '';
            this.hrefField.value = '';
        }
    }

    // export
    window.Form = Form;

})(window);
