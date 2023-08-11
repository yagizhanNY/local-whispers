export const urlify = (text: string) => {
  var urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text.replace(urlRegex, function (url) {
    return '<a href="' + url + '" target="_blank">' + url + "</a>";
  });
};
