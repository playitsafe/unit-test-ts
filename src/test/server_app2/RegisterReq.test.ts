import { DataBase } from "../../app/server_app/data/DataBase";
import {
  HTTP_CODES,
  HTTP_METHODS,
} from "../../app/server_app/model/ServerModel";
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

  it.skip("should work by now", async () => {
    await new Server().startServer();
  });

  it("should register new users", async () => {
    reqWrapper.method = HTTP_METHODS.POST;
    // provide some valid creds
    reqWrapper.body = {
      userName: "someUserName",
      password: "somePassword",
    };
    reqWrapper.url = "localhost:8080/register";
    jest.spyOn(DataBase.prototype, "insert").mockResolvedValueOnce("1234");

    // startServer triggers createServer which injects req/res
    await new Server().startServer();

    await new Promise(process.nextTick); // solve timing issue

    expect(resWrapper.statusCode).toBe(HTTP_CODES.CREATED);
    expect(resWrapper.body).toEqual(
      expect.objectContaining({ userId: expect.any(String) })
    );
  });

  it("should reject request with no username/password ", async () => {
    reqWrapper.method = HTTP_METHODS.POST;
    // provide some valid creds
    reqWrapper.body = {};
    reqWrapper.url = "localhost:8080/register";
    jest.spyOn(DataBase.prototype, "insert").mockResolvedValueOnce("1234");

    // startServer triggers createServer which injects req/res
    await new Server().startServer();

    await new Promise(process.nextTick); // solve timing issue

    expect(resWrapper.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    expect(resWrapper.body).toBe("userName and password required");
  });

  it("should do nothing for not supported method", async () => {
    reqWrapper.method = HTTP_METHODS.PUT;
    // provide some valid creds
    reqWrapper.body = {};
    reqWrapper.url = "localhost:8080/register";
    jest.spyOn(DataBase.prototype, "insert").mockResolvedValueOnce("1234");

    // startServer triggers createServer which injects req/res
    await new Server().startServer();

    await new Promise(process.nextTick); // solve timing issue

    expect(resWrapper.statusCode).toBeUndefined();
    expect(resWrapper.body).toBeUndefined();
  });
});
