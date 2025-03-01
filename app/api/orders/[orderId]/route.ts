// app/api/orders/[orderId]/route.ts

import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabaseClient'; // Adjust the import path if necessary

export async function GET(req: Request, { params }: { params: { orderId: string } }) {
  const { orderId } = params;

  try {
    const { data, error } = await supabase
      .from('order_rec')
      .select('*')
      .eq('order_id', orderId)
      .single();  // Assuming you want to fetch a single order record based on orderId

    if (error) {
      return NextResponse.json({ error: 'Error fetching order details' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch order details' }, { status: 500 });
  }
}
