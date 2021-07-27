import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Appbar} from 'react-native-paper';

import {Separator} from '../components/Separator';
import {LoadingIndicatorView} from '../components/LoadingIndicatorView';
import URLparser from '../components/URLparser';

export default function HomeScreen({route, navigation}) {
  const [posts, setPosts] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const {umail} = route.params || '';

  let authenticated = JSON.stringify(umail);

  const getNewStories = async () => {
    const tops = 'https://hacker-news.firebaseio.com/v0/newstories.json';
    try {
      const response = await fetch(tops);
      if (response.ok === false) {
        throw new Error(`Response Error: ${response}`);
      }
      const json = await response.json();
      const promises = json
        .slice(0, 20)
        .map(id =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
            response => response.json(),
          ),
        );
      const result = await Promise.all(promises);
      setPosts(result);
      console.log(`New Count: ${result.length}`);
    } catch (error) {
      console.error(error);
    }
  };

  const getTopStories = async () => {
    const tops = 'https://hacker-news.firebaseio.com/v0/topstories.json';
    try {
      const response = await fetch(tops);
      if (response.ok === false) {
        throw new Error(`Response Error: ${response}`);
      }
      const json = await response.json();
      const promises = json
        .slice(0, 20)
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
  };

  useEffect(() => {
    getTopStories();
  }, []);

  const handleItemPress = article => navigation.navigate('Article', {article});

  return (
    <View>
      <FlatList // TODO: timestamp, align URL
        data={posts}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Separator}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={postInfo =>
          postInfo.item.id !== null ? (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => handleItemPress(postInfo.item)}>
              <Text style={styles.title}>{postInfo.item.title}</Text>
              {postInfo.item.url !== undefined ? (
                <URLparser url={postInfo.item.url} />
              ) : (
                <Text style={styles.sub}>(no link)</Text>
              )}
              <Text style={styles.sub}>
                {postInfo.item.score} pts by {postInfo.item.by}{' '}
                {new Date((postInfo.item.time * 1000) / 60).getMinutes()} mins
                ago | {postInfo.item.descendants} comments
              </Text>
            </TouchableOpacity>
          ) : (
            <LoadingIndicatorView />
          )
        }
        onEndReachedThreshold={0.9}
        onEndReached={getNewStories}
      />

      <Appbar style={styles.bottom}>
        <Appbar.Action
          icon="information-outline"
          size={27}
          onPress={() => navigation.navigate('About')}
        />

        {authenticated ? (
          <>
            <Appbar.Action
              icon="account-cog-outline"
              color="black"
              size={27}
              onPress={() =>
                navigation.navigate('UserProfile', {user: authenticated})
              }
            />
          </>
        ) : (
          <Appbar.Action
            icon="login"
            size={27}
            onPress={() => navigation.navigate('Accounts')}
          />
        )}
      </Appbar>
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#ee6c00',
  },
  listItem: {
    paddingVertical: 12,
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
