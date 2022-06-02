import React from "react";

interface Props {
	cities: string[] | [];
	handleCityChange: (city: string) => void;
	isLoading: boolean;
}

const City = ({ cities, handleCityChange, isLoading }: Props) => {
	return (
		<div className="wrapper">
			Cities:
			<select
				onChange={(e) => handleCityChange(e.target.value)}
				disabled={isLoading}>
				<option value="" disabled selected>
					Select City
				</option>
				{cities.map((city: string, idx) => (
					<option key={idx} value={city}>
						{city}
					</option>
				))}
			</select>
		</div>
	);
};

export default City;
