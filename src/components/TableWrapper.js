import React from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

function TableWrapper({ header, body, action, handleClick }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {header.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.length > 0 &&
          body.map((element, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{element[header[1].toLowerCase()]}</td>
                <td>
                  {header[2].toLowerCase() === "description"
                    ? element.body.slice(0, 20)
                    : element[header[2].toLowerCase()]}
                </td>
                <td>
                  <Button
                    variant={action.variant}
                    onClick={() => handleClick(element.id)}
                  >
                    {action.title}
                  </Button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

export default TableWrapper;
