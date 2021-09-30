import { Layout } from 'antd';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthActionCreators } from "./store/reducers/auth/action-creators";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";


const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(AuthActionCreators.signedInUser())
	}, [])

	return (
		<Layout>
			<Header />
			<Layout.Content>
				<AppRouter />
			</Layout.Content>
			<Footer />
		</Layout>
	);
}

export default App;
