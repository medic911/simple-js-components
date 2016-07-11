(function(){
    "use strict";

    let Menu = window.Menu;
    let Form = window.Form;

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

    let form = new Form({
        el: document.querySelector('.b-form'),
        template: '#form'
    });

    menu.on('item.remove', function(event) {
       menu.removeItem(event.detail);
    });

    form.on('form.submit', function(event) {
        menu.addItem(event.detail.anchor, event.detail.href);
    });

    window.menu = menu;


})(window);
