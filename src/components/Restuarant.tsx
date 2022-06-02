import React from "react";

interface Props {
	restaurants: string[] | [];
	isLoading: boolean;
}

const Restuarant = ({ restaurants, isLoading }: Props) => {
	if (!restaurants.length) {
		return null;
	}

	return (
		<div>
			<h4 className="heading">Restaurants</h4>

			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className="itemWrapper">
					{restaurants.map((restaurant: string, idx) => (
						<div key={idx} className="item">
							{restaurant}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Restuarant;
