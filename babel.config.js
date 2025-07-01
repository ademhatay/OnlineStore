module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@/components': './src/components',
          '@/screens': './src/screens',
          '@/hooks': './src/hooks',
          '@/types': './src/types',
          '@/utils': './src/utils',
          '@/services': './src/services',
          '@/context': './src/context',
        },
      },
    ],
  ],
};