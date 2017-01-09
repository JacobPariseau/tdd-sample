var HtmlReporter = require('protractor-html-screenshot-reporter');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [],
  onPrepare: function() {
     // Add a screenshot reporter and store screenshots to `/tmp/screnshots`:
     jasmine.getEnv().addReporter(new HtmlReporter({
        baseDirectory: '/tmp/screenshots'
     }));
  },
  multiCapabilities: [
  {
    'browserName': 'chrome',
    'name': 'Large',
    'chromeOptions' : {
      args: ['--lang=en',
             '--window-size=1000,800']
   },
   specs: ['e2e.js']
  },{
    'browserName': 'chrome',
    'name': 'Small',
    'chromeOptions' : {
     args: ['--lang=en',
            '--window-size=320,480']
    },
    specs: ['e2e.js']
  }]
};
