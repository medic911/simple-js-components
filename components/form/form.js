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
         * Регистрация события "submit формы"
         *
         * @param {Object} event
         * @private
         */
        _onSubmit(event) {
            event.preventDefault();

            this.trigger('form.submit', {
                anchor: this.findByAttr('name', 'anchor').value,
                href: this.findByAttr('name', 'href').value
            });
        }
    }

    // export
    window.Form = Form;

})(window);
