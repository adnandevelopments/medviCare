import { NextResponse } from "next/server";

type OrderBody = {
  id?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  address1?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  paymentMethod?: string;
  items?: unknown[];
  total?: number;
};

/** Accepts COD checkout payloads. Persists client-side; this validates + acknowledges. */
export async function POST(request: Request) {
  let body: OrderBody;
  try {
    body = (await request.json()) as OrderBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const required = [
    body.fullName,
    body.email,
    body.phone,
    body.address1,
    body.city,
    body.province,
    body.postalCode,
  ];
  if (required.some((v) => !String(v ?? "").trim())) {
    return NextResponse.json(
      { error: "Missing required delivery fields" },
      { status: 400 },
    );
  }

  if (body.paymentMethod !== "cod") {
    return NextResponse.json(
      { error: "Only cash on delivery is available right now" },
      { status: 400 },
    );
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email));
  if (!emailOk) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    orderId: body.id,
    paymentMethod: "cod",
    message:
      "Order received. Pay cash on delivery after clinician approval and shipping.",
  });
}
