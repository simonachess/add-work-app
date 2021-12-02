import companies from "../data/companies";
import Company from "./Company";

function Companies() {
    return companies.map(c => <Company key={c.code} value={c.code} title={c.title} />);
}

export default Companies;