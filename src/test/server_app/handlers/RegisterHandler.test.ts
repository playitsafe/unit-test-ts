import { IncomingMessage, ServerResponse } from "http";
import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler";
import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { getRequestBody } from "../../../app/server_app/utils/Utils";
import {
  HTTP_CODES,
  HTTP_METHODS,
} from "../../../app/server_app/model/ServerModel";
import { Account } from "../../../app/server_app/model/AuthModel";

const getReqBodyMock = jest.fn();
jest.mock("../../../app/server_app/utils/Utils", () => ({
  // this doesn't work as it's init outside of the jest.mock
  //   getRequestBody: getReqBodyMock

  getRequestBody: () => getReqBodyMock(),
}));

describe("RegisterHandler test suite", () => {
  let sut: RegisterHandler;

  const req = {
    method: undefined,
  };

  const resMock = {
    statusCode: 0,
    writeHead: jest.fn(),
    write: jest.fn(),
  };

  const authMock = {
    registerUser: jest.fn(),
  };

  const someAcc: Account = {
    id: "",
    password: "somePass",
    userName: "someUser",
  };
  const someId = "1234";

  beforeEach(() => {
    sut = new RegisterHandler(
      req as IncomingMessage,
      resMock as any as ServerResponse,
      authMock as any as Authorizer
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handlePost - register valid account in requests", async () => {
    req.method = HTTP_METHODS.POST;
    getReqBodyMock.mockResolvedValueOnce(someAcc);
    authMock.registerUser.mockResolvedValueOnce(someId);

    await sut.handleRequest();

    expect(resMock.statusCode).toBe(HTTP_CODES.CREATED);
    expect(resMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.CREATED, {
      "Content-Type": "application/json",
    });
    expect(resMock.write).toHaveBeenCalledWith(
      JSON.stringify({
        userId: someId,
      })
    );
  });
});
