export default function (value, page) {
  const TOKEN = "18953404-219a87b5236596fa40acd8a55";

  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${value}&page=${page}&per_page=12&key=${TOKEN}`,
  ).then((data) => data.json());
}
