const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const posts = {};

const handleEvent = (type, data) => {
	if (type === 'PostCreated') {
		const { id, title } = data;
		posts[id] = { id, title, comments: [] };
	}

	if (type === 'CommentCreated') {
		const { id, content, postId } = data;
		posts[postId].comments.push({ id, content });
	}

	if (type === 'CommentUpdated') {
		const { id, postId, content, status } = data;
		console.log(data);
		const comment = posts[postId].comments.find(
			(comment) => id === comment.id
		);

		comment.content = content;
		comment.status = status;
	}
};

app.get('/posts', (req, res) => {
	res.send(posts);
});

app.post('/events', (req, res) => {
	const { type, data } = req.body;
	handleEvent(type, data);
	console.log(posts);
	res.send({});
});

app.listen(4002, async () => {
	console.log('listening on 4002');

	const res = await axios
		.get('http://event-bus-srv:4005/events')
		.catch((err) => {
			console.log(err);
		});

	for (const event of res.data) {
		console.log('Processing event:', event.type);

		handleEvent(event.type, event.data);
	}
});
