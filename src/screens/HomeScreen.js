import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Separator} from '../components/Separator';

export default function HomeScreen(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getTopStories() {
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
        setPosts(result);
      } catch (error) {
        console.error(error);
      }
    }
    getTopStories();
  }, []);

  const handleItemPress = article =>
    props.navigation.navigate('Article', {article});

  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => item.id}
      ItemSeparatorComponent={Separator}
      renderItem={postInfo => (
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => handleItemPress(postInfo.item)}>
          <Text style={styles.title}>{postInfo.item.title}</Text>
          <Text style={styles.sub}>
            {postInfo.item.score} pts | {postInfo.item.descendants} comments |
            by {postInfo.item.by}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 7,
    paddingHorizontal: 20,
  },
  sub: {
    color: 'gray',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
});
