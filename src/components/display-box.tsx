import dayjs from 'dayjs';
import React, { useEffect, useRef } from 'react';
import { TweenLite, Power3 } from 'gsap';
import { CollectionFromDB } from '../interfaces';
import { getWateringCountdown } from '../utils';
import { Box } from './box/box';
import { BoxWithImage } from './box/box-with-image';
import { CircleButton } from './button/circle-button';
import { EditButton } from './button/edit-button';
import { DATE_DISPLAY_FORMAT } from './calendar';
import { Water } from './icon/water';
import { Typography } from './typography';

const BOX_WIDTH = 272;

export interface DisplayBoxProps extends CollectionFromDB {
  onClickWatered: () => void;
}

const TitleBox = ({ commonName }: { commonName: string }) => (
  <Box borderBottom="regularBlack" py="zeroPointEight" width="100%" pl="four">
    <Typography textAlign="center" textStyle="copyLBold">
      {commonName}
    </Typography>
    <EditButton ml="one" pr="two" mb="zeroPointThree" />
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
      <Box pr="zeroPointSix">
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
    <Typography textStyle="bodyM" pr="zeroPointSix">
      Last watered on
    </Typography>
    <Typography textStyle="bodyMBold">{lastWateredOn}</Typography>
  </Box>
);

const NextWateringDateBox = ({ countDown }: { countDown: number }) => (
  <Box borderBottom="regularBlack" width="100%" pt="zeroPointSix" pb="one">
    <Typography textStyle="bodyM" pr="zeroPointSix">
      Next watering date is
    </Typography>
    {countDown === 0 ? (
      <Typography textStyle="bodyMBold">Today!</Typography>
    ) : (
      <>
        <Typography textStyle="bodyMBold" pr="zeroPointSix">
          {countDown > 0 ? countDown : -countDown}
        </Typography>
        <Typography textStyle="bodyM">
          days {countDown > 0 ? 'away' : 'ago'}
        </Typography>
      </>
    )}
  </Box>
);

const SubmitBox = ({
  isWateredToday,
  onClickWatered,
}: {
  isWateredToday: boolean;
  onClickWatered: () => void;
}) => (
  <Box pt="zeroPointEight" pb="zeroPointSix" alignItems="center">
    <CircleButton
      pr="one"
      pb="zeroPointFour"
      checked={isWateredToday}
      onClick={onClickWatered}
    />
    <Typography textStyle="copyLBold">I watered it today</Typography>
  </Box>
);

const Content = ({
  commonName,
  lastWateredOn,
  schedule,
  notes,
  onClickWatered,
}: DisplayBoxProps) => {
  const countDown = getWateringCountdown(lastWateredOn, schedule);
  const isWateredToday = lastWateredOn === dayjs().format(DATE_DISPLAY_FORMAT);
  return (
    <Box flexDirection="column" width="100%">
      <TitleBox commonName={commonName} />
      <ScheduleAndNoteBox schedule={schedule} notes={notes} />
      <LastWateredOnBox lastWateredOn={lastWateredOn} />
      <NextWateringDateBox countDown={countDown} />
      <SubmitBox
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
  onClickWatered,
}: DisplayBoxProps) => {
  const displayBox = useRef(null);
  useEffect(() => {
    TweenLite.to(displayBox.current, 0.8, {
      opacity: 1,
      y: -20,
      ease: Power3.easeInOut,
      duration: 0.4,
      delay: 1,
    });
  }, []);
  return (
    <Box ref={displayBox} mt="two" style={{ opacity: 0 }}>
      <BoxWithImage
        id={id}
        width={BOX_WIDTH}
        topBoxHeight={BOX_WIDTH}
        imageUrl={imageUrl}
        alt={commonName}
        bottomAccessory={
          <Content
            id={id}
            commonName={commonName}
            schedule={schedule}
            lastWateredOn={lastWateredOn}
            notes={notes}
            onClickWatered={onClickWatered}
          />
        }
      />
    </Box>
  );
};

export { DisplayBox };
