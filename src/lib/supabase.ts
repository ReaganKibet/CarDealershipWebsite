import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// These environment variables are set automatically when connecting to Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a placeholder client that will show a connection message
const createPlaceholderClient = () => {
  return {
    from: () => {
      throw new Error('Please connect to Supabase using the "Connect to Supabase" button in the top right corner.');
    },
    storage: {
      from: () => {
        throw new Error('Please connect to Supabase using the "Connect to Supabase" button in the top right corner.');
      }
    },
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => {
        throw new Error('Please connect to Supabase using the "Connect to Supabase" button in the top right corner.');
      },
      signUp: () => {
        throw new Error('Please connect to Supabase using the "Connect to Supabase" button in the top right corner.');
      },
      signOut: () => Promise.resolve({ error: null })
    }
  } as unknown as ReturnType<typeof createClient>;
};

// Create and export the Supabase client
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : createPlaceholderClient();

export async function uploadCarImage(file: File, carId: string): Promise<string | null> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Please connect to Supabase using the "Connect to Supabase" button in the top right corner.');
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${carId}/${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `car-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('car-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('car-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error in uploadCarImage:', error);
    return null;
  }
}

export async function deleteCarImage(storagePath: string): Promise<boolean> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Please connect to Supabase using the "Connect to Supabase" button in the top right corner.');
  }

  try {
    const { error } = await supabase.storage
      .from('car-images')
      .remove([storagePath]);

    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteCarImage:', error);
    return false;
  }
}