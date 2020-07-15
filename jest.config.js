module.exports = {
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
        './server/**/*'
    ],
    coverageDirectory: './coverage',
    coverageThreshold: {
        'global': {
            'statements': 20,
            'branches': 20,
            'functions': 20,
            'lines': 20
        }
    },
    verbose: true
};