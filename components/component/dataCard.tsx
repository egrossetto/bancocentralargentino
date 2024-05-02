import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export function DataCard({ data }: any) {
	return (
		<Card>
			<CardHeader>
				<CardDescription>{data.fecha}</CardDescription>
				<CardTitle>$ {data.valor}</CardTitle>
			</CardHeader>
		</Card>
	);
}
