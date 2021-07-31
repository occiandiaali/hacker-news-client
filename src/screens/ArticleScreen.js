import React, {useState, useEffect} from 'react';

import {StyleSheet} from 'react-native';

import {WebView} from 'react-native-webview';
import NotFound from '../components/NotFound';
import {LoadingIndicatorView} from '../components/LoadingIndicatorView';

const ArticleScreen = props => {
  const [article, setArticle] = useState('');
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
    <NotFound />
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
