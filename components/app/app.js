(function(){
    "use strict";

    let Menu = window.Menu;

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

    menu.on('item.remove', function(event) {
       menu.removeItem(event.detail);
    });

    window.menu = menu;

})(window);
