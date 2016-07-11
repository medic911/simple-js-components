(function(){
    "use strict";

    // import
    let Component = window.Component;

    /**
     * @class Menu
     * Компонент меню
     */
    class Menu extends Component {

        /**
         * @inheritDoc
         */
        constructor(options) {
            super(options);
            this.initEvent('click', this._onClick);
        }

        /**
         * Удаление пункта меню
         *
         * @param {Object} removedItem - элемент для удаления
         */
        removeItem(removedItem) {
            this.data.items = this.data.items.filter((item, index) => {
                return index !== removedItem.index;
            });
            this.render();
        }

        /**
         * Добавление пункта меню
         *
         * @param {string} anchor    - название
         * @param {string} href      - адрес
         */
        addItem(anchor, href) {
            this.data.items.push({
                anchor: anchor,
                href: href
            });
            this.render();
        }

        /**
         * Обновление пунктов меню
         *
         * @param {Object} items - список элементов
         */
        updateItems(items) {
            this.data.items = items;
            this.render();
        }

        /**
         * Регистрация события "удаление элемента"
         *
         * @param {Object} item - удаляемый элемент
         * @private
         */
        _onRemoveItem(item) {
            let index = parseInt(item.parentNode.dataset.index, 10);
            this.trigger('item.remove', {index});
        }

        /**
         * Регистрация события "выбор элемента"
         *
         * @param {Object} item - выбранный элемент
         * @private
         */
        _pickItem(item) {
            this.trigger('item.pick', {
                href: item.getAttribute('href'),
                anchor: item.textContent
            });
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
                case 'remove':
                    this._onRemoveItem(item);
                    break;
                case 'pick':
                    this._pickItem(item);
                    break;
            }
        }
    }

    // export
    window.Menu = Menu;

})(window);
