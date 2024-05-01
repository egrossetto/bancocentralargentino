import { DatosVariables } from './types';

const api = {
	datosVariables: async (): Promise<DatosVariables[]> => {
		return fetch(
			'https://api.bcra.gob.ar/estadisticas/v1/principalesvariables'
		)
			.then((res) => res.json())
			.then((data) => {
				return data.results as DatosVariables[];
			});
	},
	estadisticas: async (
		variableId: number,
		startDate: string,
		endDate: string
	): Promise<any> => {
		return fetch(
			`https://api.bcra.gob.ar/estadisticas/v1/datosvariable/${variableId}/${startDate}/${endDate}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				return data;
			});
	},
};

export default api;
