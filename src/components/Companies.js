// import companies from "../data/companies";
import Company from "./Company";

function Companies(props) {
    console.log('Companies failas props.companies', props.companies)
    const allCompanies = props.companies;
    return allCompanies ? allCompanies.map(c => <Company key={c.title} value={c.title} title={c.title} />) : <></>;
    // return companies.map(c => <Company key={c.code} value={c.title} title={c.title} />);
}

export default Companies;