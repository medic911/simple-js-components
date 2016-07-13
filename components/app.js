(function(){
    "use strict";

    // import
    let Menu        = window.Menu;
    let Form        = window.Form;
    let Model       = window.Model;

    // Компонент форма
    let formView = new Form({
        el: document.querySelector('.b-form'),
        template: '#form'
    });

    // Компонент меню
    let menuView = new Menu({
        el: document.querySelector('.b-menu'),
        template: '#menu',
    });

    // Модель меню
    let menuModel = new Model({
        resourceName: 'menu',
        id: '-KMYjrV7E488G39sDrlj',
    });

    // Загрузка данных в модель меню
    menuModel.fetch(function(data) {
        menuView.updateData(data);
    });

    // Удаление пункта меню
    menuView.on('item.remove', function(event) {
        menuView.removeItem(event.detail);

        // обновление модели
        menuModel.updateData(menuView.data);
    });

    // Добавление пункта меню
    menuView.on('item.add', function() {
        // обновление модели
        menuModel.updateData(menuView.data);
    });

    // Submit формы
    formView.on('form.submit', function(event) {
        menuView.addItem(event.detail.anchor, event.detail.href);
    });

    // export
    window.menu = menu;
    window.form = form;

})(window);
