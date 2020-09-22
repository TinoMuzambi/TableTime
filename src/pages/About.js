import React from "react";
import { MdArrowBack } from "react-icons/md";
import { withRouter } from "react-router-dom";

function About() {
	return (
		<>
			<div className="about-holder">
				<div className="flex">
					<button
						className="about-back-button"
						onClick={this.props.history.goBack}
					>
						<MdArrowBack className="button-link" />
					</button>
					<h1 className="about-title">About</h1>
				</div>

				<img src="/logo512.png" alt="logo" className="about-logo inverted" />
				<p className="footer">
					Developed by
					{
						<>
							<a
								href="https://bit.ly/TinoLinkedIn"
								target="__blank"
								className="link-link"
							>
								{` Tino Muzambi`}
							</a>
							<br />
							<p className="version">Table Time © v 1.1</p>
						</>
					}
				</p>
			</div>
		</>
	);
}

export default withRouter(About);
