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
};

export default api;
