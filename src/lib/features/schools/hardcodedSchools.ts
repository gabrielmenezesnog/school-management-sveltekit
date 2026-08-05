import type { School } from '$lib/types/School';

export const HARDCODED_SCHOOLS: School[] = [
	{
		id: 'school-1',
		name: 'EMEF João XXIII',
		address: 'Rua das Flores, 234',
		neighborhood: 'Centro',
		city: 'São Paulo',
		phone: '(11) 3211-4500',
		email: 'joaoxxiii@edu.sp.gov.br',
		principal: 'Maria Aparecida Silva',
		type: 'municipal',
		status: 'active',
		createdAt: '2018-03-12'
	},
	{
		id: 'school-2',
		name: 'EMEF Paulo Freire',
		address: 'Av. das Palmeiras, 1089',
		neighborhood: 'Jardim América',
		city: 'São Paulo',
		phone: '(11) 3445-7800',
		email: 'paulofreire@edu.sp.gov.br',
		principal: 'Carlos Eduardo Santos',
		type: 'municipal',
		status: 'active',
		createdAt: '2015-08-22'
	},
	{
		id: 'school-3',
		name: 'EE Monteiro Lobato',
		address: 'Rua Ipê Amarelo, 56',
		neighborhood: 'Vila Nova',
		city: 'São Paulo',
		phone: '(11) 3987-1200',
		email: 'monteirol@educacao.sp.gov.br',
		principal: 'Ana Beatriz Oliveira',
		type: 'estadual',
		status: 'active',
		createdAt: '2010-01-15'
	},
	{
		id: 'school-4',
		name: 'EMEF Dom Pedro II',
		address: 'Praça da República, 780',
		neighborhood: 'República',
		city: 'São Paulo',
		phone: '(11) 3251-9900',
		email: 'dompedroi@edu.sp.gov.br',
		principal: 'Roberto Figueiredo Lima',
		type: 'municipal',
		status: 'active',
		createdAt: '2012-06-03'
	},
	{
		id: 'school-5',
		name: 'CEFET Santos Dumont',
		address: 'Av. Brigadeiro Faria Lima, 2300',
		neighborhood: 'Pinheiros',
		city: 'São Paulo',
		phone: '(11) 3816-2500',
		email: 'santosdumont@cefet.gov.br',
		principal: 'Fernanda Costa Marques',
		type: 'federal',
		status: 'active',
		createdAt: '2008-11-20'
	},
	{
		id: 'school-6',
		name: 'EE Cecília Meireles',
		address: 'Rua Vergueiro, 4120',
		neighborhood: 'Vila Mariana',
		city: 'São Paulo',
		phone: '(11) 5084-3300',
		email: 'ceciliame@educacao.sp.gov.br',
		principal: 'Luísa Fernandes Torres',
		type: 'estadual',
		status: 'inactive',
		createdAt: '2014-04-08'
	}
];

export const HARDCODED_CLASS_COUNT_BY_SCHOOL_ID: Record<string, number> = {
	'school-1': 4,
	'school-2': 3,
	'school-3': 5,
	'school-4': 2,
	'school-5': 6,
	'school-6': 1
};
