import React from 'react';
import { Box } from './box/box';
import { TitleWithUnderline } from './title-with-underline';
import { Typography } from './typography';

interface PageTitleWithBodyProps {
  title: string;
  body?: string;
}

const PageTitleWithBody: React.FC<PageTitleWithBodyProps> = ({
  title,
  body,
}: PageTitleWithBodyProps) => (
  <Box width="100%" flexDirection="column" mt={['one', 'zero']} mb="three">
    <Box alignSelf={['center', 'center', 'flex-start']}>
      <TitleWithUnderline>{title}</TitleWithUnderline>
    </Box>
    <Box
      alignSelf={['center', 'center', 'flex-end']}
      mt="four"
      mx={['three', 'zero']}
    >
      <Typography textStyle="bodyL" textAlign={['center', 'right']}>
        {body}
      </Typography>
    </Box>
  </Box>
);

export { PageTitleWithBody };
