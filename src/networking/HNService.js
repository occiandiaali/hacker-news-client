import React, {useState} from 'react';
import {View, Text} from 'react-native';

const HNService = () => {
  const [articles, setArticles] = useState([]);

  const getTopStoriesFromApi = async topstories => {
    try {
      const response = await fetch(topstories);
      if (response.ok === false) {
        console.log(`Response Error: ${response}`);
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
      setArticles(result);
    } catch (error) {
      console.error(error);
    }
  };

  const getNewStories = async newstories => {
    try {
      const response = await fetch(newstories);
      if (response.ok === false) {
        tconsole.log(`Response Error: ${response}`);
      }
      const json = await response.json();
      const newPromises = json.map(id =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
          response => response.json(),
        ),
      );
      const newResult = await Promise.all(newPromises);
      setArticles([...articles, ...newResult]);
    } catch (error) {
      console.error(error);
    }
  };
};

export default HNService;
