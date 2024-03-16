import { DataBase } from "../../../app/server_app/data/DataBase";
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess";
import { Account } from "../../../app/server_app/model/AuthModel";

const insertMock = jest.fn();
const getMock = jest.fn();

// Hoist the jest imple
// jest.doMock("../../../app/server_app/data/DataBase", () => ({
//   DataBase: {
//     insert: insertMock,
//     getBy: getMock,
//   },
// }));

// or
// return a DB obj and only call it when needed
jest.mock("../../../app/server_app/data/DataBase", () => ({
  DataBase: jest.fn().mockImplementation(() => ({
    insert: insertMock,
    getBy: getMock,
  })),
}));

describe("UserCredentialsDataAccess test suite", () => {
  let sut: UserCredentialsDataAccess;

  const someAcc: Account = {
    id: "",
    password: "somePass",
    userName: "someUser",
  };

  const someId = "1234";

  beforeEach(() => {
    /**
     * As UserCredentialsDataAccess internally instantiate DataBase
     */
    sut = new UserCredentialsDataAccess();
    // expect DB to be a test obj
    expect(DataBase).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add user and return id", async () => {
    insertMock.mockResolvedValueOnce(someId);

    const actualId = await sut.addUser(someAcc);

    expect(actualId).toBe(someId);
    expect(insertMock).toHaveBeenCalledWith(someAcc);
    expect(insertMock).toHaveBeenCalledTimes(1);
  });

  it("should get user by id", async () => {
    getMock.mockResolvedValueOnce(someAcc);

    const actualUser = await sut.getUserById(someId);

    console.log(">>>actualUser", actualUser);
    console.log(">>>someAcc", someAcc);

    expect(actualUser).toEqual(someAcc);
    expect(getMock).toHaveBeenCalledWith("id", someId);
  });

  //   it("should get user by name", async () => {
  //     getMock.mockResolvedValueOnce(someAcc);

  //     const actualUser = await sut.getUserByUserName(someAcc.userName);

  //     expect(actualUser).toBe(someAcc);
  //     expect(insertMock).toHaveBeenCalledWith("userName", someAcc.userName);
  //   });
});
