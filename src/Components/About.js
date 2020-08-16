import React, { Component } from "react";
import "./About.css";

class About extends Component {
	render() {
		return (
			<>
				<div className="about-holder">
					<h1>About</h1>
					<img src="/logo512.png" alt="logo" className="logo" />
					<p>
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
								<p className="version">v 1.0</p>
							</>
						}
					</p>
				</div>
			</>
		);
	}
}

export default About;
