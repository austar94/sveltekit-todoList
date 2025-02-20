
/**
 * 타입 정의
 */
interface RequestParams {
	method : 'GET' | 'POST' | 'PUT' | 'DELETE';
	path: string;
	data?: Record<string, any> | FormData;
}

interface ApiRespose {
	[key: string]: any;
}

/**
 * http 통신
 * @param param0 
 */
async function send<T = ApiRespose>({ method, path, data }: RequestParams): Promise<T> {
	
	// 통신 옵션 설정
	const opts: RequestInit = {
		method,
		headers: {},
		credentials: 'include'
	}

	// 전달된 요청 데이터가 있을 경우
	if(data){
		// 데이터 종류가 FormData일 경우
		if(data instanceof FormData){
			opts.body = data;
		}
		// 그 이외에 데이터 종류는 json화 하여 전달
		else {
			opts.headers = {
				...(opts.headers as Record<string, string>),
				'Content-Type' : 'application/json'
			};
			opts.body = JSON.stringify(data);
		}
	}

	try {
		const res = await fetch(path, opts);

		// 응답이 정상일 경우
		if(res.ok || res.status === 422){
			const text = await res.text();
			const data = JSON.parse(text);
			const errCd = data.errCd;
			const errMsg = data.errMsg;

			// 정상 코드가 아닐 경우
			if(errCd != 0){
				const url = data.url;

				if(errMsg) alert(errMsg);

				if(url){
					if(url == 1) location.reload();
					else if(url == -1) history.back();
					else location.href = url;
				}
			}

			return text ? JSON.parse(text) : ({} as T);
		} 
		// 응답이 정상적이지 않을 경우
		else {
			return {
				data : {},
				errCd : 9999,
				errMsg : "오류 발생"
			} as T;
		}

	} catch (error) {
		return {
			data : {},
			errCd : 8888,
			errMsg : "오류 발생"
		} as T;
	}
}

/**
 * POST 전송
 * @param path	URL 
 * @param data  데이터
 * @returns 
 */
export function post<T = ApiRespose>(
	path: string,
	data?: Record<string, any>
): Promise<T> {
	return send<T>({ method: 'POST', path, data });
}