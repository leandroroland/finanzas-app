import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nuoxxvjyieadlsujfhce.supabase.co';  // Reemplaza con tu URL de Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51b3h4dmp5aWVhZGxzdWpmaGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQyMTQxNTIsImV4cCI6MjAzOTc5MDE1Mn0.bZlw-EaRKAH5Q1pDfg0TjK7gp0mxK0evn0PE8TkF-C8';  // Reemplaza con tu clave pública de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
