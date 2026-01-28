
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/All_Blogs" | "/Appointments" | "/Appointments/apphander" | "/Appointments/calendar" | "/Appointments/edit" | "/Appointments/edit/[id]" | "/Appointments/new" | "/Blog" | "/Contactus" | "/Dynamic_Blog" | "/Dynamic_Blog/new" | "/Dynamic_Blog/[id]" | "/Dynamic_Blog/[id]/edit" | "/Hearingaid" | "/Menu" | "/Menu/edit" | "/Menu/edit/[id]" | "/Menu/new" | "/Pages" | "/Pages/edit" | "/Pages/edit/[id]" | "/Pages/new" | "/SingleBlog" | "/backuphomestatic" | "/footer" | "/[...slug]";
		RouteParams(): {
			"/Appointments/edit/[id]": { id: string };
			"/Dynamic_Blog/[id]": { id: string };
			"/Dynamic_Blog/[id]/edit": { id: string };
			"/Menu/edit/[id]": { id: string };
			"/Pages/edit/[id]": { id: string };
			"/[...slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { id?: string; slug?: string };
			"/All_Blogs": Record<string, never>;
			"/Appointments": { id?: string };
			"/Appointments/apphander": Record<string, never>;
			"/Appointments/calendar": Record<string, never>;
			"/Appointments/edit": { id?: string };
			"/Appointments/edit/[id]": { id: string };
			"/Appointments/new": Record<string, never>;
			"/Blog": Record<string, never>;
			"/Contactus": Record<string, never>;
			"/Dynamic_Blog": { id?: string };
			"/Dynamic_Blog/new": Record<string, never>;
			"/Dynamic_Blog/[id]": { id: string };
			"/Dynamic_Blog/[id]/edit": { id: string };
			"/Hearingaid": Record<string, never>;
			"/Menu": { id?: string };
			"/Menu/edit": { id?: string };
			"/Menu/edit/[id]": { id: string };
			"/Menu/new": Record<string, never>;
			"/Pages": { id?: string };
			"/Pages/edit": { id?: string };
			"/Pages/edit/[id]": { id: string };
			"/Pages/new": Record<string, never>;
			"/SingleBlog": Record<string, never>;
			"/backuphomestatic": Record<string, never>;
			"/footer": Record<string, never>;
			"/[...slug]": { slug: string }
		};
		Pathname(): "/" | "/All_Blogs" | "/All_Blogs/" | "/Appointments" | "/Appointments/" | "/Appointments/apphander" | "/Appointments/apphander/" | "/Appointments/calendar" | "/Appointments/calendar/" | "/Appointments/edit" | "/Appointments/edit/" | `/Appointments/edit/${string}` & {} | `/Appointments/edit/${string}/` & {} | "/Appointments/new" | "/Appointments/new/" | "/Blog" | "/Blog/" | "/Contactus" | "/Contactus/" | "/Dynamic_Blog" | "/Dynamic_Blog/" | "/Dynamic_Blog/new" | "/Dynamic_Blog/new/" | `/Dynamic_Blog/${string}` & {} | `/Dynamic_Blog/${string}/` & {} | `/Dynamic_Blog/${string}/edit` & {} | `/Dynamic_Blog/${string}/edit/` & {} | "/Hearingaid" | "/Hearingaid/" | "/Menu" | "/Menu/" | "/Menu/edit" | "/Menu/edit/" | `/Menu/edit/${string}` & {} | `/Menu/edit/${string}/` & {} | "/Menu/new" | "/Menu/new/" | "/Pages" | "/Pages/" | "/Pages/edit" | "/Pages/edit/" | `/Pages/edit/${string}` & {} | `/Pages/edit/${string}/` & {} | "/Pages/new" | "/Pages/new/" | "/SingleBlog" | "/SingleBlog/" | "/backuphomestatic" | "/backuphomestatic/" | "/footer" | "/footer/" | `/${string}` & {} | `/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/BTE/BTE1.png" | "/BTE/BTE2.png" | "/BTE/BTE3.png" | "/ITE/ITE1.png" | "/ITE/ITE2.png" | "/ITE/ITE3.png" | "/ITE/ITE4.png" | "/audiology.png" | "/blog1.png" | "/blog2.png" | "/blog3.png" | "/blog4.png" | "/blog5.png" | "/blog6.png" | "/blogimage1.png" | "/brands/brand1.png" | "/brands/brand2.png" | "/brands/brand3.png" | "/brands/brand4.png" | "/brands/brand5.png" | "/brands/brand6.png" | "/contactusmap.png" | "/hearingaidsimage.png" | "/image1.png" | "/image2.png" | "/image3.png" | "/image4.png" | "/image5.png" | "/image6.png" | "/logo.png" | "/logo2.png" | "/mapimage.png" | "/robots.txt" | string & {};
	}
}