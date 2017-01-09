exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [],
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
