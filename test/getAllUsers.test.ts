import * as functions from "../src/routes/getAllUsers";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { testData } from "./dataTest";
import { alphaUsers, ABCnames, ABCnamesCount } from "./expectedResponses";

//Fill repo list from API
describe("fill", () => {
  let mock: any;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe("when API call is successful", () => {
    it("should return users list", async () => {
      // given
      mock.onGet(`http://localhost:3001/users`).reply(200, testData);

      // when
      const result = await functions.fill(
        "malesuada.id@hotmail.org",
        "WFE64VTJ1BB"
      );

      // then
      expect(mock.history.get[0].url).toEqual(`http://localhost:3001/users`);
      expect(result).toEqual(testData);
    });
  });

  describe("when API call fails", () => {
    it("should return empty users list", async () => {
      // given
      mock.onGet(`http://localhost:3001/users`).networkErrorOnce();

      // when
      const result = await functions.fill(
        "malesuada.id@hotmail.org",
        "WFE64VTJ1BB"
      );

      // then
      expect(mock.history.get[0].url).toEqual(`http://localhost:3001/users`);
      expect(result).toEqual([]);
    });
  });
});

describe("orderAlpha", () => {
  describe("when list is received successfully", () => {
    it("should return users alphabetically ordered", () => {
      expect(functions.orderAlpha(testData)).toEqual(alphaUsers);
    });
  });
});

describe("filterNames", () => {
  describe("when list is received successfully", () => {
    it("should return the users whose name start with a, b and c", () => {
      expect(functions.filterNames(testData)).toEqual(ABCnames);
    });
  });
});

describe("countFilterNames", () => {
  describe("when list is received successfully", () => {
    it("should return how many users have names that start with a, b and c", () => {
      expect(functions.countFilterNames(testData)).toEqual(ABCnamesCount);
    });
  });
});
