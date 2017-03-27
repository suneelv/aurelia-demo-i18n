import {PLATFORM} from 'aurelia-framework';
import CustomCallbackBackend from './i18next-callback-backend';

const lang = "de";

export function configure(aurelia) {
	i18nPromise.then(() => {

		aurelia.use.standardConfiguration()
		.plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
			// register backend plugin
			// register backend plugin
			// downgraded to i18next 3.4.4 from 3.5 as the latest version is causing problem with aurelia plugin
				instance.i18next.use(CustomCallbackBackend);

				// adapt options to your needs (see http://i18next.com/docs/options/)
				// make sure to return the promise of the setup method, in order to guarantee proper loading
				//keep webpack i18n config in sync with this options
				return instance.setup({
					// backend: { // <-- configure backend settings
					//
					// 	loadPath: '/static/locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
					// 	allowMultiLoading: false
					// },
					// Callback used when loading a single resource.
					customLoad: (language, namespace, callback) => {
						// Your custom loading logic.
						switch (language) {
							case 'de':
								require.ensure(['../locales/de/translation.json'], function(require) {
									var i18nJson = require('../locales/de/translation.json');
									callback(null, i18nJson);
								});
								break;
							default:
								require.ensure(['../locales/en/translation.json'], function(require) {
									var i18nJson = require('../locales/en/translation.json');
									callback(null, i18nJson);
								});
						}
					},
					lng: lang,
					attributes: [
						't', 'i18n'
					],
					fallbackLng: 'en',
					pluralSeparator: '_',
					debug: true
				});
		});
		aurelia.start().then(() => {
			aurelia.setRoot(PLATFORM.moduleName('app'));
		})
	});
}

//load polyfills..
//i18n
let i18nPromise = new Promise(function(resolve, reject) {
	if (!global.Intl) {
		logger.info('Intl not present');
		switch (lang) {
			case 'de':
				require.ensure([
					'intl', 'intl/locale-data/jsonp/de.js'
				], function(require) {
					require('intl');
					require('intl/locale-data/jsonp/de.js');
					resolve();
				});
				break;
			default:
				require.ensure([
					'intl', 'intl/locale-data/jsonp/en.js'
				], function(require) {
					require('intl');
					require('intl/locale-data/jsonp/en.js');
					resolve();
				});
		}
	} else {
		resolve();
	}
});
