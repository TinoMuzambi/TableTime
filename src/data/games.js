const games = [
	{
		bestOf: "Single Game",
		gameType: 11,
		player1: "Talent",
		player2: "David",
		player1Score: { 1: 11 },
		player2Score: { 1: 8 },
	},
	{
		bestOf: "Best of 3",
		gameType: 11,
		player1: "Tino",
		player2: "David",
		player1Score: { 1: 11, 2: 8, 3: 11 },
		player2Score: { 1: 8, 2: 11, 3: 5 },
	},
	{
		bestOf: "Best of 3",
		gameType: 21,
		player1: "Tino",
		player2: "Bob",
		player1Score: { 1: 21, 2: 8, 3: 21 },
		player2Score: { 1: 8, 2: 21, 3: 19 },
	},
];

export default games;
