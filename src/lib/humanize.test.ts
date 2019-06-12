import { humanize } from "../";

test("humanize", () => {
  expect(humanize("foobar")).toEqual("foobar");
});
