import { Box, Button, IconButton, Input, Typography } from '@mui/material';
import TokenIcon from '@mui/icons-material/Token';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import HtmlTooltip from 'renderer/components/app/etc/CustomTooltip1';
import HelpIcon from '@mui/icons-material/Help';
import CustomToolTipFixedWidth from 'renderer/components/app/etc/CustomTooltipFixedWidth';

export default function AccountSection() {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  const handleReset = () => {
    window.electron.ipcRenderer.sendMessage('resetLogin', ['ping']);
  };

  const handleSave = () => {
    window.electron.store.set('aniListUsername', username);
    window.electron.store.set('aniListToken', token);
    // send to main
    window.electron.ipcRenderer.sendMessage('updateMainFromSettings', [
      'aniListUsernameToken',
      username,
      token,
    ]);
  };

  const inputChange1 = (e: any) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const inputChange2 = (e: any) => {
    setToken(e.target.value);
    console.log(token);
  };

  const client = '9413';

  const authLink = `https://anilist.co/api/v2/oauth/authorize?client_id=${client}&response_type=token`;

  const ariaLabel = { 'aria-label': 'description' };

  return (
    <Box display="flex" flexDirection="column" gap="15px">
      <Box display="flex" flexDirection="row">
        Account Information{' '}
      </Box>
      <Box display="flex" flexDirection="row">
        <Input
          placeholder="Username"
          inputProps={ariaLabel}
          onChange={inputChange1}
          spellCheck={false}
          sx={{ width: '100%' }}
        />
        <CustomToolTipFixedWidth
          title={
            <>
              <Box
                component="img"
                src="https://github.com/ReStartQ/anicour/blob/main/images/help/AniListProfilePageTooltip.png?raw=true"
                sx={{ width: '550px' }}
              />
            </>
          }
          placement="left-start"
        >
          <IconButton sx={{ ml: 2 }}>
            <HelpIcon fontSize="small" />
          </IconButton>
        </CustomToolTipFixedWidth>
      </Box>
      <Box display="flex" flexDirection="row">
        <Input
          placeholder="Token"
          inputProps={ariaLabel}
          onChange={inputChange2}
          spellCheck={false}
          sx={{ width: '100%' }}
        />
        <CustomToolTipFixedWidth
          title={
            <>
              <Box
                component="img"
                src="https://github.com/ReStartQ/anicour/blob/main/images/help/AniListTokenTooltip.png?raw=true"
              />
            </>
          }
          placement="left-start"
        >
          <IconButton sx={{ ml: 2 }}>
            <HelpIcon fontSize="small" />
          </IconButton>
        </CustomToolTipFixedWidth>
      </Box>
      <Box display="flex" flexDirection="row" gap="15px">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            window.electron.ipcRenderer.sendMessage('openExternalLink', [
              authLink,
            ]);
          }}
          sx={{ width: '50%' }}
        >
          Get AniList Token
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleSave}
          sx={{ width: '50%' }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
