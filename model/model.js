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
            this.resourceName   = options.resourceName;
            this.data           = options.data || {};
            this.id             = options.id || null;
            this.dataFormat     = options.dataFormat || 'json';

            // XMLHttpRequest client
            this.xhrClient      = new XhrClient();
        }

        /**
         * Загрузка экземпляра ресурса
         *
         * @param {Function} callback
         */
        fetchOne(callback) {
            this._fetch(this._buildUrl(Model._resourceTypes().TYPE_ENTITY), callback);
        }

        /**
         * Загрузка коллекции
         *
         * @param {Function} callback
         */
        fetchAll(callback) {
            this._fetch(this._buildUrl(Model._resourceTypes().TYPE_COLLECTION), callback);
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
                this.xhrClient.put(this._buildUrl(Model._resourceTypes().TYPE_ENTITY), this.data).done(function() {
                    if(callback !== undefined) {
                        callback.bind(that);
                    }
                }, this.dataFormat);
            // POST для нового ресурса
            } else {
                this.xhrClient.post(this._buildUrl(Model._resourceTypes().TYPE_COLLECTION), this.data).done(function() {
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

            this.xhrClient.delete(this._buildUrl(Model._resourceTypes().TYPE_ENTITY)).done(function() {
                if(callback !== undefined) {
                    callback.bind(that);
                }
            }, this.dataFormat);
        }

        /**
         * Обновление модели
         *
         * @param {Object} data         - данные
         * @param {Function} callback   - callback
         */
        update(data, callback) {
            this.data = data;
            this.save(callback);
        }

        /**
         * Fetch ресурса
         *
         * @param {string} url
         * @param {Function} callback
         * @private
         */
        _fetch(url, callback) {
            let that = this;
            this.xhrClient.get(url, this.data).done(function(response) {
                if(response.status == 200) {
                    that.data = response.data;
                    callback.apply(that, [response.data]);
                }
            }, this.dataFormat);
        }

        /**
         * URL генератор для ресурса
         *
         * @returns {string} - url ресурса
         *
         * @private
         */
        _buildUrl(type) {
            let url = `${BASE_URL}${this.resourceName}`;

            if(type == Model._resourceTypes().TYPE_ENTITY) {
                url += `/${this.id}.${this.dataFormat}`;
            } else {
                url += `.${this.dataFormat}`;
            }

            return url;
        }

        static _resourceTypes() {
            return {
                TYPE_ENTITY: 'TYPE_ENTITY',
                TYPE_COLLECTION: 'TYPE_COLLECTION'
            }
        }

    }

    // export
    window.Model = Model;

})(window);