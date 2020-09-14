import React from "react";

function Auth() {
	return (
		<div className="auth-holder">
			<h1>Register</h1>
			<form>
				<input type="text" placeholder="username" className="input" />
				<br />
				<input type="text" placeholder="password" className="input" />
				<br />
				<input type="submit" value="Register" className="submit" />
			</form>
		</div>
	);
}

export default Auth;
