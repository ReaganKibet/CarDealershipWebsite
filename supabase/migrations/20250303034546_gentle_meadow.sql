/*
  # Initial Database Schema for Wilphil Imports

  1. New Tables
    - `cars` - Stores car listing information
      - `id` (uuid, primary key)
      - `make_id` (text, references car make)
      - `model_id` (text, references car model)
      - `year` (integer)
      - `price` (integer)
      - `mileage` (integer)
      - `location` (text)
      - `description` (text)
      - `specs` (jsonb)
      - `features` (text[])
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `user_id` (uuid, references auth.users)
      - `status` (text)
    
    - `car_images` - Stores images for each car
      - `id` (uuid, primary key)
      - `car_id` (uuid, references cars)
      - `url` (text)
      - `is_primary` (boolean)
      - `created_at` (timestamp)
      - `storage_path` (text)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access to published cars
*/

-- Create cars table
CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  make_id text NOT NULL,
  model_id text NOT NULL,
  year integer NOT NULL,
  price integer NOT NULL,
  mileage integer NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  specs jsonb NOT NULL DEFAULT '{}'::jsonb,
  features text[] NOT NULL DEFAULT '{}'::text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'sold', 'archived'))
);

-- Create car_images table
CREATE TABLE IF NOT EXISTS car_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id uuid REFERENCES cars(id) ON DELETE CASCADE NOT NULL,
  url text NOT NULL,
  is_primary boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  storage_path text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_images ENABLE ROW LEVEL SECURITY;

-- Create policies for cars table
-- Allow authenticated users to insert their own cars
CREATE POLICY "Users can insert their own cars"
  ON cars
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to update their own cars
CREATE POLICY "Users can update their own cars"
  ON cars
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to delete their own cars
CREATE POLICY "Users can delete their own cars"
  ON cars
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow authenticated users to select their own cars
CREATE POLICY "Users can view their own cars"
  ON cars
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow public to view published cars
CREATE POLICY "Public can view published cars"
  ON cars
  FOR SELECT
  TO anon
  USING (status = 'published');

-- Create policies for car_images table
-- Allow authenticated users to insert images for their own cars
CREATE POLICY "Users can insert images for their own cars"
  ON car_images
  FOR INSERT
  TO authenticated
  WITH CHECK (car_id IN (SELECT id FROM cars WHERE user_id = auth.uid()));

-- Allow authenticated users to update images for their own cars
CREATE POLICY "Users can update images for their own cars"
  ON car_images
  FOR UPDATE
  TO authenticated
  USING (car_id IN (SELECT id FROM cars WHERE user_id = auth.uid()))
  WITH CHECK (car_id IN (SELECT id FROM cars WHERE user_id = auth.uid()));

-- Allow authenticated users to delete images for their own cars
CREATE POLICY "Users can delete images for their own cars"
  ON car_images
  FOR DELETE
  TO authenticated
  USING (car_id IN (SELECT id FROM cars WHERE user_id = auth.uid()));

-- Allow authenticated users to select images for their own cars
CREATE POLICY "Users can view images for their own cars"
  ON car_images
  FOR SELECT
  TO authenticated
  USING (car_id IN (SELECT id FROM cars WHERE user_id = auth.uid()));

-- Allow public to view images for published cars
CREATE POLICY "Public can view images for published cars"
  ON car_images
  FOR SELECT
  TO anon
  USING (car_id IN (SELECT id FROM cars WHERE status = 'published'));

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update the updated_at timestamp
CREATE TRIGGER update_cars_updated_at
BEFORE UPDATE ON cars
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();