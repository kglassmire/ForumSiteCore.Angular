/* tslint:disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v11.17.0.0 (NJsonSchema v9.10.42.0 (Newtonsoft.Json v9.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class AuthService {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "http://localhost:5000";
    }

    login(model: LoginDto | null, returnUrl: string | null | undefined): Observable<FileResponse | null> {
        let url_ = this.baseUrl + "/api/auth/login?";
        if (returnUrl !== undefined)
            url_ += "returnUrl=" + encodeURIComponent("" + returnUrl) + "&"; 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(model);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processLogin(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processLogin(<any>response_);
                } catch (e) {
                    return <Observable<FileResponse | null>><any>Observable.throw(e);
                }
            } else
                return <Observable<FileResponse | null>><any>Observable.throw(response_);
        });
    }

    protected processLogin(response: HttpResponseBase): Observable<FileResponse | null> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
            const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            return Observable.of({ fileName: fileName, data: <any>responseBlob, status: status, headers: _headers });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<FileResponse | null>(<any>null);
    }

    logout(): Observable<FileResponse | null> {
        let url_ = this.baseUrl + "/api/auth/logout";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processLogout(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processLogout(<any>response_);
                } catch (e) {
                    return <Observable<FileResponse | null>><any>Observable.throw(e);
                }
            } else
                return <Observable<FileResponse | null>><any>Observable.throw(response_);
        });
    }

    protected processLogout(response: HttpResponseBase): Observable<FileResponse | null> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            const fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
            const fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            return Observable.of({ fileName: fileName, data: <any>responseBlob, status: status, headers: _headers });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<FileResponse | null>(<any>null);
    }
}

@Injectable()
export class ForumService {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "http://localhost:5000";
    }

    forumSearch(search: string): Observable<string[] | null> {
        let url_ = this.baseUrl + "/api/forum/search/{search}";
        if (search === undefined || search === null)
            throw new Error("The parameter 'search' must be defined.");
        url_ = url_.replace("{search}", encodeURIComponent("" + search)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processForumSearch(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processForumSearch(<any>response_);
                } catch (e) {
                    return <Observable<string[] | null>><any>Observable.throw(e);
                }
            } else
                return <Observable<string[] | null>><any>Observable.throw(response_);
        });
    }

    protected processForumSearch(response: HttpResponseBase): Observable<string[] | null> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(item);
            }
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<string[] | null>(<any>null);
    }

    new(name: string): Observable<ForumPostListing | null> {
        let url_ = this.baseUrl + "/api/forum/{name}/new";
        if (name === undefined || name === null)
            throw new Error("The parameter 'name' must be defined.");
        url_ = url_.replace("{name}", encodeURIComponent("" + name)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processNew(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processNew(<any>response_);
                } catch (e) {
                    return <Observable<ForumPostListing | null>><any>Observable.throw(e);
                }
            } else
                return <Observable<ForumPostListing | null>><any>Observable.throw(response_);
        });
    }

    protected processNew(response: HttpResponseBase): Observable<ForumPostListing | null> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? ForumPostListing.fromJS(resultData200) : <any>null;
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<ForumPostListing | null>(<any>null);
    }

    hot(name: string): Observable<ForumPostListing | null> {
        let url_ = this.baseUrl + "/api/forum/{name}/hot";
        if (name === undefined || name === null)
            throw new Error("The parameter 'name' must be defined.");
        url_ = url_.replace("{name}", encodeURIComponent("" + name)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processHot(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processHot(<any>response_);
                } catch (e) {
                    return <Observable<ForumPostListing | null>><any>Observable.throw(e);
                }
            } else
                return <Observable<ForumPostListing | null>><any>Observable.throw(response_);
        });
    }

    protected processHot(response: HttpResponseBase): Observable<ForumPostListing | null> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? ForumPostListing.fromJS(resultData200) : <any>null;
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<ForumPostListing | null>(<any>null);
    }

    top(name: string): Observable<ForumPostListing | null> {
        let url_ = this.baseUrl + "/api/forum/{name}/top";
        if (name === undefined || name === null)
            throw new Error("The parameter 'name' must be defined.");
        url_ = url_.replace("{name}", encodeURIComponent("" + name)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processTop(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processTop(<any>response_);
                } catch (e) {
                    return <Observable<ForumPostListing | null>><any>Observable.throw(e);
                }
            } else
                return <Observable<ForumPostListing | null>><any>Observable.throw(response_);
        });
    }

    protected processTop(response: HttpResponseBase): Observable<ForumPostListing | null> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? ForumPostListing.fromJS(resultData200) : <any>null;
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<ForumPostListing | null>(<any>null);
    }

    controversial(name: string): Observable<ForumPostListing | null> {
        let url_ = this.baseUrl + "/api/forum/{name}/controversial";
        if (name === undefined || name === null)
            throw new Error("The parameter 'name' must be defined.");
        url_ = url_.replace("{name}", encodeURIComponent("" + name)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processControversial(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processControversial(<any>response_);
                } catch (e) {
                    return <Observable<ForumPostListing | null>><any>Observable.throw(e);
                }
            } else
                return <Observable<ForumPostListing | null>><any>Observable.throw(response_);
        });
    }

    protected processControversial(response: HttpResponseBase): Observable<ForumPostListing | null> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 ? ForumPostListing.fromJS(resultData200) : <any>null;
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<ForumPostListing | null>(<any>null);
    }
}

@Injectable()
export class ValuesService {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "http://localhost:5000";
    }

    getAll(): Observable<string[] | null> {
        let url_ = this.baseUrl + "/api/Values";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processGetAll(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(<any>response_);
                } catch (e) {
                    return <Observable<string[] | null>><any>Observable.throw(e);
                }
            } else
                return <Observable<string[] | null>><any>Observable.throw(response_);
        });
    }

    protected processGetAll(response: HttpResponseBase): Observable<string[] | null> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (resultData200 && resultData200.constructor === Array) {
                result200 = [];
                for (let item of resultData200)
                    result200.push(item);
            }
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<string[] | null>(<any>null);
    }

    post(value: string | null): Observable<void> {
        let url_ = this.baseUrl + "/api/Values";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(value);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("post", url_, options_).flatMap((response_ : any) => {
            return this.processPost(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPost(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processPost(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    get(id: number): Observable<string | null> {
        let url_ = this.baseUrl + "/api/Values/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).flatMap((response_ : any) => {
            return this.processGet(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<string | null>><any>Observable.throw(e);
                }
            } else
                return <Observable<string | null>><any>Observable.throw(response_);
        });
    }

    protected processGet(response: HttpResponseBase): Observable<string | null> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return Observable.of(result200);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<string | null>(<any>null);
    }

    put(id: number, value: string | null): Observable<void> {
        let url_ = this.baseUrl + "/api/Values/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(value);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("put", url_, options_).flatMap((response_ : any) => {
            return this.processPut(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processPut(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processPut(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }

    delete(id: number): Observable<void> {
        let url_ = this.baseUrl + "/api/Values/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id)); 
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json", 
            })
        };

        return this.http.request("delete", url_, options_).flatMap((response_ : any) => {
            return this.processDelete(response_);
        }).catch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processDelete(<any>response_);
                } catch (e) {
                    return <Observable<void>><any>Observable.throw(e);
                }
            } else
                return <Observable<void>><any>Observable.throw(response_);
        });
    }

    protected processDelete(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob = 
            response instanceof HttpResponse ? response.body : 
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }};
        if (status === 200) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return Observable.of<void>(<any>null);
            });
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).flatMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Observable.of<void>(<any>null);
    }
}

export class LoginDto {
    userName?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    rememberMe: boolean;

    init(data?: any) {
        if (data) {
            this.userName = data["userName"];
            this.email = data["email"];
            this.password = data["password"];
            this.rememberMe = data["rememberMe"];
        }
    }

    static fromJS(data: any): LoginDto {
        data = typeof data === 'object' ? data : {};
        let result = new LoginDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userName"] = this.userName;
        data["email"] = this.email;
        data["password"] = this.password;
        data["rememberMe"] = this.rememberMe;
        return data; 
    }
}

export class ForumPostListing {
    forum?: ForumDto | undefined;
    posts?: PostDto[] | undefined;
    forumListingType?: string | undefined;

    init(data?: any) {
        if (data) {
            this.forum = data["forum"] ? ForumDto.fromJS(data["forum"]) : <any>undefined;
            if (data["posts"] && data["posts"].constructor === Array) {
                this.posts = [];
                for (let item of data["posts"])
                    this.posts.push(PostDto.fromJS(item));
            }
            this.forumListingType = data["forumListingType"];
        }
    }

    static fromJS(data: any): ForumPostListing {
        data = typeof data === 'object' ? data : {};
        let result = new ForumPostListing();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["forum"] = this.forum ? this.forum.toJSON() : <any>undefined;
        if (this.posts && this.posts.constructor === Array) {
            data["posts"] = [];
            for (let item of this.posts)
                data["posts"].push(item.toJSON());
        }
        data["forumListingType"] = this.forumListingType;
        return data; 
    }
}

export class ForumDto {
    id?: string | undefined;
    created: Date;
    updated: Date;
    inactive: boolean;
    name?: string | undefined;
    description?: string | undefined;
    saves: number;

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.created = data["created"] ? new Date(data["created"].toString()) : <any>undefined;
            this.updated = data["updated"] ? new Date(data["updated"].toString()) : <any>undefined;
            this.inactive = data["inactive"];
            this.name = data["name"];
            this.description = data["description"];
            this.saves = data["saves"];
        }
    }

    static fromJS(data: any): ForumDto {
        data = typeof data === 'object' ? data : {};
        let result = new ForumDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["created"] = this.created ? this.created.toISOString() : <any>undefined;
        data["updated"] = this.updated ? this.updated.toISOString() : <any>undefined;
        data["inactive"] = this.inactive;
        data["name"] = this.name;
        data["description"] = this.description;
        data["saves"] = this.saves;
        return data; 
    }
}

export class PostDto {
    id: number;
    name?: string | undefined;
    description?: string | undefined;
    url?: string | undefined;
    hotScore: number;
    controversyScore: number;
    totalScore: number;
    upvotes: number;
    downvotes: number;
    created: Date;
    updated: Date;
    commentsCount: number;
    savesCount: number;
    userName?: string | undefined;
    forumName?: string | undefined;

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            this.description = data["description"];
            this.url = data["url"];
            this.hotScore = data["hotScore"];
            this.controversyScore = data["controversyScore"];
            this.totalScore = data["totalScore"];
            this.upvotes = data["upvotes"];
            this.downvotes = data["downvotes"];
            this.created = data["created"] ? new Date(data["created"].toString()) : <any>undefined;
            this.updated = data["updated"] ? new Date(data["updated"].toString()) : <any>undefined;
            this.commentsCount = data["commentsCount"];
            this.savesCount = data["savesCount"];
            this.userName = data["userName"];
            this.forumName = data["forumName"];
        }
    }

    static fromJS(data: any): PostDto {
        data = typeof data === 'object' ? data : {};
        let result = new PostDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["description"] = this.description;
        data["url"] = this.url;
        data["hotScore"] = this.hotScore;
        data["controversyScore"] = this.controversyScore;
        data["totalScore"] = this.totalScore;
        data["upvotes"] = this.upvotes;
        data["downvotes"] = this.downvotes;
        data["created"] = this.created ? this.created.toISOString() : <any>undefined;
        data["updated"] = this.updated ? this.updated.toISOString() : <any>undefined;
        data["commentsCount"] = this.commentsCount;
        data["savesCount"] = this.savesCount;
        data["userName"] = this.userName;
        data["forumName"] = this.forumName;
        return data; 
    }
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}

export class SwaggerException extends Error {
    message: string;
    status: number; 
    response: string; 
    headers: { [key: string]: any; };
    result: any; 

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if(result !== null && result !== undefined)
        return Observable.throw(result);
    else
        return Observable.throw(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader(); 
            reader.onload = function() { 
                observer.next(this.result);
                observer.complete();
            }
            reader.readAsText(blob); 
        }
    });
}