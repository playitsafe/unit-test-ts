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

  const someObj1: SomeTypeWithId = {
    id: "",
    name: "some name1",
    color: "blue",
  };

  const someObj2: SomeTypeWithId = {
    id: "",
    name: "some name2",
    color: "blue",
  };

  beforeEach(() => {
    sut = new DataBase();
    jest.spyOn(IdGen, "generateRandomId").mockReturnValue(fakeId);
  });

  it("should return id after insert", async () => {
    const actual = await sut.insert({ id: "" } as any);
    expect(actual).toBe(fakeId);
  });

  it("should get element after insert", async () => {
    const id = await sut.insert(someObj1);
    const actual = await sut.getBy("id", id);
    console.log(">>>actual1", actual);
    expect(actual).toBe(someObj1);
  });

  it("should find all element w/ same property", async () => {
    await sut.insert(someObj1);
    await sut.insert(someObj2);

    const expected = [someObj1, someObj2];

    const actual = await sut.findAllBy("color", "blue");
    console.log(">>>actual2", actual);
    console.log(">>>all", await sut.getAllElements());

    expect(actual).toEqual(expected);
  });
});
