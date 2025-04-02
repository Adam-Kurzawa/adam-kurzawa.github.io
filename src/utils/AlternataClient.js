export class AlternataClient {

    static sendEmail(blob, fileName, recipient, altchaToken) {
		const formData = new FormData()
		formData.append("file", blob, `${fileName}.epub`)
		formData.append("recipient", recipient)

		return fetch("http://localhost:8080/send-email", {
			method: "POST",
			body: formData,
			headers: {
				'X-Altcha-Token': altchaToken,
				'X-Api-Key': import.meta.env.VITE_ALTERNATA_API_KEY
			}
		})
		.catch(err => {
			console.error("Wystąpił błąd przy wysyłaniu: ", err)
			return Promise.reject("Client error")
		})
		.then(response => {
			if(response.ok) {
				console.log("Plik wysłany pomyślnie")
				return Promise.resolve()
			} else {
				console.error("Wystąpił błąd przy wysyłaniu: ", response.status)
				return Promise.reject("Wrong HTTP response")
			}
		})
    }

	static addComment(newComment, altchaToken) {
		return fetch('http://localhost:8080/add-comment', {
			method: "POST",
			body: JSON.stringify(newComment),
			headers: {
				'Content-Type': 'application/json',
				'X-Altcha-Token': altchaToken,
				'X-Api-Key': import.meta.env.VITE_ALTERNATA_API_KEY
			}
		})
		.catch(err => {
			console.error("Wystąpił błąd przy wysyłaniu: ", err)
			return Promise.reject("Client error")
		})
		.then(response => {
			if(response.ok) {
				console.log("Komentarz dodany pomyślnie")
				return Promise.resolve()
			} else {
				console.error("Wystąpił błąd przy wysyłaniu: ", response.status)
				return Promise.reject("Wrong HTTP response")
			}
		})
	}

}