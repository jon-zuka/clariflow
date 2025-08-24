import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

const SUMMARY_COMMAND = {
  name: 'summary',
  description: 'Summarize important information from the specifig channel',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};


const ALL_COMMANDS = [ SUMMARY_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
