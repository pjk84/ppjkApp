import React from "react";
import { HyperLink } from "../styles/buttons";
import { FlexBox } from "../styles/containers";
import { TableCell, Table } from "../styles/table";
import { useSelector } from "react-redux";

const withIcon = ["languages", "frameworks_and_tools", "database", "hosting"];

const T = ({ details }) => {
  const id = details.id;
  const theme = useSelector((state) => state.main.theme);
  const exclude = ["id", "title", "demo", "image"];

  function isURL(str) {
    // Regular expression for a basic URL pattern
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(str);
  }

  const getTable = (d, i) => {
    var animation = theme == "dark" ? "jitter" : null;
    return (
      <tr key={`section-row-jitter-${id}-${i}`}>
        <TableCell
          key={`tablecell-left-${id}-${i}`}
          index={i}
          animation={animation}
          style={{
            width: "25%",
          }}
        >
          {d.replace(/_/g, " ")}
        </TableCell>
        <TableCell
          key={`tablecell-right-${id}-${i}`}
          index={i}
          animation={animation}
        >
          {isURL(details[d]) ? (
            <HyperLink target="_blank" href={details[d]}>
              click here
            </HyperLink>
          ) : withIcon.includes(d) ? (
            details[d].map((language) => (
              <img
                alt=""
                key={`language-icon-${language}`}
                style={{ marginRight: 10 }}
                width="50px"
                title={language}
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${language
                  .toLowerCase()
                  .trim()}/${language.toLowerCase().trim()}-original.svg`}
              />
            ))
          ) : typeof details[d] === "object" ? (
            details[d].join(", ")
          ) : (
            details[d]
          )}
        </TableCell>
      </tr>
    );
  };

  return (
    <Table key={`table-${id}`} style={{ fontSize: 18 }}>
      <tbody>
        {Object.keys(details)
          .filter((d) => !exclude.includes(d))
          .map((d, i) => getTable(d, i))}
      </tbody>
    </Table>
  );
};

export default T;
