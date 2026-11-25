
const SUPABASE_URL = "https://weatuigiilgwfpypfwbt.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_sjB3RD8uoj3AFGU6zN2pzA_NBqnwPx4";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

console.log("StillWell connected to Supabase!");
