import React from "react";
import { FlexBox } from "../../styles/containers";
import { HyperLink } from "../../styles/buttons";
import { TableCell } from "../../styles/table";
import Table from "../../components/Table";

const details = {
  Name: "Pieter Kemps",
  Birthday: "10-04-1984",
  Country: "The Netherlands",
  City: "Eindhoven",
  Email: "ppjk84@gmail.com",
  Github: "https://github.com/pjk84",
  Scope: "full stack",
  Languages: ["dutch", "english"],
};
const Basics = () => {
  return <Table details={details} />;
};

export default Basics;
