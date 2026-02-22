-- Copy and paste this into the Supabase SQL Editor to create the RSVPs table

CREATE TABLE rsvps (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  guests_count integer DEFAULT 1 NOT NULL,
  attending_haldi boolean DEFAULT false,
  attending_wedding boolean DEFAULT false,
  attending_reception boolean DEFAULT false
);

-- Enable Row Level Security (RLS)
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT into the rsvps table (so your guests can submit RSVPs)
CREATE POLICY "Allow anonymous inserts" ON rsvps FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated users to SELECT (so you can view the RSVPs in your dashboard)
CREATE POLICY "Allow public select" ON rsvps FOR SELECT TO anon USING (true);
