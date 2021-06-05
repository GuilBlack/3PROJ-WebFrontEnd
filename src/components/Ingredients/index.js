import React, { useEffect, useState } from "react";
import { listIngredients, updateStock } from "../../api";
import {
	Table,
	Container,
	Row,
	Form,
	Alert,
	Col,
	Button,
} from "react-bootstrap";
import { addIngredient } from "../../api";

export default function Ingredients() {
	const [ingredients, setIngredients] = useState([]);
	const [err, setErr] = useState();
	const [updateErr, setUpdateErr] = useState();

	useEffect(() => {
		// api call
		listIngredients()
			.then((res) => {
				console.log(res);
				setIngredients(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const submitIngredient = (e) => {
		e.preventDefault();
		const formData = e.target.elements;
		const ingredient = {
			name: formData.formName.value,
			stock: formData.formStock.value,
		};

		addIngredient(ingredient)
			.then((res) => {
				listIngredients()
					.then((res) => {
						console.log(res);
						setIngredients(res.data);
					})
					.catch((err) => {
						if (err.response) {
							if (err.response.status === 401)
								setErr(
									"An unexpected error occured. Please log out and log back in to proceed."
								);
							else setErr(err.response.data.message);
						} else {
							setErr(
								"Our servers are down at the moment. Please try again later."
							);
						}
					});
			})
			.catch((err) => {
				if (err.response) {
					if (err.response.status === 401)
						setErr(
							"An unexpected error occured. Please log out and log back in to proceed."
						);
					else setErr(err.response.data.message);
				} else {
					setErr(
						"Our servers are down at the moment. Please try again later."
					);
				}
			});
	};

	const addToStock = (ingredientId) => () => {
		const form = document.getElementById(ingredientId);
		const fields = form.childNodes;
		const valueAdded = Number(fields[2].value);
		if (isNaN(valueAdded)) {
			setUpdateErr({
				id: ingredientId,
				message: "Input a number that's more than 0!",
			});
		} else {
			if (valueAdded <= 0) {
				setUpdateErr({
					id: ingredientId,
					message: "Input a number that's more than 0!",
				});
			} else {
				setUpdateErr(null);
				const ingredient = {
					id: ingredientId,
					stock: valueAdded + Number(fields[0].value),
				};
				updateStock(ingredient)
					.then((res) => {
						listIngredients()
							.then((res) => {
								fields[2].value = null;
								setIngredients(res.data);
							})
							.catch((err) => {
								if (err.response) {
									if (err.response.status === 401)
										setErr(
											"An unexpected error occured. Please log out and log back in to proceed."
										);
									else setErr(err.response.data.message);
								} else {
									setErr(
										"Our servers are down at the moment. Please try again later."
									);
								}
							});
					})
					.catch((err) => {
						if (err.response) {
							if (err.response.status === 401)
								setErr(
									"An unexpected error occured. Please log out and log back in to proceed."
								);
							else setErr(err.response.data.message);
						} else {
							setErr(
								"Our servers are down at the moment. Please try again later."
							);
						}
					});
			}
		}
	};

	const preventSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div>
			<h1 className="text-center">Stock</h1>
			<div className="text-center" hidden={!err}>
				<Alert variant="danger">
					<Alert.Heading>Oops!</Alert.Heading>
					<p> {err} </p>
				</Alert>
			</div>
			<Container>
				<Table responsive striped hover>
					<thead>
						<tr>
							<th>Item</th>
							<th>Amount</th>
							<th>Restock</th>
						</tr>
					</thead>
					<tbody>
						{ingredients.map((ingredient, i) => (
							<tr key={ingredient._id}>
								<td style={{ width: "33%" }}>
									{ingredient.name}
								</td>
								<td style={{ width: "33%" }}>
									{ingredient.stock}
								</td>
								<td style={{ width: "33%" }}>
									<Form
										inline
										onSubmit={preventSubmit}
										id={`${ingredient._id}`}
										style={{
											padding: "0px",
										}}
									>
										<Form.Control
											type="hidden"
											name="formCurrentStock"
											value={ingredient.stock}
										/>
										<Form.Label
											htmlFor="formStockAdded"
											srOnly
										>
											Add Stock
										</Form.Label>
										<Form.Control
											name="formStockAdded"
											placeholder="Restock amount"
										/>
										<Button
											type="button"
											onClick={addToStock(ingredient._id)}
											style={{ marginLeft: "0.1em" }}
										>
											<i className="bi bi-pencil-square"></i>
										</Button>
										<Form.Text className="text-danger">
											{updateErr
												? updateErr.id ===
												  ingredient._id
													? updateErr.message
													: null
												: null}
										</Form.Text>
									</Form>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				<Row>
					<Form inline onSubmit={submitIngredient}>
						<Col>
							<Form.Label htmlFor="formName" srOnly>
								Name
							</Form.Label>
							<Form.Control
								id="formName"
								placeholder="Stock item"
								required
							/>
						</Col>
						<Col>
							<Form.Label htmlFor="formStock" srOnly>
								Stock
							</Form.Label>
							<Form.Control
								id="formStock"
								placeholder="Stock amount"
								type="number"
								min="1"
								required
							/>
						</Col>
						<Col>
							<Button type="submit">Add to stock</Button>
						</Col>
					</Form>
				</Row>
			</Container>
		</div>
	);
}
