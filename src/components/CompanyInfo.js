import React from "react";


function CompanyInfo(props) {

    const getIDCompanyhandler = () => {
        props.delete(props.idCompany)
    }


    return (
        <tr>
            <td>aa{props.title}</td>
            <td>aa{props.name}</td>
            <td>aa{props.address}</td>
            <td><a href="#/" onClick={getIDCompanyhandler}>Delete</a></td>
        </tr>
    )
}

export default CompanyInfo