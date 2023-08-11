export const generateIframeCode = (link: string) => {
  const videoId = extractVideoId(link);
  if (videoId) {
    return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
  }
  return "";
};

const extractVideoId = (url: string) => {
  const regex =
    /(?:\?v=|\/embed\/|\/\d{11}(?=[^\d]|$)|\/v\/|\/e\/|\.be\/)([^"&?\/ ]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
