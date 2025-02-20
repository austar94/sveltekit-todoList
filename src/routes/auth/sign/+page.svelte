<script lang="ts">
	import {Login} from './sign';
	import { userRePWDMsg } from './signStore';
	

</script>
<fieldset class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
	<form on:submit={Login}>
		<legend class="fieldset-legend">Sign</legend>
		
		<label class="fieldset-label">ID</label>
		<input type="text" class="input" id="userID" placeholder="ID" maxlength="20" />
		
		<label class="fieldset-label">Name</label>
		<input type="text" class="input" id="userName" placeholder="Name" maxlength="20" />
		
		<label class="fieldset-label">Password</label>
		<input type="password" class="input" id="userPWD" placeholder="Password" maxlength="20" />
		
		<label class="fieldset-label">Password Check</label>
		<input type="password" class="input" id="userRePWD" placeholder="Password Check" maxlength="20" />
		{#if $userRePWDMsg}
		<div class="badge badge-error">
			<svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor"><rect x="1.972" y="11" width="20.056" height="2" transform="translate(-4.971 12) rotate(-45)" fill="currentColor" stroke-width="0"></rect><path d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z" stroke-width="0" fill="currentColor"></path></g></svg>
			{$userRePWDMsg}
		</div>
		{/if}
		<button type="submit" class="btn btn-neutral mt-4">Sign</button>
	</form>
</fieldset>