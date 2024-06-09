import { FlexBox, PageWrapper } from "../../styles/containers";
import Overview from "./Overview/Overview";
import Trades from "./Trades/Trades";
import { StdButton } from "../../styles/buttons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../state";
import { actions } from "../../state/actiontypes";
import PortfolioHistory from "../../components/Bitvavo/PortfolioHistory/PortfolioHistory";
import { random } from "lodash";

const Bitvavo = () => {
  const page = useSelector((state: RootState) => state.bitvavo.page);
  const portfolio = useSelector((state: RootState) => state.bitvavo.portfolio);
  const snapshots = useSelector((state: RootState) => state.bitvavo.snapshots);
  const dispatch = useDispatch();

  const view =
    page == "balance" ? (
      <Overview portfolio={portfolio} />
    ) : page == "trades" ? (
      <Trades />
    ) : page == "history" ? (
      <PortfolioHistory snapshots={snapshots} />
    ) : null;

  const setPage = (page: string) => {
    dispatch({ type: actions.SET_BITVAVO_PAGE, page });
  };

  const buttons = (
    <FlexBox justify={page ? undefined : "center"} gapSize={10}>
      {["balance", "history", "trades"].map((p) => (
        <StdButton
          key={p}
          onClick={() => setPage(p)}
          active={page == p}
          size={page ? "small" : "large"}
        >
          {p}
        </StdButton>
      ))}
    </FlexBox>
  );

  return (
    <PageWrapper maxWidth={1200}>
      {buttons}
      {view}
    </PageWrapper>
  );
};

export default Bitvavo;
