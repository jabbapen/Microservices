import React, { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
	const [content, setContent] = useState('');

	const onSubmit = async (event) => {
		event.preventDefault();

		await axios.post(`http://posts.com/posts/${postId}/comments`, {
			content,
		});

		setContent('');
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>New Comment</label>
					<input
						className="form-control"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>
				<button className="btn-primary btn">Submit</button>
			</form>
		</div>
	);
};

export default CommentCreate;