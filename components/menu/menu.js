(function(){
    "use strict";

    class Menu extends Component {

        constructor(options) {
            super(options);
            this._initEvent('click', this._onClick);
        }

        removeItem(removedItem) {
            this.data.items = this.data.items.filter((item, index) => {
                return index !== removedItem.index;
            });
            this.render();
        }

        _onRemoveItem(item) {
            let index = parseInt(item.parentNode.dataset.index, 10);
            this._trigger('item.remove', {index});
        }

        _pickItem(item) {
            this._trigger('item.pick', {
                href: item.getAttribute('href'),
                anchor: item.textContent
            });
        }

        _onClick(event) {
            event.preventDefault();
            let item = event.target;

            switch (item.dataset.action) {
                case 'remove':
                    this._onRemoveItem(item);
                    break;
                case 'pick':
                    this._pickItem(item);
                    break;
            }
        }
    }

    window.Menu = Menu;

})(window);
