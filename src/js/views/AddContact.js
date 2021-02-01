import React, { useContext, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
	const [addInputValue, setAddInputValue] = useState({
		full_name: "",
		email: "",
		agenda_slug: "my_personal_agenda",
		address: "",
		phone: ""
	});

	const { store, actions } = useContext(Context);

	const inputValue = e => {
		setAddInputValue({
			...addInputValue,
			[e.target.name]: e.target.value
		});
	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form onSubmit={e => actions.submitForm(e, addInputValue)}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							id="full_name"
							className="form-control"
							name="full_name"
							placeholder="Full name"
							onChange={inputValue}
							required
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							id="email"
							className="form-control"
							name="email"
							placeholder="Enter email"
							onChange={inputValue}
							required
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							id="phone"
							className="form-control"
							name="phone"
							placeholder="Enter phone"
							onChange={inputValue}
							required
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							id="address"
							className="form-control"
							name="address"
							placeholder="Enter address"
							onChange={inputValue}
							required
						/>
					</div>
					<button type="submit" className="btn btn-primary form-control">
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
