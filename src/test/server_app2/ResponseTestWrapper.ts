// With this class, we'll build Request - make them against the server and assert the responses. - Go all the way down to the DB and expect the response
// Need this class to make assertions, so no need to rely on jest

import {
  HTTP_CODES,
  HTTP_METHODS,
} from "../../app/server_app/model/ServerModel";

export class ResponseTestWrapper {
  public statusCode: HTTP_CODES;
  public headers = new Array<object>();
  public body: object;

  public writeHead(statusCode: HTTP_CODES, headers: object) {
    this.statusCode = statusCode;
    this.headers.push(headers);
  }

  public write(stringifiedBody: string) {
    this.body = JSON.parse(stringifiedBody);
  }

  public end() {
    // do nothing
  }

  public clearFields() {
    this.statusCode = undefined;
    this.headers.length = 0;
    this.body = undefined;
  }
}
