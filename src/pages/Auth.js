import React, { Component } from "react";
import { MdArrowBack } from "react-icons/md";
import { withRouter, Redirect } from "react-router-dom";

class Auth extends Component {
	constructor() {
		super();

		this.state = {
			curr: "Login",
			username: "",
			password: "",
			loggedIn: false,
			redirect: false,
		};

		this.auth = this.auth.bind(this);
	}

	async auth(e) {
		e.preventDefault();
		const userDetails = {
			username: this.state.username,
			password: this.state.password,
		};
		const url =
			this.state.curr === "Login"
				? `https://table-time.herokuapp.com/api/user/login`
				: `https://table-time.herokuapp.com/api/user/register`;
		await fetch(url, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userDetails),
		}).then((response) => {
			const success = document.querySelector(".status-block-success");
			const failure = document.querySelector(".status-block-failure");
			const notice = document.querySelector(".notice");
			notice.classList.add("shown");
			response.text().then((res) => {
				failure.firstChild.innerText = res;
			});
			if (response.status === 200) {
				success.classList.add("shown");
				this.setState({ redirect: true, loggedIn: true });
				if (this.state.redirect) {
					return <Redirect to="/" />;
				}
			} else if (response.status === 201) {
				success.classList.add("shown");
			} else {
				console.log("failure");
				failure.classList.add("shown");
			}
			response.status === 200 || response.status === 201
				? setTimeout(() => {
						success.classList.remove("shown");
						notice.classList.remove("shown");
						this.setState({ username: "" });
						this.setState({ password: "" });
				  }, 5000)
				: setTimeout(() => {
						failure.classList.remove("shown");
						notice.classList.remove("shown");
				  }, 5000);
		});
	}

	render() {
		return (
			<>
				<div className="notice">
					<div className="status-block-success">
						<p className="text">Success</p>
					</div>
					<div className="status-block-failure">
						<p className="text">Logged In</p>
					</div>
				</div>
				<div className="auth-holder">
					<div className="flex">
						<button
							className="auth-back-button"
							onClick={this.props.history.goBack}
						>
							<MdArrowBack className="button-link" />
						</button>
						<h1 className="title">{this.state.curr}</h1>
						<button
							className="toggler"
							onClick={() => {
								this.setState({
									curr: this.state.curr === "Login" ? "Register" : "Login",
								});
							}}
						>
							Register
						</button>
					</div>

					<div className="col">
						<form onSubmit={this.auth} className="form">
							<input
								type="text"
								placeholder="username"
								className="input user"
								value={this.state.username}
								onChange={(e) => this.setState({ username: e.target.value })}
							/>
							<input
								type="password"
								placeholder="password"
								className="input password"
								value={this.state.password}
								onChange={(e) => this.setState({ password: e.target.value })}
							/>
							<input type="submit" value={this.state.curr} className="submit" />
						</form>
					</div>
				</div>
			</>
		);
	}
}

export default withRouter(Auth);
