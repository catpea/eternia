import { copyNarration } from 'src/middleware/copy-narration/index.js';
import { verifyIntegrity } from 'src/middleware/verify-integrity/index.js';

// Order Is Significant

export [
  verifyIntegrity,
  copyNarration,
];
