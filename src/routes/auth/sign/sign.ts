import { get } from 'svelte/store';
import { isSubmitting, userRePWDMsg } from './signStore';
import { trimValue } from '$lib/helpers/common'
import * as api from '$lib/helpers/api';

/**
 * 로그인
 * @param even 
 */
export async function Login(event: SubmitEvent) {
	event.preventDefault();

	if(get(isSubmitting)) return;							// 중복 실행 방지
	isSubmitting.set(true);									// 중복 실행 방지 값 업데이트

	try {
		const form = event.target as HTMLFormElement;		// 폼 호출
		const userID = (form.querySelector('input[id="userID"]') as HTMLInputElement);
		const userName = (form.querySelector('input[id="userName"]') as HTMLInputElement);
		const userPWD = (form.querySelector('input[id="userPWD"]') as HTMLInputElement);
		const userRePWD = (form.querySelector('input[id="userRePWD"]') as HTMLInputElement);

		const userIDRegex = /^[a-zA-Z0-9]{4,20}$/;			// 영문+숫자 4~20자리
		let isCheck = true;

		// 아이디 입력 확인
		if(!trimValue(userID.value)){
			alert("아이디를 입력해주세요.");
			userID.focus();
			isCheck = false;
		}
		
		// 이름 입력 확인
		if(!trimValue(userName.value)){
			alert("이름을 입력해주세요.");
			if(isCheck) userName.focus();
			isCheck = false;
		}

		// 아이디 유효성 검사
		if(!userIDRegex.test(trimValue(userID.value))) {
			alert("아디는 4~20자 사이의 영문과 숫자만 사용할 수 있습니다.");
			if(isCheck) userID.focus();
			isCheck = false;
		}

		// 비밀번호 유효성 확인
		if(!validatePassword(userPWD.value)){
			alert("비밀번호는 8~50자 사이의 숫자, 대문자, 소문자, 특수문자를 조합해야합니다.\n공백은 포함될 수 없습니다.");
			if(isCheck) userPWD.focus();
			isCheck = false;
		}

		// 비밀번호 확인 입력 확인
		if(!trimValue(userRePWD.value)){
			userRePWDMsg.set("비밀번호 확인을 입력해주세요.");
			if(isCheck) userRePWD.focus();
			isCheck = false;
		} 
		// 비밀번호 일치 확인
		else if(trimValue(userRePWD.value) !== trimValue(userPWD.value)){
			userRePWDMsg.set("비밀번호가 일치하지 않습니다.");
			if(isCheck) userRePWD.focus();
			isCheck = false;
		}

		if(!isCheck) return;

		const formData = new FormData(form);
		const res = await api.post("/api/auth/sign", formData);
		if(res.errCd === 0){
			const errObject = res.errObject;
			const errMsg = res.errMsg;

			if(errObject == 'userID') {
				userID.focus();
			} else if(errObject == 'userName') {
				userName.focus();
			} else if(errObject == 'userPWD') {
				userPWD.focus();
			} else if(errObject == 'userRePWD') {
				userRePWD.focus();
			} 

			if(errMsg) alert(errMsg);
		}


	} catch (error) {

	} finally {
		isSubmitting.set(false);							// 중복 실행 방지 해제
	}

}

/**
 * 비밀번호 유효성 검사 함수
 * 길이 8~50
 * 숫자, 대문자, 소문자, 특수문자를 포함
 * @param password 
 */
function validatePassword(password: string): boolean {
	const lengRegex = /^.{8,50}$/;							// 8~50자 길이 확인
	const hasUpperRegex = /[A-Z]/;							// 대문자 확인
	const hasLowerRegex = /[a-z]/;							// 소문자 확인
	const hasUpperLowerRegex = /[a-zA-Z]/;					// 대소문자 확인
	const hasNumberRegex = /[0-9]/;							// 숫자 확인
	const hasSpecialCharRegex = /[~!@#$%^&*()_+{}[\]:;<>,.?\/\\-]/; // 특수문자 포함 확인
	const whitestpceRegex = /\s/;						// 공백 문자 확인

	// 공백문자 포함 확인
	if(whitestpceRegex.test(password)){
		return false;
	}

	return (
		lengRegex.test(password) &&
		hasUpperLowerRegex.test(password) && 
		hasNumberRegex.test(password) && 
		hasSpecialCharRegex.test(password)
	);
}