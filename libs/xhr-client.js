(function(){
    "use strict";

    /**
     * @class XhrClient
     * Класс для отправки XMLHttpRequest запросов
     */
    class XhrClient {

        /**
         * POST запрос
         *
         * @param {string} url       - url
         * @param {Object} params    - параметры
         *
         * @returns {XhrClient}
         */
        post(url, params = {}) {
            return this._sendRequest('POST', url, JSON.stringify(params));
        }

        /**
         * GET запрос
         *
         * @param {string} url       - url
         * @param {Object} params    - параметры
         *
         * @returns {XhrClient}
         */
        get(url, params = {}) {
            params = this._getUrlEncodedParams(params);
            url += params ? '?'+params : '';

            return this._sendRequest('GET', url);
        }

        /**
         * DELETE запрос
         *
         * @param url {string}      - url
         * @param params {Object}   - параметры
         *
         * @returns {XhrClient}
         */
        delete(url, params = {}) {
            return this._sendRequest('DELETE', url, JSON.stringify(params));
        }

        /**
         * PUT запрос
         *
         * @param url {string}      - url
         * @param params {Object}   - параметры
         *
         * @returns {XhrClient}
         */
        put(url, params = {}) {
            return this._sendRequest('PUT', url, JSON.stringify(params));
        }

        /**
         * Обработчик ответа
         *
         * @param {Function} callback       - функция-обработчик
         * @param {string} responseType     - content-type ответа сервера (по умолчанию json)
         *
         * @returns {XhrClient}
         */
        done(callback, responseType = 'json') {
            let that = this;
            this.xhr.onreadystatechange = function() {
                if (that.xhr.readyState == 4) {
                    let resp = that.xhr.responseText;
                    if(responseType === 'json') {
                        resp = JSON.parse(that.xhr.responseText);
                    }

                    callback({
                        status: that.xhr.status,
                        data: resp
                    });
                }
            };

            return this;
        }

        /**
         * Создание XMLHttpRequest и отправка запроса
         *
         * @param {string} method    - метод (GET|POST|DELETE|PUT)
         * @param {string} url       - url
         * @param {string} body      - тело запроса
         *
         * @returns {XhrClient}
         * @private
         */
        _sendRequest(method, url, body = '') {

            this.xhr = new XMLHttpRequest();
            this.xhr.open(method, url, true);
            this.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            this.xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            this.xhr.send(body);

            return this;
        }

        /**
         * Возвращает url encoded строку
         *
         * @param {Object} params - параметры
         *
         * @returns {string}
         * @private
         */
        _getUrlEncodedParams(params) {
            let res = '';
            for (let key in params) {
                res += `${key}=`+encodeURIComponent(params[key])+'&';
            }

            return res.slice(0, res.length - 1);
        }
    }

    // export
    window.XhrClient = XhrClient;

})(window);
