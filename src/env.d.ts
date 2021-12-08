interface ImportMetaEnv {
	readonly VITE_TMDB_API_KEY: string;
	readonly VITE_TMDB_USERNAME: string;
	readonly VITE_TMDB_PASSWORD: string;
	readonly VITE_TMDB_USER_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
