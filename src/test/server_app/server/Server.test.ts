import { Server } from "../../../app/server_app/server/Server";

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
});
