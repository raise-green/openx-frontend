import React from "react";
import "./TermsTable.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import SeeMore from "../../../../../UI/SeeMore/SeeMore";

const TermsTable = props => {
  let items = null;

	if (props.data) {
		items = props.data.map(item => {
			return (
				<tr key={item.index}>
					<td>
						<div className="text-with-icon"><SeeMore>{item.variable}</SeeMore></div>
					</td>
					<td>{item.value}</td>
					<td>{item.relevantParty}</td>
					<td>{item.note}</td>
					<td>
						<div className="terms-table-status">{item.status}</div>
					</td>
					<td>
						<span className="terms-doc-icon" />
					</td>
				</tr>
			);
		});
	}

  return (
    <div className="table-responsive">
      <table className="table terms-table">
        <thead className="thead-white" onClick={() => props.handleCollapse()}>
          <tr>
            <th scope="col">variable</th>
            <th scope="col">value</th>
            <th scope="col">relevant party</th>
            <th scope="col">note</th>
            <th scope="col">status</th>
            <th scope="col">support doc</th>
          </tr>
        </thead>
        <tbody className="tbody-white">{items}</tbody>
      </table>
    </div>
  );
};

export default TermsTable;
