(function(){
    "use strict";

    /**
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
         * @param name
         * @returns {Element}
         */
        getField(name) {
            return this.el.querySelector(`[name="${name}"]`);
        }

        /**
         * Регистрация события "submit формы"
         *
         * @param event
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

    window.Form = Form;
})(window);
