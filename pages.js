//Declare paths
const ROOT = "https://www.microtekcorporation.com/";
const PORTFOLIO = "portfolio/";
const SEARCH = "portfolio/basic";

const Page = {
  //Home Elements
  get expandMenu () {
    return $('a.meanmenu-reveal');
  },
  get portfolioLinkMobile() {
    return $('nav a[href="' + ROOT + PORTFOLIO + '"]');
  },
  get portfolioLink() {
    return $('.site-navigation a[href="' + ROOT + PORTFOLIO + '"]');
  },
  //Portfolio elements
  get searchLink() {
    return $('[href="/'+SEARCH+'"]');
  },
  //Search elements
  get details() {
    return $('.details_btn');
  },
  get advancedSearchButton() {
    return $('.advanced-search-btn');
  },
  get searchInput() {
    return $('#search-portfolio > input:first-child');
  },
  get searchGo() {
    return $('#search-portfolio img');
  },
  get resultCount() {
    return $$('.basicfolio_listing').count();
  },
  get resultText() {
    return $$('.basicfolio_listing').get(0).$('h2').getText();
  },
  //Navigate routes
  visitHome: function () {
    browser.ignoreSynchronization = true;
    browser.get(ROOT);
  },
  visitPortfolio: function () {
    browser.ignoreSynchronization = true;
    browser.get(ROOT + PORTFOLIO);
  },
  visitSearch: function (query) {
    browser.ignoreSynchronization = true;

    if(query) {
      browser.get(ROOT + SEARCH + '/?search=' + query);
    } else {
      browser.get(ROOT + SEARCH);
    }
  }
};

module.exports.Page = Page;
