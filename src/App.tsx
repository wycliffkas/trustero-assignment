import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import "./App.css";
import City from "./components/City";
import Restuarant from "./components/Restuarant";

interface State {
	cities: string[] | [];
	restaurants: string[] | [];
	isLoadingCities: boolean;
	isLoadingRestaurants: boolean;
}

function App() {
	const [state, setState] = useState<State>({
		cities: [],
		restaurants: [],
		isLoadingCities: false,
		isLoadingRestaurants: false
	});

	const onHandleCityChange = async (city: string) => {
		try {
			setState((prevState) => ({
				...prevState,
				isLoadingRestaurants: true
			}));

			const response: AxiosResponse = await axios.get(
				`https://interview-server-2022.boadler.repl.co/restaurants/${city}`
			);

			setState((prevState) => ({
				...prevState,
				restaurants: response.data,
				isLoadingRestaurants: false
			}));
		} catch (error) {
			setState((prevState) => ({
				...prevState,
				isLoadingRestaurants: false
			}));
			console.log(error);
		}
	};

	useEffect(() => {
		const CancelToken = axios.CancelToken;
		const source = CancelToken.source();

		const getCities = async () => {
			try {
				setState((prevState) => ({
					...prevState,
					isLoadingCities: true
				}));

				const response: AxiosResponse = await axios.get(
					"https://interview-server-2022.boadler.repl.co/cities",
					{
						cancelToken: source.token
					}
				);

				setState((prevState) => ({
					...prevState,
					cities: response.data,
					isLoadingCities: false
				}));
			} catch (error) {
				if (axios.isCancel(error)) {
					console.log("successfully aborted");
				} else {
					setState((prevState) => ({
						...prevState,
						isLoadingCities: false
					}));
					console.log(error);
				}
			}
		};

		getCities();

		return () => {
			source.cancel();
		};
	}, []);

	return (
		<div className="App">
			<City
				handleCityChange={onHandleCityChange}
				cities={state.cities}
				isLoading={state.isLoadingCities}
			/>

			<Restuarant
				restaurants={state.restaurants}
				isLoading={state.isLoadingRestaurants}
			/>
		</div>
	);
}

export default App;
