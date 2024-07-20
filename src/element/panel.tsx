import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import UploadIcon from '@mui/icons-material/Upload';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material';
import { PanelProps, PanelState, File } from './index';
import FileComponent from './file';

export default class PanelComponent extends React.Component<PanelProps, PanelState> {
  constructor(props: PanelProps) {
    super(props);

    this.state = {
      files: props.files,
      selected: null
    };
  }

  render() {
    if (this.props.show) {
      return (
        <Dialog
          onClose={this.props.onClose}
          open={true}
          sx={{
            '& .MuiDialog-paperWidthSm': {
              minWidth: '90vw',
              minHeight: '90vh',
              maxWidth: '90vh',
              height: '100%'
            }
          }}
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between">
              <Typography>File Manager</Typography>
              <Button variant="contained" sx={{ textTransform: 'unset' }}>
                <UploadIcon /> Upload
              </Button>
            </Box>
          </DialogTitle>
          <DialogContent
            dividers
            sx={{ height: '100%', paddingBottom: 0, paddingTop: 0 }}
          >
            <Grid
              container
              spacing={[2, 2]}
              sx={{ height: '100%', marginTop: 'unset !important' }}
            >
              <Grid item xs={12} md={this.state.selected ? 9 : 12}>
                <Grid container spacing={[2, 2]} sx={{ width: '100% !important' }}>
                  {this.state.files.map((item: File) => (
                    <FileComponent
                      key={item.id}
                      file={item} />
                  ))}
                </Grid>
              </Grid>
              {this.state.selected && (
                <Grid
                  item
                  xs={this.state.selected ? 12 : 0}
                  md={this.state.selected ? 3 : 0}
                  sx={{
                    borderLeft: '1px solid #E0E0E0',
                    display: 'flex',
                    alignItems: 'end',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    position: 'relative',
                    paddingBottom: 2
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      width: '100%'
                    }}
                  >
                    <Grid container display="flex" justifyContent="center">
                      <Grid
                        item
                        xs={12}
                        md={3}
                        display="flex"
                        justifyContent="center"
                      >
                        <FileCopyIcon
                          sx={{ width: '100px', height: '100px', marginBottom: 2 }}
                        />
                      </Grid>
                    </Grid>
                    {this.state.selected.name}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      sx={{ textTransform: 'unset', mr: 2 }}
                      onClick={() => {
                        if (this.props.onInsert) {
                          this.props.onInsert(this.state.selected as File);
                        }
                      }}
                    >
                      Insert
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ textTransform: 'unset', mr: 2 }}
                      color="error"
                      onClick={() => {
                        if (this.props.onDelete) {
                          this.props.onDelete(this.state.selected as File);
                        }
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ textTransform: 'unset' }}
                      onClick={() => {
                        this.setState({
                          selected: null
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.props.onClose}
              variant="contained"
              sx={{ textTransform: 'unset' }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      );
    }

    return (<></>);
  }
}
