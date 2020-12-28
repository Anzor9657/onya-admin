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
				icon: 'people',
				url: '/users'
			},
			{
				id: 'trades-component',
				title: 'Trades',
				translate: 'Trades',
				type: 'item',
				icon: 'local_offer',
				url: '/trades'
			}
		]
	},
	{
		id: 'administration',
		title: 'administration',
		translate: 'administration',
		type: 'group',
		icon: 'admin_panel_settings',
		children: [
			{
				id: 'roles-component',
				title: 'Roles',
				translate: 'Roles',
				type: 'item',
				icon: 'assignment_ind',
				url: '/roles'
			}
		]
	}
];

export default navigationConfig;
