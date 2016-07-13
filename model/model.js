(function() {
    "use strict";

    // import
    let XhrClient = window.XhrClient;

    const BASE_URL = 'https://js-components.firebaseio.com/';

    /**
     * @class Model
     * Класс модель
     */
    class Model {

        /**
         * Constructor
         *
         * @param {Object} options - входные данные
         */
        constructor(options) {
            this.resourceName   = options['resourceName'];
            this.data           = options.data || {};
            this.id             = options.id || null;
            this.dataFormat     = options['dataFormat'] || 'json';

            // XMLHttpRequest client
            this.xhrClient      = new XhrClient();
        }

        /**
         * Загрузка ресурса по ID
         *
         * @param {Function} callback
         */
        fetch(callback) {
            let that = this;

            this.xhrClient.get(this._buildUrl()).done(function(response) {
                if(response.status == 200) {
                    that.data = response.data;
                    callback.apply(that, [response.data]);
                }
            }, this.dataFormat);
        }

        /**
         * Сохранение/создание ресурса
         *
         * @param {Function} callback
         */
        save(callback) {
            let that = this;

            // PUT для существующего ресурса
            if(this.id) {
                this.xhrClient.put(this._buildUrl(), this.data).done(function() {
                    if(callback !== undefined) {
                        callback.bind(that);
                    }
                }, this.dataFormat);
            // POST для нового ресурса
            } else {
                this.xhrClient.post(this._buildUrl(), this.data).done(function() {
                    if(callback !== undefined) {
                        callback.bind(that);
                    }
                }, this.dataFormat);
            }
        }

        /**
         * Удаление ресурса
         *
         * @param {Function} callback
         */
        delete(callback) {
            let that = this;

            this.xhrClient.delete(this._buildUrl()).done(function(response) {
                if(callback !== undefined) {
                    callback.bind(that);
                }
            }, this.dataFormat);
        }

        /**
         * Обновление данных модели
         *
         * @param {Object} data         - данные
         * @param {Function} callback   - callback
         */
        updateData(data, callback) {
            this.data = data;
            this.save(callback);
        }

        /**
         * URL генератор для ресурса
         *
         * @returns {string} - url ресурса
         *
         * @private
         */
        _buildUrl() {
            let url = `${BASE_URL}${this.resourceName}`;

            if(this.id) {
                url += `/${this.id}.${this.dataFormat}`;
            } else {
                url += `.${this.dataFormat}`;
            }

            return url;
        }

    }

    // export
    window.Model = Model;

})(window);