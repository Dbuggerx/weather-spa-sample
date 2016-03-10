exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['./**/*.protractor.js'],

    baseUrl: 'http://localhost:4000',

    allScriptsTimeout: 22000,

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }

};
