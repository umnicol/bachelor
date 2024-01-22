export interface PricingPlan {
    name: string;
    monthlyPrice: number;
    yearlyPrice: number;
    features: string[];
  }
  
  export const pricingPlans: PricingPlan[] = [
    {
      name: 'BASIC',
      monthlyPrice: 59,
      yearlyPrice: 410,
      features: ['10 guides', 'Limited recipes', 'No check-ins'],
    },
    {
      name: 'PRO',
      monthlyPrice: 99,
      yearlyPrice: 690,
      features: ['20 guides', 'All recipes', 'Check-ins'],
    },
    {
      name: 'PREMIUM',
      monthlyPrice: 120,
      yearlyPrice: 1008,
      features: ['All guides', 'Free meal plan', 'Check-ins'],
    },
  ];
  