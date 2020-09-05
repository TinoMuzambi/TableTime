import React, { Component } from "react";
import "./About.css";
import { MdArrowBack } from "react-icons/md";
import { withRouter } from "react-router-dom";

class About extends Component {
	render() {
		document.title = "About | Table Time";
		return (
			<>
				<div className="about-holder">
					<button
						className="about-back-button"
						onClick={this.props.history.goBack}
					>
						<MdArrowBack className="button-link" />
					</button>
					<h1 className="about-title">About</h1>
					<img src="/logo512.png" alt="logo" className="about-logo" />
					<p className="footer">
						Developed by{" "}
						{
							<>
								<a
									href="https://bit.ly/TinoLinkedIn"
									target="__blank"
									className="link-link"
								>
									Tino Muzambi
								</a>
								<br />
								<p className="version">Table Time © v 1.0</p>
							</>
						}
					</p>
				</div>
			</>
		);
	}
}

export default withRouter(About);
