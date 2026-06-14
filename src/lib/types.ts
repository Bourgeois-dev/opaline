export interface MenuItem { id: string; name: string; category: string; description: string; price: number; position: number; is_active: boolean; }
export interface GalleryImage { id: string; url: string; alt: string; position: number; is_active: boolean; }
export interface Partner { id: string; name: string; description: string; logo_url: string; category: string; position: number; is_active: boolean; }
export interface Review { id: string; author: string; rating: number; content: string; position: number; is_active: boolean; }
export interface SocialLink { id: string; platform: string; url: string; position: number; is_active: boolean; }
export interface OpeningHour { id: string; day_of_week: number; is_closed: boolean; lunch_open: string | null; lunch_close: string | null; dinner_open: string | null; dinner_close: string | null; }
export interface ClosurePeriod { id: string; start_date: string; end_date: string; reason: string; blocks_reservations: boolean; }
export interface PromoBanner { id: string; message: string; cta_label: string; cta_url: string; is_active: boolean; }
export interface RestaurantTable { id: string; label: string; capacity: number; online_limit: number; pos_x: number; pos_y: number; shape: string; is_active: boolean; }
export interface Reservation { id: string; customer_name: string; email: string; phone: string; date: string; time: string; covers: number; table_id: string | null; status: string; notes: string; created_at: string; }
export interface Lead { id: string; first_name: string; last_name: string; email: string; source: string; created_at: string; }
export interface ReservationSettings { id: string; phone_threshold: number; min_advance_hours: number; slot_duration: number; enabled: boolean; }
