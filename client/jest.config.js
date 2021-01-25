module.exports = {
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}'
    ],
    moduleNameMapper: {
        "\\.(css|sass)$": "identity-obj-proxy",
    },
    preset: "react-native",
    transform: {
        "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
        "^.+\\.tsx?$": "ts-jest"
    },
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.jest.json"
        }
    },
};
