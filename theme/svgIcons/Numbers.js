/* @flow */
import React from 'react';

type Props = {
  number: string
};

const Numbers = (props: Props) => {
  const { number } = props;
  return (
    <svg
      width="52px"
      height="52px"
      viewBox="0 0 52 52"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <circle id="path-1" cx="20" cy="20" r="20" />
        <filter
          x="-25.0%"
          y="-20.0%"
          width="150.0%"
          height="150.0%"
          filterUnits="objectBoundingBox"
          id="filter-2"
        >
          <feOffset
            dx="0"
            dy="2"
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            stdDeviation="3"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feComposite
            in="shadowBlurOuter1"
            in2="SourceAlpha"
            operator="out"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0.772268282   0 0 0 0 0.772268282   0 0 0 0 0.772268282  0 0 0 0.5 0"
            type="matrix"
            in="shadowBlurOuter1"
          />
        </filter>
      </defs>
      <g
        id="02.01-M-Confirmation-Page---BOPUS-/-STH"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        transform="translate(-26.000000, -1912.000000)"
      >
        <g id="Barcode" transform="translate(16.000000, 1553.000000)">
          <g id="Group-9" transform="translate(16.000000, 327.000000)">
            <g id="Number" transform="translate(0.000000, 36.000000)">
              <g id="Oval-2">
                <use fill="black" fillOpacity="1" filter="url(#filter-2)" />
                <use fill="#FFFFFF" fillRule="evenodd" />
                <circle
                  stroke="#F38021"
                  strokeWidth="3"
                  cx="20"
                  cy="20"
                  r="18.5"
                />
              </g>
              <text
                id={number}
                fontFamily="AutoZoneCondensedMedium, AutoZone Condensed"
                fontSize="18"
                fontStyle="condensed"
                fontWeight="400"
                line-spacing="24"
                letterSpacing="1.43999994"
                fill="#F38021"
              >
                <tspan x="11.4545455" y="25">
                  {number}
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
export default Numbers;
