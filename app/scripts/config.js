
'use strict';

app.constant('FIREBASE_URL', 'https://snappynumber.firebaseio.com/');
app.constant('STRIPE_KEY', 'pk_test_Cjell4qbcqmTh2aRAHSZmaQu');
app.constant('STRIPE_API', 'https://api.stripe.com/v2');
app.constant('POSTCODE_PATTERN', /^(GIR|[A-Z]\d[A-Z\d]??|[A-Z]{2}\d[A-Z\d]??)[ ]??(\d[A-Z]{2})$/);
app.constant('MOBILE_PATTERN', /^(0|[+]?44)7(?:[1-4]\d\d|5(?:0[0-8]|[13-9]\d|2[0-35-9])|624|7(?:0[1-9]|[1-7]\d|8[02-9]|9[0-689])|8(?:[014-9]\d|[23][0-8])|9(?:[04-9]\d|1[02-9]|2[0-35-9]|3[0-689]))\d{6}$/);

app.config(function(STRIPE_KEY) {
    window.Stripe.setPublishableKey(STRIPE_KEY);
});
