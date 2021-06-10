import React, { useEffect, useState } from "react";
import { Alert, Container, Tab, Tabs, Form, Button } from "react-bootstrap";
import { getSalesForToday, getSalesFromDate } from "../../api";
import Graph from "./Graph";

export default function Sales() {
	const [err, setErr] = useState();
	const [totalRevenue, setTotalRevenue] = useState(0);
	const [drinksData, setDrinksData] = useState([]);
	const [mainCourseData, setMainCourseData] = useState([]);
	const [sideDishesData, setSideDishesData] = useState([]);
	const [dessertsData, setDessertsData] = useState([]);
	const [appetisersData, setAppetisersData] = useState([]);
	const [tabKey, setTabKey] = useState("Main Course");
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = "0" + dd;
	}
	if (mm < 10) {
		mm = "0" + mm;
	}
	today = yyyy + "-" + mm + "-" + dd;

	useEffect(() => {
		getSalesForToday()
			.then((res) => {
				setData(res.data);
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
	}, []);

	const submitDate = (e) => {
		e.preventDefault();
		const formData = e.target.elements;
		const date = new Date(formData.formDate.value);
		date.setHours(0, 0, 0, 0);
		const data = {
			date: date,
		};
		console.log(JSON.stringify(data));
		getSalesFromDate(data)
			.then((res) => {
				setData(res.data);
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

	const setData = (resData) => {
		let tempRevenue = 0;
		setAppetisersData([]);
		setMainCourseData([]);
		setSideDishesData([]);
		setDessertsData([]);
		setDrinksData([]);
		resData.forEach((data) => {
			tempRevenue += data.income;
			switch (data.type) {
				case "Appetisers":
					setAppetisersData((oldArr) => [...oldArr, data]);
					break;
				case "Main Course":
					console.log("hello");
					setMainCourseData((oldArr) => [...oldArr, data]);
					break;
				case "Side Dishes":
					setSideDishesData((oldArr) => [...oldArr, data]);
					break;
				case "Desserts":
					setDessertsData((oldArr) => [...oldArr, data]);
					break;
				case "Drinks":
					setDrinksData((oldArr) => [...oldArr, data]);
					break;
				default:
					console.log("What's this?");
			}
		});
		setTotalRevenue(tempRevenue);
	};

	return (
		<div>
			<h1 className="text-center">Sales</h1>
			<div className="text-center" hidden={!err}>
				<Alert variant="danger">
					<Alert.Heading>Oops!</Alert.Heading>
					<p> {err} </p>
				</Alert>
			</div>
			<Container>
				<Form inline onSubmit={submitDate}>
					<Form.Label htmlFor="formDate">
						Select a date (You will receive all the sales you did
						from that date up until now):
					</Form.Label>
					<Form.Control
						name="formDate"
						type="date"
						max={today}
						defaultValue={today}
						style={{ marginLeft: "10px" }}
					/>
					<Button type="submit" style={{ marginLeft: "10px" }}>
						Search
					</Button>
				</Form>
				<h2 style={{ marginTop: "2em" }}>
					Your Total Revenue For This Time Frame Is: {totalRevenue}{" "}
					EUR
				</h2>
				<Tabs activeKey={tabKey} onSelect={(k) => setTabKey(k)}>
					<Tab eventKey="Appetisers" title="Appetisers">
						{appetisersData.length === 0 ? (
							<p>Nothing to show here</p>
						) : (
							<Graph data={appetisersData} />
						)}
					</Tab>
					<Tab eventKey="Main Course" title="Main Course">
						{mainCourseData.length === 0 ? (
							<p>Nothing to show here</p>
						) : (
							<Graph data={mainCourseData} />
						)}
					</Tab>
					<Tab eventKey="Side Dishes" title="Side Dishes">
						{sideDishesData.length === 0 ? (
							<p>Nothing to show here</p>
						) : (
							<Graph data={sideDishesData} />
						)}
					</Tab>
					<Tab eventKey="Desserts" title="Desserts">
						{dessertsData.length === 0 ? (
							<p>Nothing to show here</p>
						) : (
							<Graph data={dessertsData} />
						)}
					</Tab>
					<Tab eventKey="Drinks" title="Drinks">
						{drinksData.length === 0 ? (
							<p>Nothing to show here</p>
						) : (
							<Graph data={drinksData} />
						)}
					</Tab>
				</Tabs>
			</Container>
		</div>
	);
}
