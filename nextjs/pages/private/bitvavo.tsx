import { FlexBox, PageWrapper } from "../../styles/containers";
import Overview from "../../components/Bitvavo/Overview";
import Trades from "../../components/Bitvavo/Trades";
import { StdButton } from "../../styles/buttons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../state";
import { actions } from "../../state/actiontypes";
import PortfolioHistory from "../../components/Bitvavo/PortfolioHistory/PortfolioHistory";

const Bitvavo = () => {
  const page = useSelector((state: RootState) => state.bitvavo.page);
  const portfolio = useSelector((state: RootState) => state.bitvavo.portfolio);
  const snapshots = useSelector((state: RootState) => state.bitvavo.snapshots);
  const dispatch = useDispatch();

  const view =
    page == "overview" ? (
      <Overview portfolio={portfolio} />
    ) : page == "trades" ? (
      <Trades />
    ) : (
      <PortfolioHistory snapshots={snapshots} />
    );

  return (
    <PageWrapper maxWidth={1200}>
      <FlexBox gapSize={10}>
        {["overview", "history", "trades"].map((p) => (
          <StdButton
            onClick={() =>
              dispatch({ type: actions.SET_BITVAVO_PAGE, page: p })
            }
            active={page == p}
            size="small"
          >
            {p}
          </StdButton>
        ))}
      </FlexBox>
      {view}
    </PageWrapper>
  );
};

export default Bitvavo;
