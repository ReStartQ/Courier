import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useEffect } from 'react';
import { formatProgressVolumes } from 'renderer/functions/edit/formatInfo';
import { IconButton } from '@mui/joy';
import MediaProgress from './MediaProgress';

export default function ProgressVolumesStepper({
  props,
  advancedInput,
  inputDispatch,
}: any) {
  const getVolumeNumber = (value: any, progress: any) => {
    if (value === null) {
      const num = Math.ceil(progress / 13);
      if (progress >= 1000) {
        return 9999;
      }
      if (progress >= 100) {
        return 999;
      }
      if (progress === 0) {
        return 13;
      }
      return num * 13 + 1;
    }
    return value;
  };

  const normalise = (value: number) =>
    ((value - 0) * 100) /
    (props.volumes !== null
      ? props.volumes - 0
      : getVolumeNumber(props.volumes, advancedInput.progressVolumes) - 0);

  const handleNext = () => {
    inputDispatch({
      type: 'updateProgressVolumes',
      payload: advancedInput.progressVolumes + 1,
    });
  };

  const handleBack = () => {
    inputDispatch({
      type: 'updateProgressVolumes',
      payload: advancedInput.progressVolumes - 1,
    });
  };

  useEffect(() => {
    inputDispatch({
      type: 'updateProgressVolumes',
      payload: props.mediaListEntry.progressVolumes,
    });
  }, [inputDispatch, props.mediaListEntry.progressVolumes]);

  return (
    <>
      <Box display="flex" flexDirection="column" sx={{ gridColumn: '2/3' }}>
        <Typography fontSize={12} fontWeight="bold">
          Volumes{' '}
        </Typography>
        <Box display="flex" flexDirection="row">
          <IconButton
            size="sm"
            variant="outlined"
            color="primary"
            onClick={handleBack}
            disabled={advancedInput.progressVolumes === 0}
            sx={{
              m: 0,
              p: 0,
              minWidth: 0,
              '--IconButton-size': '12px',
              mr: '4px',
            }}
          >
            <RemoveIcon fontSize="inherit" />
          </IconButton>
          <Typography fontSize={12}>
            {formatProgressVolumes(
              advancedInput.progressVolumes,
              props.volumes,
            )}
          </Typography>
          <IconButton
            size="sm"
            color="primary"
            variant="outlined"
            onClick={handleNext}
            disabled={
              advancedInput.progressVolumes === props.volumes ||
              advancedInput.progressVolumes === 9999
            }
            sx={{
              m: 0,
              p: 0,
              minWidth: 0,
              '--IconButton-size': '12px',
              ml: '4px',
            }}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          sx={{ overflowX: 'auto', my: '3px' }}
        >
          <MediaProgress
            progress={normalise(advancedInput.progressVolumes)}
            buffer={normalise(props.volumes !== null ? props.volumes : 0)}
          />
        </Box>
      </Box>
    </>
  );
}
