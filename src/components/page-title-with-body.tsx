import React from 'react';
import { Box } from './box/box';
import { TitleWithUnderline } from './title-with-underline';
import { Typography } from './typography';

interface PageTitleWithBodyProps {
  title: string;
  body?: string;
  centered?: boolean;
}

const PageTitleWithBody: React.FC<PageTitleWithBodyProps> = ({
  title,
  body,
  centered,
}: PageTitleWithBodyProps) => (
  <Box width="100%" flexDirection="column" mt={['one', 'zero']}>
    <Box alignSelf={['center', 'center', centered ? 'center' : 'flex-start']}>
      <TitleWithUnderline>{title}</TitleWithUnderline>
    </Box>
    <Box
      alignSelf={['center', 'center', centered ? 'center' : 'flex-end']}
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
