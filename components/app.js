(function(){
    "use strict";

    // import
    let Menu        = window.Menu;
    let Form        = window.Form;

    // Компонент меню
    let menu = new Menu({
        el: document.querySelector('.b-menu'),
        template: '#menu',
        data: {
            title: 'SIMPLE APPLICATION',
            items: [
                {
                    anchor: 'mail.ru',
                    href: 'http://mail.ru'
                },
                {
                    anchor: 'yandex.ru',
                    href: 'http://yandex.ru'
                }
            ]
        }
    });

    // Компонент форма
    let form = new Form({
        el: document.querySelector('.b-form'),
        template: '#form'
    });

    // Удаление элемента из меню
    menu.on('item.remove', function(event) {
       menu.removeItem(event.detail);
    });

    // Submit формы
    form.on('form.submit', function(event) {
        menu.addItem(event.detail.anchor, event.detail.href);
    });

    // export
    window.menu = menu;
    window.form = form;

})(window);
