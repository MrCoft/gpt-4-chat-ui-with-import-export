import {AppBar, Container, Toolbar, Typography, Box, IconButton, Menu} from "@mui/material";
import React from "react";

export function Header() {
    return (
        <AppBar position="static">
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    {/*<AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>*/}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        {/*<IconButton*/}
                        {/*    size="large"*/}
                        {/*    aria-label="account of current user"*/}
                        {/*    aria-controls="menu-appbar"*/}
                        {/*    aria-haspopup="true"*/}
                        {/*    onClick={handleOpenNavMenu}*/}
                        {/*    color="inherit"*/}
                        {/*>*/}
                        {/*    <MenuIcon/>*/}
                        {/*</IconButton>*/}
                        {/*<Menu*/}
                        {/*    id="menu-appbar"*/}
                        {/*    anchorEl={anchorElNav}*/}
                        {/*    anchorOrigin={{*/}
                        {/*        vertical: 'bottom',*/}
                        {/*        horizontal: 'left',*/}
                        {/*    }}*/}
                        {/*    keepMounted*/}
                        {/*    transformOrigin={{*/}
                        {/*        vertical: 'top',*/}
                        {/*        horizontal: 'left',*/}
                        {/*    }}*/}
                        {/*    open={Boolean(anchorElNav)}*/}
                        {/*    onClose={handleCloseNavMenu}*/}
                        {/*    sx={{*/}
                        {/*        display: {xs: 'block', md: 'none'},*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    {pages.map((page) => (*/}
                        {/*        <MenuItem key={page} onClick={handleCloseNavMenu}>*/}
                        {/*            <Typography textAlign="center">{page}</Typography>*/}
                        {/*        </MenuItem>*/}
                        {/*    ))}*/}
                        {/*</Menu>*/}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
