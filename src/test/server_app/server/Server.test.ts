import { Server } from "../../../app/server_app/server/Server";

// Mock all the custom handlers
jest.mock("../../../app/server_app/auth/Authorizer");
jest.mock("../../../app/server_app/handlers/RegisterHandler");
jest.mock("../../../app/server_app/handlers/LoginHandler");
jest.mock("../../../app/server_app/handlers/ReservationsHandler");

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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should work by now", async () => {
    sut.startServer();
  });
});
