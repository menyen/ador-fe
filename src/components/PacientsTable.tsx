import { PatientTableColumn, PatientTableData } from '../interfaces';
import GenericTable from './GenericTable';

const columns: PatientTableColumn[] = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  { id: 'email', label: 'E-mail', minWidth: 100 },
  {
    id: 'cpf',
    label: 'CPF',
    minWidth: 170,
    format: (value: number) =>
      value
        .toString()
        .padStart(11, '0')
        .replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          (regex, arg1, arg2, arg3, arg4) =>
            arg1 + '.' + arg2 + '.' + arg3 + '-' + arg4
        ),
  },
  {
    id: 'lastQnaireDate',
    label: 'Data do último questionário',
    minWidth: 170,
    format: (value: number) => {
      const dateFormat = new Date(value);
      return (
        dateFormat.getDate() +
        '/' +
        (dateFormat.getMonth() + 1) +
        '/' +
        dateFormat.getFullYear()
      );
    },
  },
];

function createData(
  name: string,
  email: string,
  cpf: number,
  lastQnaireDate: number
): PatientTableData {
  return { name, email, cpf, lastQnaireDate };
}

const rows = [
  createData('André Silva', 'aaa@ddd.com', 1324171354, 1580266800000),
  createData('José da Cunha', 'aaa@ddd.com', 1403500365, 1580256000000),
  createData('Bruno', 'aaa@ddd.com', 60483973, 1580266800000),
  createData('Alice in Chains', 'aaa@ddd.com', 327167434, 1580256000000),
  createData('Eduardo Cabral', 'aaa@ddd.com', 37602103, 1580256000000),
  createData('Victor Camejo', 'aaa@ddd.com', 25475400, 1580266800000),
  createData('Josefina', 'aaa@ddd.com', 83019200, 1580266800000),
  createData('Luana Amaral', 'aaa@ddd.com', 4857000, 1580266800000),
  createData('Simone Souza', 'aaa@ddd.com', 126577691, 1580256000000),
  createData('Bia Novaes', 'aaa@ddd.com', 126317000, 1580266800000),
  createData('João Camilo', 'aaa@ddd.com', 67022000, 1580266800000),
  createData('Julia Hitaki', 'aaa@ddd.com', 67545757, 1580266800000),
  createData('Claudia Paes', 'aaa@ddd.com', 146793744, 1580256000000),
  createData('Tulio Pazos', 'aaa@ddd.com', 200962417, 1580256000000),
  createData('Saulo Silva', 'aaa@ddd.com', 210147125, 1580266800000),
];

export default function PacientsTable() {
  return <GenericTable columns={columns} rows={rows} />;
}
