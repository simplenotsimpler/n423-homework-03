export const getTextAfterCharacter = (string, character) => {
  return string.substring(string.indexOf(character) + 1);
};