export interface Activity {
  application_id?: string | null;
  assets?: {
    large_image?: string | null;
    small_image?: string | null;
    large_text?: string | null;
  } | null;
  details?: string | null;
  state?: string | null;
  timestamps?: {
    start?: number | null;
  } | null;
}
