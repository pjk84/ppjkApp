import React from "react";
import { HyperLink } from "../styles/buttons";
import { FlexBox } from "../styles/containers";
import { TableCell, Table } from "../styles/table";

const T = ({ details, animation }) => {
  const exclude = ["id", "title", "demo"];
  {
  }
  const getSliding = (d, i) => {
    const key = d.replaceAll("_", " ");
    return (
      <tr
        key={`section-row-slide-${d}-${i}`}
        style={{
          position: "relative",
          animation: `0.${i + 1}s slideOverRight ease-in`,
        }}
      >
        <TableCell
          key={`tablecell-left-${i}`}
          index={i}
          style={{ padding: 5, width: "25%" }}
        >
          {key}
        </TableCell>
        <TableCell key={`tablecell-right-${i}`} index={i}>
          {d === "repo" ? (
            <HyperLink href={details[d]}>click here</HyperLink>
          ) : d === "languages" ? (
            details[d].map((language) => (
              <img
                key={`language-icon-${language}`}
                style={{ marginRight: 10 }}
                width="50px"
                title={language}
                src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${language
                  .toLowerCase()
                  .trim()}/${language.toLowerCase().trim()}-original.svg`}
              />
            ))
          ) : (
            details[d]
          )}
        </TableCell>
      </tr>
    );
  };

  const getJitterIn = (d, i) => {
    return (
      <tr key={`section-row-jitter-${d}-${i}`}>
        <TableCell
          index={i}
          style={{
            width: "25%",
            animation: `0.${Math.random() + 7}s jitterIn ease-out`,
          }}
        >
          {d.replace(/_/g, " ")}
        </TableCell>
        <TableCell
          index={i}
          style={{
            animation: `0.${Math.random() + 7}s jitterIn ease-out`,
          }}
        >
          {d === "repo" ? (
            <HyperLink href={details[d]}>click here</HyperLink>
          ) : (
            details[d]
          )}
        </TableCell>
      </tr>
    );
  };

  return (
    <Table style={{ width: "100%", fontSize: 18, wordBreak: "break-all" }}>
      <tbody>
        {Object.keys(details).map(
          (d, i) =>
            !exclude.includes(d) &&
            (animation === "slide"
              ? getSliding(d, i)
              : animation === "jitter"
              ? getJitterIn(d, i)
              : null)
        )}
      </tbody>
    </Table>
  );
};

export default T;
