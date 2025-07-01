const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    alias: {
      '@': './src',
      '@/components': './src/components',
      '@/screens': './src/screens',
      '@/hooks': './src/hooks',
      '@/types': './src/types',
      '@/utils': './src/utils',
      '@/services': './src/services',
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
