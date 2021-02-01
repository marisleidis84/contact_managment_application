const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			contactos: null,
			edit: {}
		},

		actions: {
			//Aqui hacemos la funcion que se ejecuta en el form
			submitForm: (e, form) => {
				e.preventDefault();
				getActions().getAddContact(form);
				document.getElementById("full_name").value = "";
				document.getElementById("email").value = "";
				document.getElementById("phone").value = "";
				document.getElementById("address").value = "";
				alert("Contacto enviado");
			},
			//Aqui creamos los contactos mediante el metodo POST
			getAddContact: obj => {
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					body: JSON.stringify(obj),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.catch(error => console.error("Error:", error))
					.then(response => console.log("Success:", response));
			},
			//Aqui hacemos un get para agregar los contactos creados en la agenda y mostrarlos en la vista contact
			getContact: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/my_personal_agenda", {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(data => {
						setStore({
							contactos: [...data]
						});
					});
			},

			getEdit: id => {
				fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(data => {
						/* console.log(data); */
						setStore({
							edit: data
						});
					});
			},

			getUpdate: (e, obj) => {
				e.preventDefault();
				let id = getStore().edit.id;
				fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
					method: "PUT",
					body: JSON.stringify(obj),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.catch(error => console.error("Error:", error))
					.then(response => console.log("Success:", response));

				document.getElementById("full_name").value = "";
				document.getElementById("email").value = "";
				document.getElementById("phone").value = "";
				document.getElementById("address").value = "";

				document.getElementById("full_name").placeholder = "Full name";
				document.getElementById("email").placeholder = "Enter email";
				document.getElementById("phone").placeholder = "Enter phone";
				document.getElementById("address").placeholder = "Enter address";
				alert("Contacto editado");
			},

			getDelete: e => {
				e.preventDefault();
				let id = getStore().edit.id;
				fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.catch(error => console.error("Error:", error))
					.then(response => console.log("Success:", response));
			}
		}
	};
};

export default getState;
