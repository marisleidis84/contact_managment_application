import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Context } from "../store/appContext.js";

export const Contacts = props => {
	const [state, setState] = useState({
		showModal: false
	});

	const { store, actions } = useContext(Context);

	const sendupdater = async (e, id) => {
		e.preventDefault(e);
		await actions.getEdit(id);
	};

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.contactos !== null &&
							store.contactos.length > 0 &&
							store.contactos.map((valor, i) => {
								return (
									<ContactCard
										key={i}
										onDelete={() => setState({ showModal: true })}
										full_name={valor.full_name}
										address={valor.address}
										phone={valor.phone}
										email={valor.email}
										Edit={e => sendupdater(e, valor.id)}
									/>
								);
							})}

						<ContactCard
							onDelete={() => setState({ showModal: true })}
							fullname={"Mike Anamendolla"}
							address={"5489 Region Metropolitana"}
							phone={"+56 982 776 884"}
							email={"mike@gmail.com"}
						/>
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} onClose={() => setState({ showModal: false })} />
		</div>
	);
};
