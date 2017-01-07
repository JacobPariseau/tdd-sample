let EC = protractor.ExpectedConditions;

//Declare paths
const ROOT = "https://www.microtekcorporation.com/";
const PORTFOLIO = "portfolio/";
const BASIC = "portfolio/basic";

/** Chainable function that scrolls to the element */
protractor.ElementFinder.prototype.scrollTo = function() {
  const _this = this;
  browser.executeScript(function(_this) {
    _this.scrollIntoViewIfNeeded({block: 'end', behaviour: 'instant'});
  }, _this.getWebElement());
  return this;
};

describe('microtek', function () {
  it('user can navigate to portfolio', function () {
    //Stops protractor from waiting for Angular
    browser.ignoreSynchronization = true;
    browser.get(ROOT);

    $('a.meanmenu-reveal').isPresent()
    .then(function (present) {
      if(present) {
        //If there is a 'hamburger' menu, click to reveal the menu items
        $('a.meanmenu-reveal').click();
        //Requires weird class scoping because the HTML is invalid
        browser.wait(EC.elementToBeClickable($('.mobile-menu #menu-item-63')), 4000);
        $('.mobile-menu #menu-item-63').click();
      } else {
        //Menu is already exposed, click through
        $('#menu-item-63').click();
      }
      expect(browser.getCurrentUrl()).toEqual(ROOT + PORTFOLIO);
    });
  });

  it('user can go from portfolio to basic', function () {
    browser.ignoreSynchronization = true;
    browser.get(ROOT + PORTFOLIO);
    //Reload page in case previous tests fail

    $('[href="/'+BASIC+'"]').scrollTo().click();
    expect(browser.getCurrentUrl()).toEqual(ROOT + BASIC);
  });

  it('user can follow link to page', function () {
    browser.ignoreSynchronization = true;
    browser.get(ROOT + BASIC);

    $('.details_btn').getAttribute('href')
    .then(function (attr) {
      expect(typeof attr).toBe('string');
      expect(attr.length).toBeGreaterThan(0);

      $('.details_btn').scrollTo().click();

      expect(browser.getCurrentUrl()).toEqual(attr);
    });
  });

  it('user can execute a search', function () {
    const query = 'beanstream-payment';
    browser.ignoreSynchronization = true;
    browser.get(ROOT + BASIC);

    $('.advanced-search-btn').scrollTo().click();
    $('#search-portfolio > input:first-child').sendKeys(query);
    $('#search-portfolio img').click();

    expect(browser.getCurrentUrl()
    .then(function(url) {
      return url.split('?search=')[1] === query;
    }));
  });

  it('search returns correct results', function () {
    const query = 'beanstream-payment';
    browser.ignoreSynchronization = true;
    browser.get(ROOT + BASIC + '/?search=' + query);

    let results = $$('.basicfolio_listing');
    expect(results.count()).toBeGreaterThan(0);
    expect(results.get(0).$('h2').getText()).toEqual('Hobby Wholesale (HWS)');
  });
});
