import React, { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Box,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Paper,
  IconButton,
  Fab,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Add,
  Delete,
  Edit,
  Favorite,
  Share,
  MoreVert,
  DarkMode,
  LightMode
} from '@mui/icons-material';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1-234-567-8900' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1-234-567-8901' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1-234-567-8902' }
  ]);
  const [newContact, setNewContact] = useState<Omit<Contact, 'id'>>({
    name: '',
    email: '',
    phone: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  const handleThemeToggle = (): void => {
    setDarkMode(!darkMode);
  };

  const handleInputChange = (field: keyof Omit<Contact, 'id'>) => (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewContact(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleAddContact = (): void => {
    if (newContact.name && newContact.email && newContact.phone) {
      const contact: Contact = {
        ...newContact,
        id: Math.max(...contacts.map(c => c.id), 0) + 1
      };
      setContacts(prev => [...prev, contact]);
      setNewContact({ name: '', email: '', phone: '' });
      setSnackbarMessage('Contact added successfully!');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteContact = (id: number): void => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
    setSnackbarMessage('Contact deleted successfully!');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (): void => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              React MUI Sample App
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={handleThemeToggle}
                  color="default"
                />
              }
              label={darkMode ? <DarkMode /> : <LightMode />}
            />
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Contact Form Card */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Add New Contact
                  </Typography>
                  <Box component="form" sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={newContact.name}
                      onChange={handleInputChange('name')}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={newContact.email}
                      onChange={handleInputChange('email')}
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Phone"
                      value={newContact.phone}
                      onChange={handleInputChange('phone')}
                      margin="normal"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleAddContact}
                    disabled={!newContact.name || !newContact.email || !newContact.phone}
                  >
                    Add Contact
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* Statistics Card */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Statistics
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                    <Chip
                      label={`Total Contacts: ${contacts.length}`}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={`Theme: ${darkMode ? 'Dark' : 'Light'}`}
                      color="secondary"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" startIcon={<Favorite />}>
                    Like
                  </Button>
                  <Button size="small" startIcon={<Share />}>
                    Share
                  </Button>
                  <IconButton aria-label="settings">
                    <MoreVert />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>

            {/* Contacts List */}
            <Grid item xs={12}>
              <Paper>
                <Typography variant="h5" component="h2" sx={{ p: 2 }}>
                  Contact List
                </Typography>
                <Divider />
                <List>
                  {contacts.map((contact, index) => (
                    <React.Fragment key={contact.id}>
                      <ListItem
                        secondaryAction={
                          <Box>
                            <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                              <Edit />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => handleDeleteContact(contact.id)}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <Person />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={contact.name}
                          secondary={
                            <Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Email sx={{ mr: 1, fontSize: 16 }} />
                                <Typography variant="body2">{contact.email}</Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <Phone sx={{ mr: 1, fontSize: 16 }} />
                                <Typography variant="body2">{contact.phone}</Typography>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < contacts.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Add />
        </Fab>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default App;
