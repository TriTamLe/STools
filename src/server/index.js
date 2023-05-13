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
    .upload(`/tool-content/${file.name}`, file);
  if (error) {
    console.log(error);
    throw new Error('Can not upload the file');
  } else {
    return data;
  }
};

export const getFileURL = async (bucketName, filePath) => {
  console.log(bucketName, filePath);
  const { data, error } = await supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);
  if (error) {
    throw new Error({ message: error.message });
  } else {
    console.log(data.publicUrl);
    return data;
  }
};
