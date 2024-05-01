import api from '@/app/api';
import { Landing } from '@/components/component/landing';
import { DatosVariables } from './types';

export default async function Home() {
	const datosVariables: DatosVariables[] = await api.datosVariables();

	return <Landing datosVariables={datosVariables} />;
}
