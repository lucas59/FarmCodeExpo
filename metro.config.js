// const { getDefaultConfig } = require('metro-config');
module.exports = (async () => {
  // const {
  //   resolver: { sourceExts, assetExts },
  // } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),

      // babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: ['db', 'mp4'],
      sourceExts: ['jsx', 'js', 'ts', 'tsx', 'svg'],
    },
  };
})();
