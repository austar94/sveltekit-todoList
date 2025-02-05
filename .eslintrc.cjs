module.exports = {
	// 프로젝트 루트 디렉토리에 ESLint 설정이 적용됨을 명시
	root: true,
  
	// TypeScript를 파싱하기 위해 @typescript-eslint/parser 사용
	parser: '@typescript-eslint/parser',
  
	parserOptions: {
	  // tsconfig.json 파일 경로 설정 (TypeScript용)
	  tsconfigRootDir: __dirname,
	  project: './tsconfig.json',
	},
  
	extends: [
	  // 기본 ESLint 권장 규칙 사용
	  'eslint:recommended',
	  // TypeScript 권장 규칙 사용
	  'plugin:@typescript-eslint/recommended',
	  // Svelte 파일에 대한 ESLint 규칙 적용
	  'plugin:svelte3/recommended',
	  // Prettier와 충돌하는 ESLint 규칙 비활성화
	  'prettier',
	],
  
	plugins: [
	  // TypeScript 관련 규칙을 추가하기 위한 플러그인
	  '@typescript-eslint',
	],
  
	overrides: [
	  {
		// Svelte 파일에 대해 특정 처리 적용
		files: ['*.svelte'],
		// Svelte 파일을 svelte3 프로세서로 처리
		processor: 'svelte3/svelte3',
	  },
	],
  
	settings: {
	  // Svelte 파일에서 TypeScript 지원 활성화
	  'svelte3/typescript': require('typescript'),
	},
  
	rules: {
	  // ESLint 기본 규칙을 프로젝트에 맞게 설정
	  'no-unused-vars': 'warn', // 사용하지 않는 변수 경고 표시
	  '@typescript-eslint/no-unused-vars': 'warn', // TypeScript에서 사용하지 않는 변수 경고
	},
  };
  