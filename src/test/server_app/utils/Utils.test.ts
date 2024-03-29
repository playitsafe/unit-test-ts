import { IncomingMessage } from "http";
import { getRequestBody } from "../../../app/server_app/utils/Utils";

describe("Get req body test", () => {
  const reqMock = {
    on: jest.fn(),
  };

  const someObj = { name: "Aaron" };
  const someObjStr = JSON.stringify(someObj);
  it("Should return object for valid json", async () => {
    reqMock.on.mockImplementation((event, cb) => {
      if (event == "data") {
        cb(someObjStr);
      } else {
        cb();
      }
    });

    const actual = await getRequestBody(reqMock as any as IncomingMessage);

    expect(actual).toEqual(someObj);
  });

  it("Should throw Error for invalid json", async () => {
    reqMock.on.mockImplementation((event, cb) => {
      if (event == "data") {
        cb("aaa" + someObjStr);
      } else {
        cb();
      }
    });

    await expect(getRequestBody(reqMock as any)).rejects.toThrow(
      "Unexpected token a in JSON at position 0"
    );
  });

  it("Should throw Error for unexpected error", async () => {
    const someError = new Error("Something went wrong!");
    reqMock.on.mockImplementation((event, cb) => {
      if (event == "error") {
        cb(someError);
      }
    });

    await expect(getRequestBody(reqMock as any)).rejects.toThrow(
      someError.message
    );
  });
});
