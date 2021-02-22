import { capitalizedString } from "../capitalizedString";

test("should convert text to capitalized text", () => {
  let mockText1 = "charmander";
  let mockText2 = "charmeleon";
  let mockText3 = "charizard";

  let formattedText1 = capitalizedString(mockText1);
  let formattedText2 = capitalizedString(mockText2);
  let formattedText3 = capitalizedString(mockText3);

  expect(formattedText1).toEqual("Charmander");
  expect(formattedText2).toEqual("Charmeleon");
  expect(formattedText3).toEqual("Charizard");
});
