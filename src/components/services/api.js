export default async function findImage(search, page) {
  const url = `https://pixabay.com/api/?q=${search}&page=${page}&key=29047113-bf47c2744467f006c769e271e&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await fetch(url);
  return await response.json();
}
