import React, { Component } from "react";
import { MdArrowBack } from "react-icons/md";
import { withRouter } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";

class Auth extends Component {
	constructor(props) {
		super(props);

		this.state = {
			curr: "Login",
			username: "",
			password: "",
			loggedIn: false,
			isFetching: false,
		};

		this.auth = this.auth.bind(this);
	}

	async auth(e) {
		e.preventDefault();
		await this.setState({ isFetching: true }); // Set isFetching true to display loading icon.
		const userDetails = {
			username: this.state.username,
			password: this.state.password,
		};
		const url =
			this.state.curr === "Login"
				? `https://table-time.herokuapp.com/api/user/login`
				: `https://table-time.herokuapp.com/api/user/register`;
		await fetch(url, {
			// Make call to backend to process request.
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(userDetails),
		}).then(async (response) => {
			const success = document.querySelector(".status-block-success"); // Get elements to interact with.
			const failure = document.querySelector(".status-block-failure");
			const notice = document.querySelector(".notice");
			await this.setState({ isFetching: false }); // Set isFetching false to hide loading icon once done fetching from DB.
			notice.classList.add("shown");
			response.text().then((res) => {
				failure.firstChild.innerText = res; // Set failure message.
			});
			if (response.status === 200) {
				success.classList.add("shown"); // If succesfully logged in go back to home.
				this.props.setLoggedIn(true);
				this.props.history.goBack();
			} else if (response.status === 201) {
				// If succesfully registered allow login.
				success.classList.add("shown");
				this.setState({ curr: "Login" });
			} else {
				// Else display error to user.
				failure.classList.add("shown");
			}
			response.status === 200 || response.status === 201 // Remove dialogs after three seconds.
				? setTimeout(() => {
						notice.classList.remove("shown");
						success.classList.remove("shown");

						this.setState({ username: "" });
						this.setState({ password: "" });
				  }, 3000)
				: setTimeout(() => {
						notice.classList.remove("shown");
						failure.classList.remove("shown");
				  }, 3000);
		});
	}

	render() {
		return (
			<>
				{this.state.isFetching ? (
					<div className="notice2">
						<AiOutlineReload className="icon" />
					</div>
				) : (
					""
				)}

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
