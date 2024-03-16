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

  beforeEach(() => {
    sut = new DataBase();
    jest.spyOn(IdGen, "generateRandomId").mockReturnValue(fakeId);
  });

  it("should return id after insert", async () => {
    const actual = await sut.insert({ id: "" } as any);
    expect(actual).toBe(fakeId);
  });
});
