const Page = require('./pages').Page;

let EC = protractor.ExpectedConditions;

//Declare paths
const ROOT = "https://www.microtekcorporation.com/";
const PORTFOLIO = "portfolio/";
const SEARCH = "portfolio/basic";

/** Chainable function that scrolls to the element */
protractor.ElementFinder.prototype.scrollTo = function() {
  const _this = this;
  browser.executeScript(function(_this) {
    _this.scrollIntoViewIfNeeded({block: 'end', behaviour: 'instant'});
  }, _this.getWebElement());
  return this;
};

describe('Users can search and get the correct results', function () {
  it('user can get from home to portfolio', function () {
    //User navigates to homepage
    Page.visitHome();

    //User clicks portfolio page
    Page.expandMenu.isPresent()
    .then(function (present) {
      if(present) {
        //If there is a 'hamburger' menu, click to reveal the menu items
        Page.expandMenu.click();
        //Requires weird class scoping because the HTML is invalid
        browser.wait(EC.elementToBeClickable(Page.portfolioLinkMobile), 4000);
        Page.portfolioLinkMobile.click();
      } else {
        Page.portfolioLink.click();
      }

      // Test should search for elements on the page that only exist on the portfolio page, and expect those elements to be displayed.

      expect(browser.getCurrentUrl()).toEqual(ROOT + PORTFOLIO);
      expect(Page.bannerText === "Design &amp; Development Porfolio");
    });
  });

  it('user can go from portfolio to search', function () {
    Page.searchLink.scrollTo().click();
    expect(browser.getCurrentUrl()).toEqual(ROOT + SEARCH);
    expect(Page.bannerText === "Portfolio");
    expect(Page.advancedSearchButton.isPresent);
  });

  it('user can search and get the correct results', function () {
    const query = 'beanstream-payment';

    Page.advancedSearchButton.scrollTo().click();
    Page.searchInput.sendKeys(query);
    Page.searchGo.click();

    expect(browser.getCurrentUrl()
    .then(function(url) {
      return url.split('?search=')[1] === query;
    }))
    .toEqual(true);
    expect(Page.resultCount).toBeGreaterThan(0);
    expect(Page.resultText).toEqual('Hobby Wholesale (HWS)');
  });

  it('user can follow link to page', function () {
    Page.details.getAttribute('href')
    .then(function (attr) {
      expect(typeof attr).toBe('string');
      expect(attr.length).toBeGreaterThan(0);

      Page.details.scrollTo().click();

      expect(browser.getCurrentUrl()).toEqual(attr);
    });
  });
});
