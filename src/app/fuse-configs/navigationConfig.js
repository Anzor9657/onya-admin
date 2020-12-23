import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'categories',
		title: 'Categories',
		translate: 'Categories',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'users-component',
				title: 'Users',
				translate: 'Users',
				type: 'item',
				icon: 'users',
				url: '/users'
			},
			{
				id: 'trades-component',
				title: 'Trades',
				translate: 'Trades',
				type: 'item',
				icon: 'trades',
				url: '/trades'
			}
		]
	}
];

export default navigationConfig;
