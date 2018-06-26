// const globalApiDomain = 'https://www.autozone.com';
module.exports = {
  global: {
    apiDomainUrl: 'https://www.autozone.com'
  },
  app: {
    mobileMeta: {
      meta: [
        {
          name: 'google-site-verification',
          content: 'SvnRZpYzwODx11-GCCTjFa7Z2qiaxU5ZRpdyeNQn6W4'
        },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'format-detection', content: 'telephone:yes' },
        { name: 'HandheldFriendly', content: 'True' },
        { name: 'google-play-app', content: 'app-id:com.autozone.mobile' },
        {
          name: 'apple-itunes-app',
          content:
            'app-id:375381161, app-argument:autozone://m.autozone.com/screenId:HomeScreen'
        }
      ]
    },
    checkout: {
      title: 'Checkout ',
      titleTemplate: '%s',
      meta: [
        {
          name: 'description',
          content: 'Checkout'
        }
      ]
    },
    cart: {
      title: 'Cart',
      titleTemplate: '%s',
      meta: [
        {
          name: 'description',
          content: 'Cart'
        }
      ]
    },
    orderHistory: {
      title: 'OrderHistory ',
      titleTemplate: '%s',
      meta: [
        {
          name: 'description',
          content: 'OrderHistory'
        }
      ]
    },
    orderConfirmation: {
      title: 'OrderConfirmation ',
      titleTemplate: '%s',
      meta: [
        {
          name: 'description',
          content: 'OrderConfirmation'
        }
      ]
    },
    signin: {
      title: 'SignIn ',
      titleTemplate: '%s',
      meta: [
        {
          name: 'description',
          content: 'SignIn'
        }
      ]
    },
    accountPage: {
      title: 'AccountPage ',
      titleTemplate: '%s',
      meta: [
        {
          name: 'description',
          content: 'AccountPage'
        }
      ]
    }
  }
};
