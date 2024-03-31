// With this class, we'll build Request - make them against the server and assert the responses. - Go all the way down to the DB and expect the response
// Need this class to make assertions, so no need to rely on jest

import { HTTP_METHODS } from "../../app/server_app/model/ServerModel";

export class RequestTestWrapper {
  public body: object;
  public url: string;
  public method: HTTP_METHODS;
  public headers = {};

  // in getRequestBody
  public on(event: string, cb: Function) {
    if (event === "data") {
      cb(JSON.stringify(this.body));
    } else {
      cb();
    }
  }

  public clearFields() {
    this.body = undefined;
    this.url = undefined;
    this.method = undefined;
    this.headers = {};
  }
}
