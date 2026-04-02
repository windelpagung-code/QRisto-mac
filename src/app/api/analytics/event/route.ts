import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { restaurantId, eventType, menuItemId, categoryId, language, metadata } = body;

    if (!restaurantId || !eventType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // TODO: Save to Supabase
    // await supabase.from('analytics_events').insert({
    //   restaurant_id: restaurantId,
    //   event_type: eventType,
    //   menu_item_id: menuItemId,
    //   category_id: categoryId,
    //   language,
    //   metadata,
    // });

    console.log(`Analytics event: ${eventType} for restaurant ${restaurantId}`);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
