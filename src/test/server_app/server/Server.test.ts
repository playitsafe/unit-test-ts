import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess";
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
});
