import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
	// Vite에서 환경 변수 로드
	// 환경변수는 root 위치의 .env 파일임.
	const env = loadEnv(mode, process.cwd(), '');
	
	return {
			plugins: [
				sveltekit(),
				tailwindcss()
			],
			server: {
				host: true,									// 해당 값이 없을 경우 docker에서 정상 실행되지 않음.
				port: parseInt(env.VITE_PORT || '5173'),	// 기본값 5173
			},
		};
	}
);