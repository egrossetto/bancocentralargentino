'use server';

export async function estadisticas(
	variableId: number,
	startDate: string,
	endDate: string
) {
	return fetch(
		`https://api.bcra.gob.ar/estadisticas/v1/datosvariable/${variableId}/${startDate}/${endDate}`
	)
		.then((response) => {
			if (!response.ok) {
				return response.json().then((errorData) => {
					return {
						statusCode: response.status,
						errorMessage: errorData.error || 'An error occurred',
					};
				});
			}
			return response.json();
		})
		.then((data) => {
			return data;
		})
		.catch((err) => {
			return err;
		});
}
