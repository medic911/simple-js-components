(function(){
    "use strict";

    class Form extends Component {

        constructor(options) {
            super(options);
            this._initEvent('submit', this._onSubmit);
        }

        getField (name) {
            return this.el.querySelector(`[name="${name}"]`);
        }

        _onSubmit(event) {
            event.preventDefault();

            this._trigger('form.submit', {
                anchor: this.getField('anchor').value,
                href: this.getField('href').value
            });
        }
    }

    window.Form = Form;
})(window);
