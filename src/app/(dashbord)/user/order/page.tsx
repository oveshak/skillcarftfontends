'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { api } from '@/lib/api';
import { jwtDecode } from 'jwt-decode';

// ---- Types ----
type PaymentStatus = 'Unpaid' | 'Paid';
type OrderStatus = 'Confirm' | 'Pending' | 'Due';

interface OrderItem {
  title: string;
  subtitle: string;
  badge: string;
  price: number | 'Free';
  originalPrice?: number;
  image?: string;
  slug?: string;
}

interface Order {
  id: string;
  date: string;
  payment: PaymentStatus;
  status: OrderStatus;
  total: number;
  originalPrice?: number;
  items: OrderItem[];
}

// ---- helpers ----
const bdt = (n: number) => `৳${n.toLocaleString('bn-BD')}`;

// normalize helpers
const norm = (v?: string | null) => (v ?? '').toString().trim().toLowerCase();

// status sets (বেশি কেস কভার করা হল)
const paidSet = new Set([
  'paid', 'success', 'successful', 'successfully',
  'confirm', 'confirmed', 'complete', 'completed'
]);

const pendingSet = new Set([
  'pending', 'processing', 'initiated', 'in_progress', 'in-progress'
]);

const dueSet = new Set([
  'due', 'unpaid', 'failed', 'canceled', 'cancelled', 'declined', 'expired'
]);

function PaymentPill({ status }: { status: PaymentStatus }) {
  const isUnpaid = status === 'Unpaid';
  return (
    <span
      className={`inline-block rounded px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium ${
        isUnpaid ? 'bg-red-500 text-white' : 'bg-green-100 text-green-700'
      }`}
    >
      {status}
    </span>
  );
}

function OrderStatusPill({ status }: { status: OrderStatus }) {
  const cls =
    status === 'Confirm'
      ? 'bg-green-100 text-green-700'
      : status === 'Pending'
      ? 'bg-yellow-100 text-yellow-700'
      : 'bg-rose-100 text-rose-700';
  return (
    <span className={`inline-block rounded px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium ${cls}`}>
      {status}
    </span>
  );
}

// ---- API token payload type ----
type PaymentsDecoded = {
  data?: Array<{
    id?: number;
    created_at?: string;
    payment_status?: string;   // e.g. paid | confirm | pending | due | ...
    payment_type?: string;
    amount?: number;
    number?: string;
    status?: boolean;
    course_id?: {
      id?: number;
      title?: string;
      slug?: string;
      course_thumbnail?: string;
      price?: number;
      offer_price?: number;
      course_type?: { type_name?: string } | null;
      course_level?: { level_name?: string } | null;
    } | null;
  }>;
};

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'online' | 'offline'>('online');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const [onlineOrders, setOnlineOrders] = useState<Order[]>([]);
  const [offlineOrders, setOfflineOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        // backend returns { data: { token } } ; token = JWT containing payments
        const res = await api.get('/payments', { params: { depth: 3 } });
        const token: string | undefined = res?.data?.data?.token;
        if (!token) throw new Error('Token not found');

        const decoded = jwtDecode<PaymentsDecoded>(token);
        const rows = decoded?.data ?? [];

        const mapped: Order[] = rows.map((p, idx) => {
          const c = p?.course_id ?? {};
          const title = c?.title || 'Untitled Course';
          const badge = c?.course_level?.level_name || c?.course_type?.type_name || 'COURSE';

          const total = typeof p?.amount === 'number' ? p!.amount! : 0;
          const showOriginal = typeof c?.price === 'number' && c?.price! > total;
          const originalPrice = showOriginal ? c?.price : c?.offer_price;

          // ---------- core fix: robust mapping ----------
          const ps = norm(p?.payment_status);

          // Free purchase হলে paid হিসেবে ধরলাম
          const isPaid = paidSet.has(ps) || total === 0;
          const isPending = pendingSet.has(ps);
          // (fallback) যদি কিছুই ম্যাচ না করে আর dueSet-এও না থাকে, তখন unpaid ধরবো
          const isDue = dueSet.has(ps) || (!isPaid && !isPending);

          const pay: PaymentStatus = isPaid ? 'Paid' : 'Unpaid';

          let ostatus: OrderStatus;
          if (isPaid) ostatus = 'Confirm';
          else if (isPending) ostatus = 'Pending';
          else ostatus = 'Due';
          // ---------- end fix ----------

          const id = p?.number || `ORD-${p?.id || idx + 1}`;
          const date = p?.created_at
            ? new Date(p.created_at).toLocaleDateString('bn-BD', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              })
            : '';

          const item: OrderItem = {
            title,
            subtitle: c?.slug ? `Slug: ${c.slug}` : 'Course',
            badge,
            price: total > 0 ? total : 'Free',
            originalPrice: typeof originalPrice === 'number' ? originalPrice : undefined,
            image: c?.course_thumbnail || undefined,
            slug: c?.slug,
          };

          return {
            id,
            date,
            payment: pay,
            status: ostatus,
            total: total,
            originalPrice: typeof originalPrice === 'number' ? originalPrice : undefined,
            items: [item],
          };
        });

        const online: Order[] = [];
        const offline: Order[] = [];
        mapped.forEach((o, i) => {
          const raw = rows[i]?.course_id;
          const typeName = raw?.['course_type'] && (raw?.['course_type'] as any)?.type_name;
          const bucket = (typeName || '').toLowerCase() === 'online' ? online : offline;
          bucket.push(o);
        });

        setOnlineOrders(online);
        setOfflineOrders(offline);

        if (online.length > 0) setExpandedOrder(online[0].id);
        else if (offline.length > 0) setExpandedOrder(offline[0].id);
        else setExpandedOrder(null);
      } catch (e: any) {
        setErr(e?.message || 'Failed to load payments');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const orders = useMemo(
    () => (activeTab === 'online' ? onlineOrders : offlineOrders),
    [activeTab, onlineOrders, offlineOrders]
  );

  const toggleOrder = (id: string) => setExpandedOrder((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen">
      <header className="top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <button type="button" aria-label="Go back" className="rounded-lg">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="cursor-pointer text-[#111827] text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>
            </button>
            <h1 className="text-lg sm:text-xl text-gray-800 font-semibold">My Order</h1>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white" role="tablist">
        <div className="max-w-7xl border-b border-gray-200 mx-auto px-4">
          <div className="flex gap-6 sm:gap-10">
            <button
              role="tab"
              aria-selected={activeTab === 'online'}
              className={`relative py-3 sm:py-4 text-sm sm:text-base font-medium transition-colors ${
                activeTab === 'online' ? 'text-green-600' : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('online')}
            >
              Online orders
              {activeTab === 'online' && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-green-600" />}
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'offline'}
              className={`relative py-3 sm:py-4 text-sm sm:text-base font-medium transition-colors ${
                activeTab === 'offline' ? 'text-green-600' : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('offline')}
            >
              Offline orders
              {activeTab === 'offline' && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-green-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        {loading && (
          <div className="rounded-lg bg-white p-8 text-center text-gray-500">
            লোড হচ্ছে…
          </div>
        )}
        {err && !loading && (
          <div className="rounded-lg bg-white p-8 text-center text-red-600">
            {err}
          </div>
        )}
        {!loading && !err && (orders.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center text-gray-500">
            No {activeTab} orders found
          </div>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => {
              const isOpen = expandedOrder === order.id;
              return (
                <li key={order.id} className="rounded-lg border border-gray-200">
                  <button type="button" onClick={() => toggleOrder(order.id)} className="w-full text-left hover:bg-gray-50 transition-colors">
                    <div className="w-full overflow-x-auto sm:overflow-visible">
                      <div className="min-w-[720px] p-3 sm:p-4">
                        <div className="flex justify-between items-start sm:items-center gap-3 sm:gap-4">
                          <div>
                            <div className="text-base text-gray-700 mb-1">অর্ডার আইডি</div>
                            <div className="text-sm text-gray-700 font-medium">{order.id}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">অর্ডার তারিখ</div>
                            <div className="text-sm font-medium text-gray-700">{order.date}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Payment</div>
                            <PaymentPill status={order.payment} />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Order Status</div>
                            <OrderStatusPill status={order.status} />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Total</div>
                            <div className="flex items-baseline gap-2">
                              <span className="font-bold text-base text-gray-700 sm:text-lg">
                                {bdt(order.total)}
                              </span>
                              {order.originalPrice && (
                                <span className="text-xs sm:text-sm text-gray-400 line-through">
                                  {bdt(order.originalPrice)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-t-gray-200">
                      <div className="w-full overflow-x-auto sm:overflow-visible">
                        <div className="min-w-[720px]">
                          {order.items.map((it, i) => (
                            <div key={`${order.id}-${i}`} className="p-3 sm:p-4 border-b-gray-100 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                              <div className="flex gap-3 sm:gap-4 justify-between">
                                <div className="flex flex-row gap-4">
                                  <div className="flex-shrink-0">
                                    {it.image ? (
                                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-lg">
                                        <Image src={it.image} alt={it.title} fill sizes="56px" className="object-cover" />
                                      </div>
                                    ) : (
                                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-lg flex items-center justify-center text-white text-[9px] sm:text-[10px] font-bold p-1 text-center leading-tight">
                                        {it.badge}
                                      </div>
                                    )}
                                  </div>

                                  <div className="min-w-0">
                                    <h3 className="text-sm sm:text-base font-medium mb-1 text-gray-700 line-clamp-2">
                                      {it.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                                      {it.subtitle}
                                    </p>
                                    {it.slug ? (
                                      <a href={`/courses/${it.slug}`} className="text-green-600 text-xs sm:text-sm hover:underline inline-flex items-center gap-1">
                                        কোর্সটি দেখুন <span className="text-base leading-none">→</span>
                                      </a>
                                    ) : (
                                      <button type="button" className="text-green-600 text-xs sm:text-sm hover:underline inline-flex items-center gap-1">
                                        কোর্সটি দেখুন <span className="text-base leading-none">→</span>
                                      </button>
                                    )}
                                  </div>
                                </div>

                                <div className="flex-shrink-0 text-right">
                                  <div className="text-xs text-gray-500 mb-1">Total</div>
                                  <div className="text-sm sm:text-base font-bold text-gray-700">
                                    {it.price === 'Free' ? 'Free' : bdt(it.price)}
                                  </div>
                                  {typeof it.price === 'number' && it.originalPrice && (
                                    <div className="text-xs text-gray-400 line-through">
                                      {bdt(it.originalPrice)}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ))}
      </main>
    </div>
  );
}
