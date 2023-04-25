// import companies from "../data/companies";
import Company from "./Company";

function Companies(props) {

    const allCompanies = props.companies
    return allCompanies ? allCompanies.map((c, i) => <Company key={i} value={c.title} title={c.title} />) : <></>
    // return companies.map(c => <Company key={c.code} value={c.title} title={c.title} />);
}

export default Companies;