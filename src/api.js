import openSocket from 'socket.io-client';
import { useEffect, useState } from 'react';
const socket = openSocket('http://localhost:3000');
