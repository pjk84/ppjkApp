import { FlexBox } from "../../../styles/containers";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../state/actiontypes";
import apiClient from "../../../api/client";
import Loader from "../../Loaders";
import BarChartVertical from "./Chart";
import { Control, StdButton } from "../../../styles/buttons";
import { Header1 } from "../../../styles/header";

type Props = {
  snapshots?: PortfolioSnapshot[];
};
const PortfolioHistory = ({ snapshots }: Props) => {
  const [cursor, setCursor] = useState<number>(0);
  const [market, selectMarket] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!snapshots) {
      // get portfolio
      getSnapshots();
    }
  });

  var getSnapshots = async () => {
    apiClient()
      .get<PortfolioSnapshot[]>("/bitvavo/snapshots")
      .then((res: any) => {
        dispatch({
          type: actions.SET_BITVAVO_SNAPSHOTS,
          snapshots: res,
        });
        if (res?.length) {
          setCursor(res.length - 1);
        }
      });
  };

  if (!snapshots) {
    return (
      <FlexBox justify="center">
        <Loader text="loading history..." type="round" />
      </FlexBox>
    );
  }

  const month = snapshots[cursor];

  const markets = (
    <FlexBox gapSize={10}>
      {month.days[0].assets.map((a) => (
        <StdButton
          active={market == a.market}
          onClick={() => selectMarket(market ? null : a.market)}
          size="tiny"
        >
          {a.market}
        </StdButton>
      ))}
    </FlexBox>
  );

  return (
    <FlexBox column align="center" gapSize={50}>
      <Header1>
        <FlexBox gapSize={10}>
          {month.monthName}
          <div>{month.year}</div>
        </FlexBox>
      </Header1>
      {markets}
      <BarChartVertical
        market="all"
        days={month.days.map((d) => {
          return {
            day: d.day,
            value: market
              ? d.assets.find((a) => a.market == market)?.value || 0
              : d.total,
          };
        })}
      />
      <FlexBox gapSize={10}>
        <Control onClick={() => setCursor(Math.max(cursor - 1, 0))}>
          previous
        </Control>
        <Control
          onClick={() => setCursor(Math.min(cursor + 1, snapshots.length - 1))}
        >
          next
        </Control>
      </FlexBox>
    </FlexBox>
  );
};

export default PortfolioHistory;
