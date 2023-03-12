import React from "react";
import { FlexBox } from "../../styles/containers";
import { HyperLink } from "../../styles/buttons";

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
  return (
    <FlexBox gapSize={50} column>
      <FlexBox gapSize="small" column>
        {Object.keys(details).map((d) => {
          let v = details[d as keyof typeof details];

          if (typeof v === "object") {
            v = v.join();
          }
          return (
            <FlexBox key={`about_${d}`} gapSize="medium">
              <div
                key={`about_left_${d}`}
                style={{
                  animation: `${Math.random()}s slideInRight`,
                  opacity: 0.8,
                }}
              >
                {`${d.replace(/_/g, " ")}`}:
              </div>
              <div
                key={`about_right_${d}`}
                style={{
                  animation: `${Math.random()}s slideInLeft`,
                }}
              >
                {v.includes("http") ? (
                  <HyperLink href={`${v}`}>{`"${v}",`}</HyperLink>
                ) : (
                  v
                )}
              </div>
            </FlexBox>
          );
        })}
      </FlexBox>
    </FlexBox>
  );
};

export default Basics;
