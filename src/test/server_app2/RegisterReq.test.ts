import { DataBase } from "../../app/server_app/data/DataBase";
import { Server } from "../../app/server_app/server/Server";
import { RequestTestWrapper } from "./RequestTestWrapper";
import { ResponseTestWrapper } from "./ResponseTestWrapper";

jest.mock("../../app/server_app/data/DataBase");

const reqWrapper = new RequestTestWrapper();
const resWrapper = new ResponseTestWrapper();

const fakeServer = {
  listen: jest.fn(),
  close: jest.fn(),
};

// inject the fake `createServer`
jest.mock("http", () => ({
  createServer: (cb: Function) => {
    cb(reqWrapper, resWrapper);
    return fakeServer;
  },
}));

describe("RegisterReq test suite", () => {
  afterEach(() => {
    reqWrapper.clearFields();
    resWrapper.clearFields();
  });

  it("should work by now", async () => {
    await new Server().startServer();
  });
});
