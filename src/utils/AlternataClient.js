export class AlternataClient {

    static sendEmail(blob, fileName, recipient) {
		const formData = new FormData()
		formData.append("file", blob, `${fileName}.epub`)
		formData.append("recipient", recipient)

		return fetch("http://localhost:8080/send-email", {
			method: "POST",
			body: formData,
		})
		.then(response => {
			if(response.ok) {
				console.log("Plik wysłany pomyślnie")
			} else {
				console.error("Wystąpił błąd przy wysyłaniu: ", response.status)
			}
		})
		.catch(err => {
			console.error("Wystąpił błąd przy wysyłaniu: ", err)
		})
    }

}