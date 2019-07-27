module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>/setupTests.js',
  ],
  snapshotSerializers: [
    "enzyme-to-json/serializer"
  ],
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
