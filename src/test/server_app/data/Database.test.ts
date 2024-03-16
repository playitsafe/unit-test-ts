import { DataBase } from "../../../app/server_app/data/DataBase";
// import { generateRandomId } from "../../../app/server_app/data/IdGenerator";
import * as IdGen from "../../../app/server_app/data/IdGenerator";

type SomeTypeWithId = {
  id: string;
  name: string;
  color: string;
};

describe("DB test suite", () => {
  let sut: DataBase<SomeTypeWithId>;

  const fakeId = "1234";

  const someObj: SomeTypeWithId = { id: "", name: "some name", color: "blue" };

  beforeEach(() => {
    sut = new DataBase();
    jest.spyOn(IdGen, "generateRandomId").mockReturnValue(fakeId);
  });

  it("should return id after insert", async () => {
    const actual = await sut.insert({ id: "" } as any);
    expect(actual).toBe(fakeId);
  });

  it("should get element after insert", async () => {
    const id = await sut.insert(someObj);
    const actual = await sut.getBy("id", id);
    console.log(">>>", actual);
    expect(actual).toBe(someObj);
  });
});
