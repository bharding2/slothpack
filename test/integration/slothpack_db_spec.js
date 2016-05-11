describe('slothpack app', function() {
  it('should have a 2 way data binding', function() {
    browser.get('http://localhost:5000');
    element(by.model('slothfact')).sendKeys('three toes');
    element(by.id('slothfact')).getText().then(function(text) {
      expect(text).toEqual('hello world');
    });
  });
});
