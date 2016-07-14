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

            this.on('submit', this._onSubmit);
            this.on('click', this._onClick);
        }

        /**
         * Обновление данных формы
         *
         * @param {Object} data
         */
        updateData(data) {
            this.data = data;
            this.render();
        }

        /**
         * Валидация формы
         *
         * @returns {boolean}
         * @private
         */
        _validate() {
            let valid = true;

            this.el.querySelectorAll('input').forEach(function(input) {
                input.parentNode.classList.remove('has-error');
                if (input.validity && !input.validity.valid) {
                    valid = false;
                    input.parentNode.classList.add('has-error');
                }
            });

            return valid;
        }

        /**
         * Обработчик события "submit формы"
         *
         * @param {Object} event
         * @private
         */
        _onSubmit(event) {
            event.preventDefault();

            if(this._validate()) {
                this.trigger('form.submit', {
                    anchor: this.findByAttr('name', 'anchor').value,
                    href: this.findByAttr('name', 'href').value,
                    index: this.data.index,
                    mode: this.data.mode
                });

                this._onExitEdit();
            }
        }

        /**
         * Обработчик события "выход из режима редактирования"
         *
         * @private
         */
        _onExitEdit() {
            this.updateData({
                title: 'Добавить',
                anchor: '',
                href: '',
                mode: Form.mode().ADD
            });
        }

        /**
         * Очистка полей формы
         * @private
         */
        _clearFields() {
            this.findByAttr('name', 'anchor').value = '';
            this.findByAttr('name', 'href').value = '';
        }

        /**
         * Обработчик события "клик"
         *
         * @param {Object} event - объект события
         * @private
         */
        _onClick(event) {
            event.preventDefault();
            let item = event.target;

            switch (item.dataset.action) {
                case 'exit-edit':
                    this._onExitEdit();
                    break;
                case 'submit':
                    this._onSubmit(event);
                    break;
            }
        }

        /**
         * Варианты состояний формы (редактирование/добавление)
         *
         * @returns {{EDIT: string, ADD: string}}
         */
        static mode() {
            return {
                EDIT: 'edit',
                ADD: 'add'
            }
        }
    }

    // export
    window.Form = Form;

})(window);
