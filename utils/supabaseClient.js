const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

async function initializeSupabase() {
    try {
        // Create tables if they don't exist
        const { data: existingTables, error: tablesError } = await supabase
            .from('invoices')
            .select('id')
            .limit(1);

        if (tablesError && tablesError.code === '42P01') {
            // Tables don't exist, create them
            await createTables();
        }
    } catch (error) {
        reportError(error);
    }
}

async function createTables() {
    try {
        // Create tables using SQL
        const { error } = await supabase.rpc('create_tables', {
            sql: `
                -- Create users table
                CREATE TABLE IF NOT EXISTS users (
                    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    name TEXT,
                    role TEXT DEFAULT 'user',
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
                );

                -- Create clients table
                CREATE TABLE IF NOT EXISTS clients (
                    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                    name TEXT NOT NULL,
                    email TEXT,
                    phone TEXT,
                    company TEXT,
                    address TEXT,
                    notes TEXT,
                    total_invoices INTEGER DEFAULT 0,
                    total_amount DECIMAL(15,2) DEFAULT 0,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
                );

                -- Create invoices table
                CREATE TABLE IF NOT EXISTS invoices (
                    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                    invoice_number TEXT UNIQUE NOT NULL,
                    client_id UUID REFERENCES clients(id),
                    amount DECIMAL(15,2) NOT NULL,
                    status TEXT DEFAULT 'pending',
                    due_date DATE NOT NULL,
                    notes TEXT,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
                );

                -- Create invoice_items table
                CREATE TABLE IF NOT EXISTS invoice_items (
                    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                    invoice_id UUID REFERENCES invoices(id),
                    description TEXT NOT NULL,
                    quantity INTEGER NOT NULL,
                    price DECIMAL(15,2) NOT NULL,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
                );

                -- Create payments table
                CREATE TABLE IF NOT EXISTS payments (
                    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                    invoice_id UUID REFERENCES invoices(id),
                    amount DECIMAL(15,2) NOT NULL,
                    payment_date DATE NOT NULL,
                    payment_method TEXT NOT NULL,
                    status TEXT DEFAULT 'pending',
                    notes TEXT,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
                );
            `
        });

        if (error) throw error;
    } catch (error) {
        reportError(error);
    }
}
