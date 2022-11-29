import React, { useState, useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";
import { motion } from "framer-motion";

function Auth({ setLoggedIn, setOuterUsername }) {
	const [curr, setCurr] = useState("Log In");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	// const [loggedIn, setLoggedIn] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const history = useHistory();

	useEffect(() => {
		document.getElementById("user").focus();
	}, []);

	const divVariants = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
		},
	};

	const auth = async (e) => {
		e.preventDefault();
		await setIsFetching(true); // Set isFetching true to display loading icon.
		const userDetails = {
			username: username,
			password: password,
		};
		const userDetailsReg = {
			username: username,
			password: password,
			passwordConfirm: passwordConfirm,
			userType: "standard",
		};
		const url =
			curr === "Log In"
				? `https://tabletimefull-production.up.railway.app/api/user/login`
				: `https://tabletimefull-production.up.railway.app/api/user/register`;
		await fetch(url, {
			// Make call to backend to process request.
			method: "post",
			headers: { "Content-Type": "application/json" },
			body:
				curr === "Log In"
					? JSON.stringify(userDetails)
					: JSON.stringify(userDetailsReg),
		}).then(async (response) => {
			const success = document.querySelector(".status-block-success"); // Get elements to interact with.
			const failure = document.querySelector(".status-block-failure");
			const notice = document.querySelector(".notice");
			await setIsFetching(false); // Set isFetching false to hide loading icon once done fetching from DB.
			notice.classList.add("shown");
			let text = "";
			response.text().then(async (res) => {
				text = await res;
				text = text.includes("[ref:password]")
					? "password fields must match"
					: text;
				if (response.status === 200) {
					localStorage.setItem("table-user", text);
					setOuterUsername(username);
					localStorage.setItem("username", username);
				} else failure.firstChild.innerText = text; // Set failure message.
			});
			if (response.status === 200) {
				success.classList.add("shown"); // If succesfully logged in go back to home.

				setLoggedIn(true);

				history.goBack();
			} else if (response.status === 201) {
				// If succesfully registered allow login.
				success.classList.add("shown");
				setCurr("Log In");
			} else {
				// Else display error to user.
				failure.classList.add("shown");
			}
			response.status === 200 || response.status === 201 // Remove dialogs after three seconds.
				? setTimeout(() => {
						notice.classList.remove("shown");
						success.classList.remove("shown");

						setUsername("");
						setPassword("");
						setPasswordConfirm("");
				  }, 3000)
				: setTimeout(() => {
						notice.classList.remove("shown");
						failure.classList.remove("shown");
				  }, 3000);
		});
	};

	return (
		<>
			{isFetching ? (
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

			<motion.div
				className="auth-holder"
				variants={divVariants}
				initial="hidden"
				animate="visible"
			>
				<div className="flex">
					<button className="auth-back-button" onClick={history.goBack}>
						<MdArrowBack className="button-link" />
					</button>
					<h1 className="title">{curr}</h1>
					<button
						className="toggler"
						onClick={() => {
							setCurr(curr === "Log In" ? "Register" : "Log In");
						}}
					>
						{curr === "Log In" ? "Register" : "Log In"}
					</button>
				</div>

				<div className="col">
					<form onSubmit={auth} className="form">
						<input
							type="text"
							autocapitalize="none"
							placeholder="username"
							className="input user"
							id="user"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<input
							type="password"
							placeholder="password"
							className="input password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{curr === "Log In" ? (
							""
						) : (
							<input
								type="password"
								placeholder="confirm password"
								className="input password"
								value={passwordConfirm}
								onChange={(e) => setPasswordConfirm(e.target.value)}
							/>
						)}
						<input type="submit" value={curr} className="submit" />
					</form>
				</div>
			</motion.div>
		</>
	);
}

export default Auth;
