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
			},
			//Aqui creamos los contactos mediante el metodo POST
			getAddContact: obj => {
				console.log(JSON.stringify(obj));
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
						"Content-Type": "aplication/json"
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
						"Content-Type": "aplication/json"
					}
				})
					.then(res => res.json())
					.then(data => {
						/* console.log(data); */
						setStore({
							edit: data
						});
					});
			}
		}
	};
};

export default getState;
