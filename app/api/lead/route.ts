import { NextResponse } from "next/server";
import { isValidArea, isValidPhone, type LeadPayload } from "@/lib/lead";

/**
 * Приём заявки. Пока заявка только проверяется и пишется в лог сервера:
 * для боевой отправки (CRM, Telegram, e-mail) замените блок «доставка».
 */
export async function POST(request: Request) {
  let body: Partial<LeadPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone : "";
  const area = Number(body.area);

  if (!name || name.length > 100 || !isValidPhone(phone) || !isValidArea(area)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const lead = {
    name,
    phone,
    area,
    housing: body.housing ?? null,
    repair: body.repair ?? null,
    receivedAt: new Date().toISOString(),
  };

  // доставка
  console.info("[lead]", JSON.stringify(lead));

  return NextResponse.json({ ok: true });
}
