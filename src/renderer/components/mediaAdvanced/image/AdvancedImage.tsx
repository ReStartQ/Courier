import { Tooltip } from '@mui/joy';
import { Box, Card, CardActionArea } from '@mui/material';
import { useTitle } from 'renderer/context/TitleContext';
import { useAdvancedDefaultLink } from 'renderer/context/advanced/AdvancedDefaultLinkContext';
import { useAdvancedMedia } from 'renderer/context/advanced/AdvancedMediaContext';
import { getMalLink } from 'renderer/functions/edit/getAdjustedSiteLink';

export default function AdvancedImage() {
  const myAdvancedMedia: any = useAdvancedMedia();
  const myAdvancedDefaultLink: any = useAdvancedDefaultLink();
  const titlePreference: any = useTitle();

  return (
    <Card
      sx={{
        width: '250px',
        height: '340px',
        gridColumn: '1/2',
        gridRow: '1/5',
        border: '1px solid SteelBlue',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      variant="outlined"
    >
      <Tooltip
        variant="outlined"
        color="primary"
        title={
          myAdvancedDefaultLink.advancedDefaultLink === 'AniList'
            ? 'Go to AniList'
            : 'Go to MyAnimeList'
        }
        followCursor
        placement="right-end"
      >
        <CardActionArea
          sx={{
            width: '250px',
            height: '340px',
            overflow: 'hidden',
            display: 'flex',
          }}
          onClick={() => {
            console.log(titlePreference);
            if (
              myAdvancedMedia.advancedMedia.idMal !== null &&
              myAdvancedDefaultLink.advancedDefaultLink === 'MyAnimeList'
            ) {
              window.electron.ipcRenderer.sendMessage('openExternalLink', [
                getMalLink(
                  myAdvancedMedia.advancedMedia.idMal,
                  myAdvancedMedia.advancedMedia.type,
                ),
              ]);
            } else {
              window.electron.ipcRenderer.sendMessage('openExternalLink', [
                myAdvancedMedia.advancedMedia.siteUrl,
              ]);
            }
          }}
        >
          <Box
            component="img"
            alt="null"
            src={myAdvancedMedia.advancedMedia.image}
            sx={{
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
            }}
          />
        </CardActionArea>
      </Tooltip>
    </Card>
  );
}
