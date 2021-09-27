import { Layout } from 'antd';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthActionCreators } from "./store/reducers/auth/action-creators";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(AuthActionCreators.setUser({ email: user.email, uid: user.uid }));
				dispatch(AuthActionCreators.setIsAuth(true));
			}
		})
	})

	return (
		<Layout>
			<Header />
			<Layout.Content>
				<AppRouter />
			</Layout.Content>
			<Layout.Footer style={{ textAlign: 'center' }}>
				<span> ©2021 </span>
				<a href="https://github.com/Nokkup/event-calendar">Github link</a>
			</Layout.Footer>
		</Layout>
	);
}

export default App;
