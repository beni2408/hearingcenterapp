export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24')
];

export const server_loads = [];

export const dictionary = {
		"/All_Blogs": [3],
		"/Appointments/apphander": [4,[2]],
		"/Appointments/calendar": [5,[2]],
		"/Appointments/edit/[id]": [6,[2]],
		"/Appointments/new": [7,[2]],
		"/Blog": [8],
		"/Contactus": [~9],
		"/Dynamic_Blog": [10],
		"/Dynamic_Blog/new": [13],
		"/Dynamic_Blog/[id]": [11],
		"/Dynamic_Blog/[id]/edit": [12],
		"/Hearingaid": [14],
		"/Menu": [15],
		"/Menu/edit/[id]": [16],
		"/Menu/new": [17],
		"/Pages": [18],
		"/Pages/edit/[id]": [19],
		"/Pages/new": [20],
		"/SingleBlog": [21],
		"/backuphomestatic": [23],
		"/footer": [24],
		"/[...slug]": [22]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';