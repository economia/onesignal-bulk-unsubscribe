module.exports = {
  "extends": [
    "standard",
    "eslint-config-prettier"
  ],
  "env": {
    "node": true
  },
  "overrides": [{
    "files": ["*.spec.js"],
    "env": {
      "jest": true
    }
  }]
};
