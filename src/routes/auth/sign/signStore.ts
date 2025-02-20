import { writable } from "svelte/store";

export const isSubmitting = writable<boolean>(false);			// 중복 실행 방지
export const userRePWDMsg = writable<string>("");				// 유저 비밀번호 확인 실패 메시지