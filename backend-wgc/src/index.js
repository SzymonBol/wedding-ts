import { config } from 'dotenv';
import { executeWGCOperations } from './weeding-guests-confirmation.js';
config();

await executeWGCOperations();