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
  Typography,
} from '@mui/material';
import { LexicalEditor } from 'lexical';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { INSERT_FILE_COMMAND } from '../FileManager';
import { FileManagerFile } from '../FileManager.d';

export function File({
  item,
  selected,
  setSelected,
  remove,
}: {
  item: FileManagerFile;
  selected: FileManagerFile | undefined;
  setSelected: Dispatch<SetStateAction<FileManagerFile | undefined>>;
  remove: (value: FileManagerFile) => void;
}) {
  return (
    <Grid item xs={6} md={2} lg={1}>
      <Box
        onClick={() => {
          setSelected(item);
        }}
        sx={{
          display: 'block',
          border: '1px solid #E0E0E0',
          borderRadius: '10px',
          '&:hover': {
            background: 'rgb(0 0 0 / 12%)',
          },
          ...(selected &&
            selected.id === item.id && {
              background: 'rgb(0 0 0 / 12%)',
            }),
          cursor: 'pointer',
          position: 'relative',
          '&:hover .btn-delete-file': {
            display: 'block',
          },
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
            top: '4px',
          }}
          onClick={(e) => {
            e.stopPropagation();
            remove(item);
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
            color: 'rgba(0, 0, 0, 0.87)',
          }}
        >
          <FileCopyIcon />
          {item.name}
        </Box>
      </Box>
    </Grid>
  );
}

export function FileManagerComponent({
  onClose,
  editor,
  onFiles,
  onDelete,
  onInsert,
}: {
  onClose: () => void;
  editor: LexicalEditor;
  onFiles?: (value: FileManagerFile[]) => void;
  onDelete?: (value: FileManagerFile) => void;
  onInsert?: (value: FileManagerFile) => void;
}) {
  const [listFiles, setListFiles] = useState<FileManagerFile[]>(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item) => ({
      id: item.toString(),
      name: `File ${item}`,
      src: 'https://www.google.com',
    }))
  );
  useEffect(() => {
    if (onFiles) onFiles(listFiles);
  }, [listFiles]);

  const [selected, setSelected] = useState<FileManagerFile | undefined>(
    undefined
  );

  return (
    <Dialog
      onClose={() => {
        onClose();
      }}
      open={true}
      sx={{
        '& .MuiDialog-paperWidthSm': {
          minWidth: '90vw',
          minHeight: '90vh',
          maxWidth: '90vh',
          height: '100%',
        },
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
          <Grid item xs={12} md={selected ? 9 : 12}>
            <Grid container spacing={[2, 2]} sx={{ width: '100% !important' }}>
              {listFiles.map((item) => (
                <File
                  key={item.id}
                  item={item}
                  selected={selected}
                  setSelected={setSelected}
                  remove={async (item: FileManagerFile) => {
                    if (onDelete) onDelete(item);
                    setListFiles(listFiles.filter((e) => e.id !== item.id));
                    if (selected && item.id === selected.id) {
                      setSelected(undefined);
                    }
                  }}
                />
              ))}
            </Grid>
          </Grid>
          {selected && (
            <Grid
              item
              xs={selected ? 12 : 0}
              md={selected ? 3 : 0}
              sx={{
                borderLeft: '1px solid #E0E0E0',
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'space-between',
                flexDirection: 'column',
                position: 'relative',
                paddingBottom: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  width: '100%',
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
                {selected.name}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  sx={{ textTransform: 'unset', mr: 2 }}
                  onClick={() => {
                    if (onInsert) onInsert(selected);
                    editor.dispatchCommand(INSERT_FILE_COMMAND, {
                      name: selected.name,
                      src: selected.src,
                    });
                    onClose();
                  }}
                >
                  Insert
                </Button>
                <Button
                  variant="outlined"
                  sx={{ textTransform: 'unset', mr: 2 }}
                  color="error"
                  onClick={() => {
                    if (onDelete) onDelete(selected);
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ textTransform: 'unset' }}
                  onClick={() => {
                    setSelected(undefined);
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
          onClick={() => {
            onClose();
          }}
          variant="contained"
          sx={{ textTransform: 'unset' }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
