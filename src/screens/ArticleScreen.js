import React, {useState, useEffect} from 'react';

import {StyleSheet} from 'react-native';

import {WebView} from 'react-native-webview';
import FourZeroFour from '../components/FourZeroFour';
import {LoadingIndicatorView} from '../components/LoadingIndicatorView';

const ArticleScreen = props => {
  const [article, setArticle] = useState('');

  console.log(`URL: ${article.url}`);
  useEffect(() => {
    const article = props.route.params.article;
    setArticle(article);
  }, []);

  return article.url !== undefined ? (
    <WebView
      showsVerticalScrollIndicator={false}
      originWhitelist={['*']}
      renderLoading={LoadingIndicatorView}
      source={{uri: article.url}}
      startInLoadingState={true}
    />
  ) : (
    <FourZeroFour />
  );
};

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  nullUrl: {
    color: 'gray',
    fontSize: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ArticleScreen;
