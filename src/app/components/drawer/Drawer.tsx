import { SwipeableDrawer } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import { useRecoilState } from 'recoil'

import { drawerState } from '../../recoil/drawer.state'
import ListMenu from './ListMenu'

export default function Drawer() {
  const [isDrawerOpen, setDrawerIsOpen] = useRecoilState(drawerState);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      setDrawerIsOpen(open);
    };

  return (
    <Box sx={{ mt: 3 }}>
      {/* <Button onClick={toggleDrawer(true)}></Button> */}
      <SwipeableDrawer
        anchor={"left"}
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <ListMenu />
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}
