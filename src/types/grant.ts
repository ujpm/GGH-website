export interface Grant {
  id: string;
  title: string;
  organization: string;
  amount: string;
  deadline: string;
  category: 'grant' | 'scholarship';
  description: string;
}

export interface PartnerBenefit {
  icon: string;
  title: string;
  description: string;
}
