
const express = require('express');
const cors = require('cors');
const invitations = require('../../invitations.json');
const invitationsUpdate = require('../../invitations_update.json');

const app = express();
const corsMiddleware = cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'Content-Type',
    'Content-Length',
    'Authorization',
    'Accept',
    'X-Requested-With',
  ],
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200,
});
app.use(corsMiddleware);
app.options('*', corsMiddleware);
app.use(express.static('dist'));
app.use(express.json());

app.get('/api/getNotifications', (req, res) => {
  console.log('api called');
  res.send(JSON.stringify(invitations));
});
app.get('/api/getNotificationsUpdate', (req, res) => {
  console.log('api called');
  res.send(JSON.stringify(invitationsUpdate));
});

app.listen(process.env.PORT || 8000, () => console.log(`Listening on port ${process.env.PORT || 8000}!`));
