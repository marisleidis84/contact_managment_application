const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			contactos: null
		},

		actions: {
			submitForm: (e, form) => {
				e.preventDefault();
				getActions().getPost(form);
			},

			getPost: obj => {
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

			getContact: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/my_personal_agenda", {
					method: "GET",
					headers: {
						"Content-Type": "aplication/json"
					}
				})
					.then(res => res.json())
					.then(data => {
						console.log(data);
						setStore({
							contactos: [...data]
						});
					});
			}
		}
	};
};

export default getState;
