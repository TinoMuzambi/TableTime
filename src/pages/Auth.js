import React, { Component } from "react";
import { MdArrowBack } from "react-icons/md";
import { withRouter } from "react-router-dom";

class Auth extends Component {
	render() {
		return (
			<div className="auth-holder">
				<button
					className="auth-back-button"
					onClick={this.props.history.goBack}
				>
					<MdArrowBack className="button-link" />
				</button>
				<h1 className="title">Register</h1>
				<form>
					<input type="text" placeholder="username" className="input user" />
					<br />
					<input
						type="text"
						placeholder="password"
						className="input password"
					/>
					<br />
					<input type="submit" value="Register" className="submit" />
				</form>
			</div>
		);
	}
}

export default withRouter(Auth);
