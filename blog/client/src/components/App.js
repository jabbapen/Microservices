import PostCreate from './PostCreate';
import PostList from './PostList';

const App = () => {
	return (
		<div>
			<PostCreate />
			<hr />
			<h1>Postss </h1>
			<PostList />
		</div>
	);
};

export default App;
