import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {Appbar} from 'react-native-paper';
import moment from 'moment';

import {Separator} from '../components/Separator';

import URLparser from '../components/URLparser';

export default function HomeScreen({route, navigation}) {
  const [posts, setPosts] = useState([]);
  const [loading] = useState(true);

  const {umail} = route.params || '';

  let authenticated = JSON.stringify(umail);

  const topstories = 'https://hacker-news.firebaseio.com/v0/topstories.json';
  const newstories = 'https://hacker-news.firebaseio.com/v0/newstories.json';

  const getTopStories = async () => {
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
      setPosts(result);
    } catch (error) {
      console.error(error);
    }
  };

  const getNewStories = async () => {
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
      setPosts([...posts, ...newResult]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTopStories();
  }, []);

  // I use this to display the particular story in a webview
  const handleItemPress = article => navigation.navigate('Article', {article});

  return (
    <View>
      {posts.length < 1 ? (
        <SkeletonContent
          isLoading={loading}
          containerStyle={styles.skeleton}
          layout={[
            {key: 'title1', width: '90%', height: 60, margin: 10},
            {key: 'sub1', width: '70%', height: 30, margin: 10},
            {key: 'title2', width: '90%', height: 60, margin: 10},
            {key: 'sub2', width: '70%', height: 30, margin: 10},
            {key: 'title3', width: '90%', height: 60, margin: 10},
            {key: 'sub3', width: '70%', height: 30, margin: 10},
            {key: 'title4', width: '90%', height: 60, margin: 10},
            {key: 'sub4', width: '70%', height: 30, margin: 10},
          ]}>
          <FlatList
            renderItem={
              <TouchableOpacity>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
              </TouchableOpacity>
            }
          />
        </SkeletonContent>
      ) : (
        <FlatList
          data={posts}
          ItemSeparatorComponent={Separator}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={data =>
            data.item.id === null ? (
              {}
            ) : (
              <TouchableOpacity
                style={styles.listItem}
                key={data.key}
                onPress={() => handleItemPress(data.item)}>
                <Text style={styles.title}>
                  {data.item.title}{' '}
                  {data.item.url !== undefined ? (
                    <URLparser url={data.item.url} />
                  ) : (
                    <Text style={styles.sublink}>(no link)</Text>
                  )}
                </Text>

                <Text style={styles.sub}>
                  {data.item.score} pts by {data.item.by}{' '}
                  {moment(new Date(data.item.time * 1000)).fromNow()} |{' '}
                  {data.item.descendants} comments
                </Text>
              </TouchableOpacity>
            )
          }
          keyExtractor={(item, index) => String(index)}
          initialNumToRender={15}
          maxToRenderPerBatch={7}
          removeClippedSubviews={false}
          onEndReachedThreshold={1}
          onEndReached={getNewStories}
        />
      )}

      <Appbar style={styles.bottom}>
        <Appbar.Action
          icon="information-outline"
          size={34}
          onPress={() => navigation.navigate('About')}
        />

        {authenticated ? (
          <>
            <Appbar.Action
              icon="account-cog-outline"
              color="black"
              size={34}
              onPress={() =>
                navigation.navigate('UserProfile', {user: authenticated})
              }
            />
          </>
        ) : (
          <Appbar.Action
            icon="login"
            size={34}
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
    opacity: 0.7,

    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#ee6c00',
  },
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  skeleton: {
    flex: 1,
    width: '100%',
  },
  sub: {
    color: 'gray',
  },
  sublink: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'normal',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
});
