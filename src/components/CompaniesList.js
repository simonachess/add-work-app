import { Table } from "react-bootstrap";
import CompanyInfo from './CompanyInfo';
import * as servicesCompany from '../services/servicesCompany'

function CompaniesList(props) {

    const deleteCompanyHandler = (idCompany) => {
        servicesCompany.deleteCompany(idCompany);
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Company title</th>
                    <th>Head of Company</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {(props.companies.map((company, index) => {
                    return (
                        <CompanyInfo
                            key={index}
                            idCompany={company.idCompany}
                            title={company.title}
                            name={company.name}
                            address={company.address}
                            tel={company.tel}
                            email={company.email}
                            delete={deleteCompanyHandler} />)
                }))}
            </tbody>
        </Table>
    )
}

export default CompaniesList;