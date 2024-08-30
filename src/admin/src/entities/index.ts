export interface Status {
  id: string;
  create_time: string;
  title: string;
  description: string;
  hidden: boolean;
}

export interface CartPerfume {
  id: string;
  quantity: number;
  cart_id: string;
  perfume_volume_id: string;
}
export interface Cart {
  id: string;
  status_id: string;
  user_id: string;
  create_time: string;
  delivery_date: string;
  buy_date: string;
  issue_date: string;
  status: Status;
  cart_perfume: CartPerfume[];
}
