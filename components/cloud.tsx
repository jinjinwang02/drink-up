import React from "react";
import { Box } from "./box";

export interface IconProps {
  height?: number | string;
  width?: number | string;
}

const Cloud = ({ height = "100%", width = "100%" }: IconProps) => {
  return (
    <Box width={width} height={height}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 324.11 75.97"
        fill="#EDEDED" // lightest grey
      >
        <path
          d="M0,33.1c0,0,0.23-17.48,21.59-21.52s216.18-10.73,269.19-1.34s33.73,43.54,4.43,50.6
	s-139.75,8.17-191.84,6.51C51.28,65.69-0.61,63.48,0,33.1"
        />
      </svg>
    </Box>
  );
};

export { Cloud };
