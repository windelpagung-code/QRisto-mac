'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Restaurant } from '@/types';

export function useRestaurant() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data } = await supabase
        .from('restaurants')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setRestaurant({
          id: data.id,
          userId: data.user_id,
          name: data.name,
          slug: data.slug,
          logo: data.logo,
          bannerImages: data.banner_images,
          primaryColor: data.primary_color,
          accentColor: data.accent_color,
          fontFamily: data.font_family,
          layout: data.layout,
          plan: data.plan,
          planStatus: data.plan_status,
          stripeCustomerId: data.stripe_customer_id,
          stripeSubscriptionId: data.stripe_subscription_id,
          country: data.country,
          city: data.city,
          address: data.address,
          phone: data.phone,
          email: data.email,
          website: data.website,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        });
      }
      setLoading(false);
    }

    load();
  }, []);

  return { restaurant, loading };
}
