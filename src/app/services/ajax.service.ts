import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
    HttpResponse,
} from '@angular/common/http';

interface ajaxInterface {
    contentJson?: boolean;
    data?: any;
    noCache?: boolean;
    headers?: object;
    callback?: (arg0: any) => void;
}
interface uriInterface extends ajaxInterface {
    uri: string;
    url?: string;
}
interface urlInterface extends ajaxInterface {
    uri?: string;
    url: string;
}
type ajaxTypeInterface = urlInterface | uriInterface;
interface headersInterface {
    [name: string]: string | string[];
}
type acceptedMethodsInterface =
    | 'post'
    | 'get'
    | 'put'
    | 'delete'
    | 'head'
    | 'options';

@Injectable({
    providedIn: 'root',
})
export class AjaxService {
    constructor(private http: HttpClient) {}

    private readonly ajaxDefaults = {
        contentJson: true,
    };

    public request(data: any): Promise<any> {
        return new Promise((resolve) => {
            const headers = {
                "X-Parse-Application-Id": "c6LqgeoXPcCtCmj8nJV7VzH4vyIkfH4nLSLJU8Mj",
                "X-Parse-REST-API-Key": "YUYm2wZI4dyNn05mfQMhBt5ioQBKDdyn3giuM5IJ",
                "Content-Type": "application/json"
            } as any;
            const options = {
                headers: new HttpHeaders(headers),
            };
            switch(data.method) {
                case 'post':
                case 'put':
                    this.http.post(data.url, data.data, options).subscribe(
                        (success) => {
                            resolve(success);
                        },
                        (error) => {
                            console.log(error.message);
                        }
                    );
                    break;
                
                case 'get':
                    this.http.get(data.url, options).subscribe(
                        (success) => {
                            resolve(success);
                        },
                        (error) => {
                            console.log(error.message);
                        }
                    );
                    break;                    
            }
        }).then((success) => {
            return success;
        });
    }

    // let response = await this.ajax.post2('url', {get: 'sushi'});

    public post(data: ajaxTypeInterface): void {
        this.ajax(data, 'post');
    }
    public get(data: ajaxTypeInterface): void {
        this.ajax(data, 'get');
    }
    public put(data: ajaxTypeInterface): void {
        this.ajax(data, 'put');
    }
    public delete(data: ajaxTypeInterface): void {
        this.ajax(data, 'delete');
    }
    public head(data: ajaxTypeInterface): void {
        this.ajax(data, 'head');
    }
    public options(data: ajaxTypeInterface): void {
        this.ajax(data, 'options');
    }

    private ajax(
        _data: ajaxTypeInterface,
        method: acceptedMethodsInterface
    ): void {
        const data = this.prepare.data(_data, method);
        const options = this.prepare.headers(data);

        switch (method) {
            case 'get':
            case 'head':
            case 'options':
            case 'delete':
                this.http[method](data.url as any, options).subscribe(
                    (success: ArrayBuffer) => {
                        this.handle.response(success as any, data);
                    },
                    (error: HttpErrorResponse) => {
                        this.handle.error(error);
                    }
                );
                break;

            case 'post':
            case 'put':
                this.http.post(data.url as any, data.data, options).subscribe(
                    (success: ArrayBuffer) => {
                        this.handle.response(success as any, data);
                    },
                    (error: HttpErrorResponse) => {
                        this.handle.error(error);
                    }
                );
                break;
        }
    }

    private readonly prepare = {
        data: (
            data: ajaxTypeInterface,
            type: acceptedMethodsInterface
        ): ajaxTypeInterface => {
            if (data.uri) {
                data.url = data.uri;
            }

            if (type === 'get') {
                if (data.noCache) {
                    data.data = `_=${
                        new Date().getTime() +
                        (data.data ? `&${data.data}` : '')
                    }`;
                }
                if (data.data) {
                    data.url += `?${data.data}`;                    
                }
            }

            return { ...this.ajaxDefaults, ...data };
        },
        headers: (data: ajaxTypeInterface) => {
            let headers = {} as headersInterface;

            headers["X-Parse-Application-Id"] = "c6LqgeoXPcCtCmj8nJV7VzH4vyIkfH4nLSLJU8Mj";
            headers["X-Parse-REST-API-Key"] = "YUYm2wZI4dyNn05mfQMhBt5ioQBKDdyn3giuM5IJ";

            if (data.contentJson) {
                headers['Content-Type'] = 'application/json';
            }

            if (data.headers) {
                headers = {...headers, ...data.headers};
            }

            return {
                observe: 'response',
                headers: new HttpHeaders(headers),
            } as any;
        },
    };

    private readonly handle = {
        response: (
            response: HttpResponse<any>,
            data: ajaxTypeInterface
        ): void => {
            if (!response || !response.body) {
                alert('There was no response from the server');
                return;
            }
            if (data.callback) {
                data.callback(response.body);
            }
        },
        error: (error: HttpErrorResponse): void => {
            if (error.error instanceof ErrorEvent) {
                alert(`An error occurred: ${error.error.message.toString()}`);
                return;
            }
            if (error.status === 200) {
                alert(error.error.text);
                return;
            }
            alert(`Backend returned code ${error.status}`);
        },
    };
}