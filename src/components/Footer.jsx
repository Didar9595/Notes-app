import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Stack sx={{color:'white',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginTop:'2em'}}>
        <Typography sx={{fontFamily:'Anta',fontWeight:'bold'}}>Copyright &copy; 2024. All rights reserved.</Typography>
        <Stack direction='row' spacing={1}>
          <Typography sx={{fontFamily:'Anta',fontWeight:'bold'}}>Created and Maintaind by</Typography>
          <Typography sx={{fontFamily:'Anta',fontWeight:'bold',color:'#A28BF0'}}>Didar Abbas</Typography>
        </Stack>
    </Stack>
  )
}

export default Footer
