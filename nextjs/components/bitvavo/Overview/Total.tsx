import { TableCell } from "../../../styles/table";

type Props = {
  totalResult?: number;
  totalReturnOnInvestment?: number;
  totalSpent?: number;
  totalValue?: number;
  index: number;
};

const Total = (props: Props) => {
  const totalRoi = props?.totalResult ?? 0;
  const index = props.index ?? 0;
  return (
    <tr>
      <TableCell index={index}>TOTAL</TableCell>
      <TableCell index={index}></TableCell>
      <TableCell index={index}></TableCell>
      <TableCell index={index}></TableCell>
      <TableCell index={index}></TableCell>
      <TableCell index={index}>{props?.totalValue}</TableCell>
      <TableCell index={index}>{props?.totalSpent}</TableCell>
      <TableCell index={index}>{totalRoi}</TableCell>
      <TableCell
        color={totalRoi > 0 ? "green" : totalRoi < 0 ? "red" : ""}
        index={index}
      >
        {`${props?.totalReturnOnInvestment} %`}
      </TableCell>
    </tr>
  );
};

export default Total;
