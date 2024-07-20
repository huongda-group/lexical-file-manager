import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { FileProps, PanelState } from './index';

export default class PanelComponent extends React.Component<FileProps, PanelState> {
  constructor(props: FileProps) {
    super(props);
  }

  render() {
    return (
      <Grid item xs={6} md={2} lg={1}>
        <Box
          sx={{
            display: 'block',
            border: '1px solid #E0E0E0',
            borderRadius: '10px',
            '&:hover': {
              background: 'rgb(0 0 0 / 12%)'
            },
            cursor: 'pointer',
            position: 'relative',
            '&:hover .btn-delete-file': {
              display: 'block'
            }
          }}
        >
          <Button
            variant="contained"
            color="error"
            className="btn-delete-file"
            sx={{
              display: 'none',
              position: 'absolute',
              minWidth: 'unset',
              padding: '2px',
              paddingTop: 0,
              height: '20px',
              right: '8px',
              top: '4px'
            }}
            onClick={(e) => {
              e.stopPropagation();
              // remove(item);
            }}
          >
            <DeleteIcon sx={{ width: '15px', height: '15px' }} />
          </Button>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '12px 8px',
              color: 'rgba(0, 0, 0, 0.87)'
            }}
          >
            <FileCopyIcon />
            {this.props.file.name}
          </Box>
        </Box>
      </Grid>
    );
  }
}
