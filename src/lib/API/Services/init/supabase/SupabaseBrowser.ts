import 'client-only';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../../../../supabase/types';

export const SupabaseBrowser = createClientComponentClient<Database>();
