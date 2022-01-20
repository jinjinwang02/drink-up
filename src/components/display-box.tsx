import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import { useSpring } from 'react-spring';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { CollectionFromDB } from '../interfaces';
import { getWateringCountdown } from '../utils';
import { AnimatedBox } from './box/animatedBox';
import { Box } from './box/box';
import { BoxWithImage } from './box/box-with-image';
import { AddButton } from './button/add-button';
import { WaterButton } from './button/water-button';
import { DATE_DISPLAY_FORMAT } from './calendar';
import { Water } from './icon/water';
import { Typography } from './typography';

const BOX_WIDTH = 272;

export interface DisplayBoxProps extends CollectionFromDB {
  onClickWatered: () => void;
  isSubmitting?: boolean;
}

interface ContentProps extends DisplayBoxProps {
  countDown: number;
}

const TitleBox = ({ commonName }: { commonName: string }) => (
  <Box borderBottom="regularBlack" py="zeroPointEight" width="100%">
    <Typography textAlign="center" textStyle="copyLBold">
      {commonName}
    </Typography>
  </Box>
);

const ScheduleAndNoteBox = ({
  schedule,
  notes,
}: {
  schedule: string;
  notes?: string;
}) => (
  <Box
    borderBottom="regularBlack"
    width="100%"
    flexDirection="column"
    py="zeroPointEight"
    px="two"
    overflow="hidden"
  >
    <Box pr="zeroPointTwo">
      <Box pr="zeroPointEight">
        <Water />
      </Box>
      <Typography textStyle="bodyM">
        Every {schedule} day{parseInt(schedule, 10) > 1 ? 's' : ''}
      </Typography>
    </Box>
    <Box pb="zeroPointTwo" flexWrap="wrap">
      <Typography pt="zeroPointSix" textStyle="bodyM" pr="zeroPointSix">
        My note:
      </Typography>
      <Typography pt="zeroPointSix" textStyle="bodyMBold" textAlign="center">
        {notes ? notes : 'none'}
      </Typography>
    </Box>
  </Box>
);

const LastWateredOnBox = ({ lastWateredOn }: { lastWateredOn: string }) => (
  <Box borderBottom="regularBlack" width="100%" pt="zeroPointEight" pb="one">
    <Typography textStyle="bodyM" pr="zeroPointFive">
      Last watered on
    </Typography>
    <Typography textStyle="bodyMBold">{lastWateredOn}</Typography>
  </Box>
);

const NextWateringDateBox = ({ countDown }: { countDown: number }) => (
  <Box borderBottom="regularBlack" width="100%" pt="zeroPointSix" pb="one">
    <Typography textStyle="bodyM" pr="zeroPointFive">
      Next watering date is
    </Typography>
    {countDown === 1 ? (
      <Typography textStyle="bodyMBold">Today!</Typography>
    ) : (
      <>
        <Typography
          textStyle="bodyMBold"
          pr="zeroPointFour"
          color={countDown < 0 ? 'warningRed' : 'pureBlack'}
        >
          {countDown > 1 ? countDown : -countDown}
        </Typography>
        <Typography textStyle="bodyM">
          days {countDown > 1 ? 'away' : 'ago'}
        </Typography>
      </>
    )}
  </Box>
);

const SubmitBox = ({
  isWateredToday,
  onClickWatered,
  isSubmitting,
}: {
  isWateredToday: boolean;
  onClickWatered: () => void;
  isSubmitting?: boolean;
}) => (
  <Box pt="zeroPointEight" pb="zeroPointSix" alignItems="center">
    <WaterButton
      pr="one"
      pb="zeroPointFour"
      isChecked={isWateredToday}
      onClick={onClickWatered}
      isSubmitting={isSubmitting}
    />
    <Typography textStyle="copyLBold">I watered it today</Typography>
  </Box>
);

const Content = ({
  commonName,
  lastWateredOn,
  schedule,
  notes,
  isSubmitting,
  countDown,
  onClickWatered,
}: ContentProps) => {
  const isWateredToday = lastWateredOn === dayjs().format(DATE_DISPLAY_FORMAT);
  return (
    <Box flexDirection="column" width="100%">
      <TitleBox commonName={commonName} />
      <ScheduleAndNoteBox schedule={schedule} notes={notes} />
      <LastWateredOnBox lastWateredOn={lastWateredOn} />
      <NextWateringDateBox countDown={countDown} />
      <SubmitBox
        isSubmitting={isSubmitting}
        isWateredToday={isWateredToday}
        onClickWatered={onClickWatered}
      />
    </Box>
  );
};

const DisplayBox: React.FC<DisplayBoxProps> = ({
  id,
  imageUrl,
  commonName,
  lastWateredOn,
  schedule,
  notes,
  isSubmitting,
  onClickWatered,
}: DisplayBoxProps) => {
  const { isMD } = useMediaQuery();
  const fadeInProps = useSpring({
    from: { opacity: 0, x: -30 },
    to: { opacity: 1, x: 0 },
    delay: isMD ? 0 : 800,
  });
  const countDown = getWateringCountdown(lastWateredOn, schedule);

  return (
    <AnimatedBox style={fadeInProps}>
      <BoxWithImage
        id={id}
        width={BOX_WIDTH}
        topBoxHeight={BOX_WIDTH}
        imageUrl={imageUrl}
        alt={commonName}
        topRightAccessory={
          countDown < 0 ? (
            <Box
              position="absolute"
              top={10}
              right={10}
              zIndex={1}
              border="thickWarningRed"
              height="25px"
              width="25px"
              borderRadius="25px"
            >
              <Typography color="warningRed" textStyle="bodyXLBold">
                !
              </Typography>
            </Box>
          ) : null
        }
        bottomAccessory={
          <Content
            id={id}
            commonName={commonName}
            schedule={schedule}
            lastWateredOn={lastWateredOn}
            notes={notes}
            isSubmitting={isSubmitting}
            countDown={countDown}
            onClickWatered={onClickWatered}
          />
        }
      />
    </AnimatedBox>
  );
};

const EmptyDisplayBox: React.FC = () => {
  const router = useRouter();
  const { isMD } = useMediaQuery();
  const fadeInProps = useSpring({
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
    delay: isMD ? 0 : 900,
  });
  return (
    <AnimatedBox style={fadeInProps}>
      <BoxWithImage
        width={BOX_WIDTH}
        topBoxHeight={BOX_WIDTH}
        bottomAccessory={
          <Box py="zeroPointEight" width="100%">
            <Typography textAlign="center" textStyle="copyLBold" pl="four">
              Your first plant
            </Typography>
            <AddButton
              onClick={() => router.push('/find-your-plants')}
              size="sm"
              ml="one"
              pr="two"
              mb="zeroPointTwo"
            />
          </Box>
        }
      />
    </AnimatedBox>
  );
};

export { DisplayBox, EmptyDisplayBox };
