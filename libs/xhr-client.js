(function(){
    "use strict";

    class XhrClient {

        create(method, url) {
            this.xhr = new XMLHttpRequest();
            this.xhr.open(method, url, true);

            if(method === 'POST') {
                this.xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            }

            return this;
        }

        send(body = '') {
            this.xhr.send(body);

            return this;
        }

        onDone(callback, responseType = 'json') {
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
    }

    window.XhrClient = XhrClient;
})(window);
