describe('test Bing search', function() {
	var webdriver = require('selenium-webdriver');
	var driver;
	
	beforeEach(function() {
		driver = new webdriver.Builder().
		   withCapabilities(webdriver.Capabilities.chrome()).
		   build();
		jasmine.getEnv().defaultTimeoutInterval = 50000;
	});

  it('can search for something', function(done) {
		driver.get("http://www.bing.com");
		driver.findElement(webdriver.By.name("q")).sendKeys("scott mcmaster");
		driver.findElement(webdriver.By.name("go")).click();
		driver.getTitle().then(function(title) {
			expect(title).toEqual('scott mcmaster - Bing');
			driver.quit();
			done();
		});
	});
	
  it('can search for something with chaining', function(done) {
		driver.get("http://www.bing.com")
			.then(function() {
				return driver.findElement(webdriver.By.name("q"));
			})
			.then(function(q) {
			  return q.sendKeys("scott mcmaster");
			})
			.then(function() {
				return driver.findElement(webdriver.By.name("go"));
			})
			.then(function(b) {
				return b.click();
			})
			.then(function() {
				return driver.getTitle();
			})
			.then(function(title) {
				expect(title).toEqual('scott mcmaster - Bing');
			})
			.then(function() {
				driver.quit();
				done();
			});
	});
	
	function open() {
		return driver.get("http://www.bing.com");		
	}
	
	function setQuery(query) {
		return function() {
			driver.findElement(webdriver.By.name("q")).sendKeys(query);
		}
	}
	
	function search() {
		driver.findElement(webdriver.By.name("go")).click();
	}
	
	function verifyTitle(expected) {
		return function() {
			driver.getTitle().then(function(title) {
			expect(title).toEqual('scott mcmaster - Bing');
		})};
	}
	
	function quit(done) {
		return function() {
			driver.quit();
			done();
		}
	}
	
  it('can search for something fluently', function(done) {
  	open()
  		.then(setQuery('scott mcmaster'))
  		.then(search)
  		.then(verifyTitle('scott mcmaster - Bing'))
  		.then(quit(done));
	});
	
});
