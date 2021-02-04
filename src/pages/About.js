import React from "react";
import { MdArrowBack } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import pkg from "../../package.json";

function About() {
	const history = useHistory();

	const divVariants = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
		},
	};

	return (
		<>
			<motion.div
				className="about-holder"
				variants={divVariants}
				initial="hidden"
				animate="visible"
			>
				<div className="flex">
					<button className="about-back-button" onClick={history.goBack}>
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
							<p className="version">Table Time © v {pkg.version}</p>
						</>
					}
				</p>
			</motion.div>
		</>
	);
}

export default About;
