define(
    ['jquery', 'Magento_Customer/js/customer-data'],
    function ($, customerData) {
        'use strict';

        var getCustomerInfo = function () {
            var customer = customerData.get('customer');
            return customer();
        };
        var isLoggedIn = function (customerInfo) {
            var customerInfo = customerInfo || getCustomerInfo();
            if (customerInfo.firstname !== undefined) {
                $('.signin-customer-name').removeClass('disabled').text(customerInfo.firstname);
                $('.fa-user').removeClass('not-signedin').addClass('signedin');
                $('a#customer-account-link').attr('href', '/customer/account');
                return true;
            }
            return false;
        };
        return function () {
            var deferred = $.Deferred();
            var customerInfo = getCustomerInfo();
            if (customerInfo && customerInfo.data_id) {
                deferred.resolve(isLoggedIn(customerInfo));
            } else {
                customerData.reload(['customer'], false)
                    .done(function () {
                        deferred.resolve(isLoggedIn());
                    })
                    .fail(function () {
                        deferred.reject();
                    });
            }
            return deferred;
        };
    }
);
