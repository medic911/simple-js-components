(function(){
    "use strict";

    // import
    let Menu        = window.Menu;
    let Form        = window.Form;
    let Model       = window.Model;

    // Компонент форма
    let formView = new Form({
        el: document.querySelector('.b-form'),
        template: '#form',
        data: {
            title: 'Добавить',
            mode: Form.mode().ADD
        }
    });

    // Компонент меню
    let menuView = new Menu({
        el: document.querySelector('.b-menu'),
        template: '#menu'
    });

    // Модель меню
    let menuModel = new Model({
        resourceName: 'menu',
        id: '-KMYjrV7E488G39sDrlj'
    });

    // Загрузка данных в модель меню
    menuModel.fetchOne(function(data) {
        menuView.updateData(data);
    });

    // Удаление пункта меню
    menuView.on('item.remove', function(event) {
        menuView.removeItem(event.detail);

        // обновление модели
        menuModel.update(menuView.data);
    });

    // Добавление пункта меню
    menuView.on('item.add', function() {
        // обновление модели
        menuModel.update(menuView.data);
    });

    // Обновление пункта меню
    menuView.on('items.update', function() {
        // обновление модели
        menuModel.update(menuView.data);
    });

    // Выбор пункта меню
    menuView.on('item.pick', function(event) {});

    // Редиктирование пункта меню
    menuView.on('item.edit', function(event) {
        formView.updateData({
            title: 'Обновить',
            anchor: event.detail.anchor.trim(),
            href: event.detail.href.trim(),
            index: event.detail.index,
            mode: Form.mode().EDIT
        });
    });

    // Submit формы
    formView.on('form.submit', function(event) {
        if(event.detail.mode == Form.mode().ADD) {
            menuView.addItem(event.detail.anchor, event.detail.href);
        } else {
            menuView.updateItem(event.detail.anchor, event.detail.href, event.detail.index);
        }
    });

    // export
    window.menu = menu;
    window.form = form;

})(window);
