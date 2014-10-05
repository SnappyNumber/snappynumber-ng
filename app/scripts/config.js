
'use strict';

app.config(function(STRIPE_KEY) {
    window.Stripe.setPublishableKey(STRIPE_KEY);
});
