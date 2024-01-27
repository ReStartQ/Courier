import { CardActionArea, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useState, MouseEvent } from 'react';
import { useTitle } from 'renderer/context/TitleContext';
import getStatusColor from 'renderer/functions/StatusFunction';
import { getTitle } from 'renderer/functions/view/TitlePreferenceFunctions';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { Tooltip } from '@mui/joy';
import ContextMenuAlternative from '../etc/ContextMenuAlternative';
import ContextMenu from '../etc/ContextMenu';
import { MediaIcons } from '../etc/SvgIcons';

export default function MediaCardCompact({ props }: any) {
  const titlePreference: any = useTitle();
  const myAdvancedMedia: any = useAdvancedMedia();

  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX,
            mouseY: event.clientY,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: '140px',
        height: '200px',
      }}
      onContextMenu={handleContextMenu}
    >
      <CardActionArea
        sx={{
          width: '140px',
          height: '200px',
        }}
        onClick={() => {
          window.electron.ipcRenderer.sendMessage('advancedMedia', [
            getTitle(titlePreference.title, props),
            props,
          ]);
          myAdvancedMedia.dispatch({ type: 'getNewMedia', payload: props });
        }}
      >
        <CardMedia
          component="img"
          image={props.image}
          sx={{
            cursor: 'pointer',
            gridRow: '1/4',
            maxWidth: '140px',
            maxHeight: '200px',
          }}
        />
        {props.mediaListEntry.notes !== null ? (
          <Tooltip
            title={props.mediaListEntry.notes}
            arrow
            variant="outlined"
            color="primary"
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                margin: '5px',
                bgcolor: 'rgba(0, 0, 0, 0.69)',
                color: 'white',
                borderRadius: '3px',
                height: '25px',
                width: '25px',
              }}
            >
              <MediaIcons type={0} />
            </Box>
          </Tooltip>
        ) : null}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.69)',
            color: 'white',
            padding: '10px',
            height: '55px',
          }}
        >
          <Typography
            fontSize={12}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
            color={getStatusColor(props.status)}
          >
            {getTitle(titlePreference.title, props)}
          </Typography>
        </Box>
      </CardActionArea>
      <ContextMenu
        props={props}
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
      />
    </Card>
  );
}

/* <Box sx={{ display: 'flex', flexDirection: 'row' }}>
  <Typography noWrap fontSize={12}>
    {props.titleRomaji}
  </Typography>
</Box>;
 */
