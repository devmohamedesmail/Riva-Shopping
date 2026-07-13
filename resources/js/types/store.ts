export interface Store {
    id: number; 
    name: string; 
    description?: string; 
    phone?: string; 
    email?: string;
    address?: string; 
    city?: string; 
    state?: string; 
    zip?: string; 
    country?: string;
    currency: string; 
    timezone: string;
}