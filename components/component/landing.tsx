'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	PopoverTrigger,
	PopoverContent,
	Popover,
} from '@/components/ui/popover';
import {
	CommandInput,
	CommandEmpty,
	CommandItem,
	CommandGroup,
	Command,
	CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { DatosVariables } from '@/app/types';
import api from '@/app/api';

type Props = {
	datosVariables: DatosVariables[];
};

export function Landing({ datosVariables }: Props) {
	const [open, setOpen] = useState(false);
	const [selectedVariable, setSelectedVariable] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log('Submitting', selectedVariable, startDate, endDate);
		let idVariable = datosVariables.find(
			(dato) => dato.descripcion === selectedVariable
		)?.idVariable;
		if (!idVariable) {
			return;
		}
		const response = await api.estadisticas(idVariable, startDate, endDate);
		console.log(response); // Process the response data as needed
	};
	return (
		<main className="flex flex-col items-center justify-center w-full h-full min-h-[100dvh] bg-gray-100 dark:bg-gray-900 px-4 md:px-6">
			<div className="max-w-3xl space-y-4 text-center">
				<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
					Banco Central Argentino
				</h1>
				<p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl">
					Conoce la nueva API del Banco Central Argentino.
				</p>
			</div>
			<div className="w-1/2 max-w-xxl mt-8">
				<form
					className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4"
					onSubmit={handleSubmit}
				>
					<div>
						<label
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
							htmlFor="indicator"
						>
							Datos variables
						</label>
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<Button
									className="w-full justify-between"
									role="combobox"
									variant="outline"
								>
									{selectedVariable != ''
										? datosVariables.find(
												(dato) =>
													dato.descripcion ===
													selectedVariable
										  )?.descripcion
										: 'Seleccionar datos variables...'}
									<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-full p-0">
								<Command>
									<CommandInput
										className="h-9"
										placeholder="Buscar datos variables..."
									/>
									{datosVariables &&
									datosVariables.length > 0 ? (
										<CommandGroup>
											<CommandList>
												{datosVariables.map(
													(
														datosVariable: DatosVariables
													) => (
														<CommandItem
															key={
																datosVariable.idVariable
															}
															value={
																datosVariable.descripcion
															}
															onSelect={(
																currentValue
															) => {
																setSelectedVariable(
																	currentValue ===
																		selectedVariable
																		? ''
																		: currentValue
																);
																setOpen(false);
															}}
														>
															{
																datosVariable.descripcion
															}
														</CommandItem>
													)
												)}
											</CommandList>
										</CommandGroup>
									) : (
										<CommandEmpty>
											No hay datos variables encontrados.
										</CommandEmpty>
									)}
								</Command>
							</PopoverContent>
						</Popover>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label
								className="block text-sm font-medium text-gray-700 dark:text-gray-300"
								htmlFor="start-date"
							>
								Desde
							</label>
							<Input
								id="start-date"
								type="date"
								onChange={(e) => setStartDate(e.target.value)}
							/>
						</div>
						<div>
							<label
								className="block text-sm font-medium text-gray-700 dark:text-gray-300"
								htmlFor="end-date"
							>
								Hasta
							</label>
							<Input
								id="end-date"
								type="date"
								onChange={(e) => setEndDate(e.target.value)}
							/>
						</div>
					</div>
					<Button className="w-full" type="submit">
						Buscar datos
					</Button>
				</form>
			</div>
			<div className="w-1/2 max-w-xxl mt-8">
				<div className="flex flex-col items-center justify-center">
					Test
				</div>
			</div>
		</main>
	);
}

function ChevronsUpDownIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m7 15 5 5 5-5" />
			<path d="m7 9 5-5 5 5" />
		</svg>
	);
}
