/**
 * Created by irekromaniuk on 10/22/2015.
 */

var expect = require('chai').expect;

describe('adding new ROBO config', function() {
    it('creates new ROBO config', function() {
        browser.get('https://repish:3002');

        var subnet = '10.111.111.';
        var hostname = 'myROBO111111';
        var contact =  'advisor';
        var location = '01234';
        var InternalSSID = 'InternalSSID';
        var GuestSSID = 'GuestSSID';
        var InternalPW = 'InternalPW';
        var GuestPW = 'GuestPW';

        element(by.model('contact')).sendKeys(contact);
        element(by.model('location')).sendKeys(location);
        element(by.model('hostname')).sendKeys(hostname);
        element(by.model('subnet')).sendKeys(subnet);
        element(by.model('InternalSSID')).sendKeys(InternalSSID);
        element(by.model('GuestSSID')).sendKeys(GuestSSID);
        element(by.model('InternalPW')).sendKeys(InternalPW);
        element(by.model('GuestPW')).sendKeys(GuestPW);
        element.all(by.css("#textarea")).first().getText().then(function (text) {
            expect(text).to.contain(hostname, subnet, contact, location,
                InternalSSID , GuestSSID, InternalPW,GuestPW);
        });
        //element(by.css('.config1100 .btn .btn-default .btn-lg')).click();
        element(by.buttonText('Save')).click();
        //browser.pause()
    });

});
