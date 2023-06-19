import 'dotenv/config';

import { InstallGlobalCommands } from './utils.js';


const PROMPT = {
  name: 'prompt',
  description: 'Send a prompt to brian_bot',
  options: [{
    type: 3,
    name: 'prompt',
    description: 'Prompt the bot.',
    required: true,
  }],
  type: 1,
};

//create group
/*
const CREATE = {
  name: 'create',
  description: 'Create a new group',
  options: [{
    type: 3,
    name: 'groupname',
    description: 'Enter the name of your new group',
    required: true,
  }],
  type: 1,
};

//read group
const NOTIFY = {
  name: 'notify',
  description: 'Notifies the group members',
  type: 1,
};

//add
const ADD = {
  name: 'add',
  description: 'Add users to a group',
  type: 1,
};

//remove
const REMOVE = {
  name: 'remove',
  description: 'Remove users from a group',
  type: 1,
};


//delete group
const DELETE = {
  name: 'delete',
  description: 'Delete a group',
  type: 1,
}
*/

//const ALL_COMMANDS = [PROMPT, CREATE, NOTIFY, ADD, REMOVE, DELETE];
const ALL_COMMANDS = [PROMPT];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);