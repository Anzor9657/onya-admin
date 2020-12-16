import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import LoginConfig from 'app/pages/login/LoginPageConfig';
import ExampleConfig from 'app/main/example/ExampleConfig';

const authConfigs = [LoginConfig];
const routeConfigs = [ExampleConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin']),
	...FuseUtils.generateRoutesFromConfigs(authConfigs, null),
	{
		path: '/',
		auth: null,
		component: () => <Redirect to="/example" />
	}
];

export default routes;
