const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
	const { type, data } = req.body;

	if (type === 'CommentCreated') {
		console.log(data);
		const status = data.content.includes('orange')
			? 'rejected'
			: 'approved';

		await axios.post('http://event-bus-srv:4005/events', {
			type: 'CommentModerated',
			data: {
				...data,
				status,
			},
		});

		res.send('Comment Moderated');
	}
});

app.listen(4003, () => {
	console.log('Listening on 4003');
});
