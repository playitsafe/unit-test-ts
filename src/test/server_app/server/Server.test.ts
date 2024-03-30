import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess";
import { LoginHandler } from "../../../app/server_app/handlers/LoginHandler";
import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler";
import { ReservationsHandler } from "../../../app/server_app/handlers/ReservationsHandler";
import { HTTP_CODES } from "../../../app/server_app/model/ServerModel";
import { Server } from "../../../app/server_app/server/Server";

// Mock all the custom handlers
jest.mock("../../../app/server_app/auth/Authorizer");
jest.mock("../../../app/server_app/handlers/RegisterHandler");
jest.mock("../../../app/server_app/handlers/LoginHandler");
jest.mock("../../../app/server_app/handlers/ReservationsHandler");
jest.mock("../../../app/server_app/data/ReservationsDataAccess");

// Test createServer in http module
const reqMock = {
  url: "",
  headers: {
    "user-agent": "jest-agent",
  },
};
const resMock = {
  end: jest.fn(),
  writeHead: jest.fn(),
};
const serverMock = {
  listen: jest.fn(),
  close: jest.fn(),
};

jest.mock("http", () => ({
  createServer: (cb: Function) => {
    cb(reqMock, resMock);
    return serverMock;
  },
}));

describe("Server test suite", () => {
  let sut: Server;

  beforeEach(() => {
    sut = new Server();
    // can even check here to see if authorizer is instantiated
    expect(Authorizer).toHaveBeenCalledTimes(1);
    expect(ReservationsDataAccess).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.skip("should work by now", async () => {
    sut.startServer();
  });

  it.skip("should start server on 8080 and end the request", async () => {
    await sut.startServer();
    expect(serverMock.listen).toHaveBeenCalledWith(8080);
    expect(resMock.end).toHaveBeenCalledTimes(1);
  });

  // prototype spy - only works with classes
  it("should handle register request", async () => {
    reqMock.url = "localhost:8080/register";
    const handleRequestSpy = jest.spyOn(
      RegisterHandler.prototype,
      "handleRequest"
    );

    await sut.startServer();

    expect(handleRequestSpy).toHaveBeenCalledTimes(1);
    // test the constructor
    expect(RegisterHandler).toHaveBeenCalledWith(
      reqMock,
      resMock,
      // only check the right type of an arg, not the actual value
      expect.any(Authorizer)
    );
  });

  it("should handle login request", async () => {
    reqMock.url = "localhost:8080/login";
    const handleRequestSpy = jest.spyOn(
      LoginHandler.prototype,
      "handleRequest"
    );

    await sut.startServer();

    expect(handleRequestSpy).toHaveBeenCalledTimes(1);
    // test the constructor
    expect(LoginHandler).toHaveBeenCalledWith(
      reqMock,
      resMock,
      // only check the right type of an arg, not the actual value
      expect.any(Authorizer)
    );
  });

  it("should handle reservation request", async () => {
    reqMock.url = "localhost:8080/reservation";
    const handleRequestSpy = jest.spyOn(
      ReservationsHandler.prototype,
      "handleRequest"
    );

    await sut.startServer();

    expect(handleRequestSpy).toHaveBeenCalledTimes(1);
    // test the constructor
    expect(ReservationsHandler).toHaveBeenCalledWith(
      reqMock,
      resMock,
      // only check the right type of an arg, not the actual value
      expect.any(Authorizer),
      expect.any(ReservationsDataAccess)
    );
  });

  it("should do nothing on invalid path", async () => {
    reqMock.url = "localhost:8080/random-route";
    // we want the spy not to be called
    const validateTokenSpy = jest.spyOn(Authorizer.prototype, "validateToken");

    await sut.startServer();

    expect(validateTokenSpy).not.toHaveBeenCalled();
  });
});
