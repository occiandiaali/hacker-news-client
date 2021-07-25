const getTopStories = async () => {
  const tops = 'https://hacker-news.firebaseio.com/v0/topstories.json';
  try {
    const response = await fetch(tops);
    if (response.ok === false) {
      throw new Error(`Response Error: ${response}`);
    }
    const json = await response.json();
    const promises = json
      .slice(0, 15)
      .map(id =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
          response => response.json(),
        ),
      );
    const result = await Promise.all(promises);
  } catch (error) {}
};

export default getTopStories;
