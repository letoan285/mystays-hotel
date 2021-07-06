export interface UserSignup {
  program_id: number
  first_name: string
  last_name: string
  first_name_kana?: string
  last_name_kana?: string
  email: string
  password: string
  password_confirm?: string
  phone?: string
  birthday?: string
  membership_id: string
  hotel_id: number
  email_permission: boolean
}
