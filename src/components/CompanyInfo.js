import React from "react";


function CompanyInfo(props) {

    const getIDCompanyhandler = () => {
        props.delete(props.idCompany)
    }


    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.name}</td>
            <td>{props.address}</td>
            <td>{props.email}</td>
            <td>{props.tel}</td>
            <td><a href="#/" onClick={getIDCompanyhandler}>Delete</a></td>
        </tr>
    )
}

export default CompanyInfo