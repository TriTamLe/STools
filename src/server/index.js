import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_URL,
  import.meta.env.VITE_ANON_KEY,
);

export const getData = async table => {
  return await supabase.from(table).select('*');
};

export const postData = async (table, row) => {
  return await supabase.from(table).insert(row);
};

export const uploadFile = async file => {
  const { data, error } = await supabase.storage
    .from('STools')
    .upload('/tool-content/', file);
  if (error) {
    throw new Error('Can not upload the file');
  } else {
    console.log('Success fetching!', data);
  }
};
