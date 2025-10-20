'use client';

import { useEffect, useCallback, useMemo, useState } from 'react';
import { Check, ShoppingCart, CreditCard, Phone, Copy } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { getCurrentUserId, isLoggedIn, loginUser } from '@/lib/api';
import { url } from '@/lib/api/baseurl';

type Step = 'confirmation' | 'details' | 'payment';
type PaymentMethod = 'bkash' | 'card';

interface Product {
  id: string;            // course id as string (URL / storage থেকে যেমন আসে)
  name: string;          // course title (bn)
  nameEn: string;        // course title (en) বা slug
  image: string;         // emoji বা URL
  originalPrice: number; // MRP
  discountedPrice: number; // Offer
  quantity: number;
}

// ✅ backend enum mapping (প্রয়োজনে মান বদলান)
const PAYMENT_METHOD_MAP: Record<PaymentMethod, number> = {
  bkash: 32,
  card: 1,
};

// ✅ user.id নেওয়ার ছোট util


export default function CheckoutSystem() {
  // ======= UI States =======
  const [currentStep, setCurrentStep] = useState<Step>('confirmation');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');

  const [products, setProducts] = useState<Product[]>([
    // fallback (কিছু না এলে)
    {
      id: '1',
      name: 'বিসিএস প্রিলি রেকর্ডেড কোর্স',
      nameEn: 'BCS Preli Recorded Course',
      image: '📚',
      originalPrice: 3000,
      discountedPrice: 2500,
      quantity: 1,
    },
  ]);

  // Auth form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Terms + misc
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [savePhoneForNext, setSavePhoneForNext] = useState(false);

  // Payment call states
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  // ======= Hydrate products: URL(item) → sessionStorage → fallback =======
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const safeSet = (list: Product[] | null | undefined) => {
      if (Array.isArray(list) && list.length > 0) setProducts(list);
    };

    // 1) try from URL ?item=
    try {
      const params = new URLSearchParams(window.location.search);
      const item = params.get('item');
      if (item) {
        const decoded = JSON.parse(decodeURIComponent(item));

        const one: Product = {
          id: String(decoded?.id ?? 'course-1'),
          // name: prefer payload.name then title
          name: String(decoded?.name ?? decoded?.title ?? 'কোর্স'),
          // nameEn: prefer payload.nameEn then slug
          nameEn: String(decoded?.nameEn ?? decoded?.slug ?? 'Course'),
          image: String(decoded?.image ?? '📚'),
          originalPrice: Number(decoded?.originalPrice ?? decoded?.discountedPrice ?? 0),
          discountedPrice: Number(decoded?.discountedPrice ?? decoded?.originalPrice ?? 0),
          quantity: Number(decoded?.quantity ?? 1),
        };

        safeSet([one]);
        try { sessionStorage.setItem('checkout_course', JSON.stringify(one)); } catch {}
        return;
      }
    } catch {
      /* ignore URL parse errors */
    }

    // 2) try from sessionStorage (array first)
    try {
      const arrRaw = sessionStorage.getItem('checkout_products');
      if (arrRaw) {
        const arr = JSON.parse(arrRaw);
        if (Array.isArray(arr) && arr.length) {
          const cleaned: Product[] = arr.map((p: any, i: number) => ({
            id: String(p?.id ?? `p-${i + 1}`),
            name: String(p?.name ?? 'কোর্স'),
            nameEn: String(p?.nameEn ?? 'Course'),
            image: String(p?.image ?? '📚'),
            originalPrice: Number(p?.originalPrice ?? p?.discountedPrice ?? 0),
            discountedPrice: Number(p?.discountedPrice ?? p?.originalPrice ?? 0),
            quantity: Number(p?.quantity ?? 1),
          }));
          safeSet(cleaned);
          return;
        }
      }

      // 3) try single item
      const raw = sessionStorage.getItem('checkout_course');
      if (raw) {
        const p = JSON.parse(raw);
        const one: Product = {
          id: String(p?.id ?? 'course-1'),
          name: String(p?.name ?? 'কোর্স'),
          nameEn: String(p?.nameEn ?? 'Course'),
          image: String(p?.image ?? '📚'),
          originalPrice: Number(p?.originalPrice ?? p?.discountedPrice ?? 0),
          discountedPrice: Number(p?.discountedPrice ?? p?.originalPrice ?? 0),
          quantity: Number(p?.quantity ?? 1),
        };
        safeSet([one]);
        return;
      }
    } catch {
      /* ignore storage parse errors */
    }
  }, []);

  // ======= Totals =======
  const subtotal = useMemo(
    () => products.reduce((sum, p) => sum + p.discountedPrice * (p.quantity ?? 1), 0),
    [products]
  );
  const discount = useMemo(
    () => products.reduce((sum, p) => sum + (p.originalPrice - p.discountedPrice) * (p.quantity ?? 1), 0),
    [products]
  );
  const total = subtotal;

  // ======= Stepper helpers =======
  const orderId = 'TMS49575881';
  const steps = [
    { id: 'confirmation', label: 'অর্ডার কনফার্মেশন', labelEn: 'Order Confirmation' },
    { id: 'details', label: 'লগ ইন', labelEn: 'Login' },
    { id: 'payment', label: 'পেমেন্ট', labelEn: 'Payment' },
  ] as const;

  const getStepNumber = (step: Step): number => steps.findIndex((s) => s.id === step) + 1;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const step = params.get('step');
      if (step === 'payment') {
        setCurrentStep(isLoggedIn() ? 'payment' : 'details');
      }
    } catch {}
  }, []);

  const goNextFromConfirmation = useCallback(() => {
    if (isLoggedIn()) setCurrentStep('payment');
    else setCurrentStep('details');
  }, []);

  useEffect(() => {
    if (currentStep === 'payment' && !isLoggedIn()) {
      setCurrentStep('details');
    }
  }, [currentStep]);

  useEffect(() => {
    const onAuthChanged = () => {
      if (isLoggedIn()) setCurrentStep('payment');
    };
    window.addEventListener('auth:changed', onAuthChanged);
    return () => window.removeEventListener('auth:changed', onAuthChanged);
  }, []);

  // ======= Login =======
  const handleInlineLogin = async () => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      await loginUser(email.trim(), password);
      setCurrentStep('payment');
    } catch (e: any) {
      const msg =
        e?.response?.data?.detail ||
        e?.response?.data?.message ||
        'লগইন ব্যর্থ হয়েছে। ইমেইল/পাসওয়ার্ড চেক করুন।';
      setAuthError(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  // ======= Payment =======
const handlePay = async () => {
  if (!agreedToTerms || paying) return;

  // ✅ আগে লগইন নিশ্চিত করুন
  const token =
    localStorage.getItem('access_token') ||
    sessionStorage.getItem('access_token');
  const user_id = getCurrentUserId();

  if (!token || !user_id) {
    setPayError('পেমেন্টের আগে লগইন করুন।');
    setCurrentStep('details');
    return;
  }

  setPayError(null);
  setPaying(true);

  try {
    const first = products[0];
    const course_id = Number.isFinite(Number(first?.id)) ? Number(first.id) : 0;
    if (!course_id) throw new Error('সঠিক কোর্স আইডি পাওয়া যায়নি।');

    // ✅ কেবল প্রয়োজনীয় ফিল্ড পাঠান
    const payload = {
  payment_status: 'pending',
  payment_type: 'full',
  amount: Number(
    products.reduce((s, p) => s + p.discountedPrice * (p.quantity ?? 1), 0)
  ),
  number: "01794003055",            // ✅ শুধু একবার থাকবে
  transaction_id: '',               // গেটওয়ে থেকে পেলে আপডেট করবে
  payment_method: PAYMENT_METHOD_MAP[paymentMethod],
  course_id,
  installation_status: [] as number[],
  payment_way: "manual",
};

    const res = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  // ✅ টোকেন পাঠাচ্ছি
      },
      body: JSON.stringify(payload),
    });
console.log(res)
    const data = await res.json();
    if (res.ok) {
      window.location.href = "/user/dashboard";
      return;
    }
    if (!res.ok) {
      // backend যে ফরম্যাট দেয় সেটা দেখান
      throw new Error(data?.error || data?.detail || data?.message || 'পেমেন্ট ইনিশিয়ালাইজ করতে সমস্যা হয়েছে।');
    }

   

    if (data?.redirect_url) {
      window.location.href = data.redirect_url;
      return;
    }

    console.log('Payment created:', data);
    alert('পেমেন্ট ইনিশিয়ালাইজ সম্পন্ন হয়েছে।');
  } catch (err: any) {
    setPayError(err?.message || 'কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।');
  } finally {
    setPaying(false);
  }
};


  // ======= Views =======
  const renderStepIndicator = () => (
    <div className="mb-8 md:mb-12">
      <div className="flex items-center justify-between max-w-3xl mx-auto lg:px-4">
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const currentStepNum = getStepNumber(currentStep);
          const isComplete = stepNum < currentStepNum;
          const isCurrent = stepNum === currentStepNum;

        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all  ${
                  isComplete
                    ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                    : isCurrent
                    ? 'bg-gradient-to-br from-green-500 to-green-600 text-white ring-4 ring-green-100'
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                }`}
              >
                {isComplete ? <Check className="w-6 h-6" /> : stepNum}
              </div>
              <div className="mt-3 text-center px-2">
                <div
                  className={`text-nowrap text-xs md:text-sm font-semibold ${
                    isCurrent ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </div>
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`h-0.5 md:h-1 flex-1 mx-2 md:mx-4 transition-all rounded-full ${
                  stepNum < currentStepNum ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
        })}
      </div>
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="lg:bg-white rounded-lg  lg:p-6">
        <h2 className="text-xl text-gray-900 font-bold mb-4 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          অর্ডার কনফার্মেশন
        </h2>

        {products.map((product) => (
          <div key={product.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg mb-4">
            <div className="text-4xl">
              {/^https?:\/\//.test(product.image)
                ? <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover inline-block align-middle" />
                : product.image}
            </div>

            <div className="flex-1">
              <h3 className="font-medium text-xl text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.nameEn}</p>
              <div className="mt-2">
                <span className="text-gray-400 line-through text-sm">৳{product.originalPrice}</span>
                <span className="text-green-600 font-bold ml-2">৳{product.discountedPrice}</span>
                {product.quantity > 1 && (
                  <span className="ml-2 text-xs text-gray-500">× {product.quantity}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:bg-white rounded-lg p-0 lg:p-6">
        <h3 className="font-bold text-gray-900 text-lg mb-4">{products[0]?.name ?? 'আমার কার্ট'}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">মোট</span>
            <span className="font-medium text-gray-700">৳{subtotal}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>ডিসকাউন্ট</span>
            <span>-৳{discount}</span>
          </div>
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <div className="w-5 h-5 rounded-full border-2 border-green-600 flex items-center justify-center">
              <Check className="w-3 h-3" />
            </div>
            <span>প্রোমো কোড প্রয়োগ করুন</span>
          </div>
        </div>

        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between items-center text-lg font-bold">
            <span className=" text-gray-500">
              সর্বমোট <span className="text-sm font-normal text-gray-500">(ভ্যাট সহ)</span>
            </span>
            <span className="text-green-600">৳{total}</span>
          </div>
        </div>

        <button
          onClick={goNextFromConfirmation}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition-colors"
        >
          শুরু করুন
        </button>
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="lg:bg-white rounded-lg  lg:p-6">
        <h2 className="text-xl text-gray-900 font-bold mb-4 flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          অর্ডার কনফার্মেশন
        </h2>

        {products.map((product) => (
          <div key={product.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg mb-4">
            <div className="text-4xl">
              {/^https?:\/\//.test(product.image)
                ? <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover inline-block align-middle" />
                : product.image}
            </div>

            <div className="flex-1">
              <h3 className="font-medium text-xl text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.nameEn}</p>
              <div className="mt-2">
                <span className="text-gray-400 line-through text-sm">৳{product.originalPrice}</span>
                <span className="text-green-600 font-bold ml-2">৳{product.discountedPrice}</span>
                {product.quantity > 1 && (
                  <span className="ml-2 text-xs text-gray-500">× {product.quantity}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:bg-white rounded-lg  lg:p-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4">
          পেমেন্ট সম্পন্ন করতে লগ ইন করুন
        </h3>

        <div className="mb-4">
          <Label className="block text-sm text-gray-700 font-medium mb-2">ইমেইল</Label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-gray-600 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-6">
          <Label className="block text-sm text-gray-700 font-medium mb-2">পাসওয়ার্ড</Label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-gray-600 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {authError && <p className="text-sm text-red-600 mb-3">{authError}</p>}

        <button
          onClick={handleInlineLogin}
          disabled={!email || !password || authLoading}
          className="w-full bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          {authLoading ? 'লগ ইন হচ্ছে...' : 'লগ ইন করুন'}
        </button>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="max-w-6xl mx-auto">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-700">অর্ডার কনফার্মেশন</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5 text-green-600" />
          <span className="font-medium text-gray-700">পেমেন্ট</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="lg:bg-white rounded-lg  lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">অর্ডার আইডি {orderId}</h2>
            <button onClick={handleCopyOrderId} className="p-2 hover:bg-gray-100 rounded transition-colors">
              <Copy className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="space-y-3 mb-4">
            {products.map((product, idx) => (
              <div key={product.id}>
                <div className="flex justify-between">
                  <span className="text-gray-700">{product.name}</span>
                  <span className="font-medium text-gray-700">৳{product.originalPrice}</span>
                </div>
                {idx < products.length - 1 && (
                  <div className="text-sm text-gray-500 ml-4">{product.nameEn}</div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>সাব টোটাল</span>
              <span>৳{subtotal}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>টোটাল ডিসকাউন্ট</span>
              <span>-৳{discount}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span className="  text-gray-700">
                সর্বমোট <span className="text-sm font-normal text-gray-500">(ভ্যাট সহ)</span>
              </span>
              <span className="  text-gray-700">৳{total}</span>
            </div>
          </div>
        </div>

        <div className="lg:bg-white rounded-lg  lg:p-6">
          <div className="mb-6">
            <h3 className="font-bold text-gray-600 text-lg mb-4 flex items-center gap-2">পেমেন্ট যেভাবে সিলেক্ট করুন</h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer border-gray-200">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="bkash"
                    checked={paymentMethod === 'bkash'}
                    onChange={() => setPaymentMethod('bkash')}
                    className="w-4 h-4"
                  />
                  <span className="font-medium text-gray-700">বিকাশ</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-pink-500 font-bold text-xl">bKash</span>
                  <span className="text-xs bg-pink-500 text-white px-2 py-1 rounded">Payment</span>
                </div>
              </label>

              {paymentMethod === 'bkash' && (
                <div className="ml-7 p-4 bg-gray-50 rounded-lg">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={savePhoneForNext}
                      onChange={(e) => setSavePhoneForNext(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">বিকাশ ফোন নাম্বারটি সেভ করুন</span>
                  </label>
                </div>
              )}

              <label className="flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors border-gray-200">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="w-4 h-4"
                  />
                  <span className="font-medium text-gray-500">অন্যান্য পেমেন্ট মাধ্যম</span>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='20' viewBox='0 0 32 20'%3E%3Crect fill='%23ff5f00' width='32' height='20' rx='2'/%3E%3C/svg%3E"
                    alt="Mastercard"
                    className="w-8 h-5"
                  />
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='20' viewBox='0 0 32 20'%3E%3Crect fill='%231434CB' width='32' height='20' rx='2'/%3E%3C/svg%3E"
                    alt="Visa"
                    className="w-8 h-5"
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 w-full ">
              <div className="flex justify-center items-center  w-full lg:w-1/2  gap-2 p-3 border border-gray-200 rounded-lg">
                <Phone className="w-5 h-5 text-gray-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-gray-700">যেকোনো সমস্যা দিলে</div>
                  <div className="text-green-600">কল করুন 16910 নম্বরে</div>
                </div>
              </div>

              <div className="flex justify-center items-center  w-full lg:w-1/2  gap-2 p-3 border border-gray-200 rounded-lg">
                <CreditCard className="w-5 h-5 text-gray-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-gray-600">জরুরী সাহায্য/রির্সে পেতে লিখুন</div>
                  <div className="text-green-600">পেমেন্ট লিংক শেয়ার করুন</div>
                </div>
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5"
              />
              <span className="text-gray-600">
                আমি এই ক্যাম্পেইনের <a href="#" className="text-green-600 underline">রিফান্ডের নীতিমালা</a> ও{' '}
                <a href="#" className="text-green-600 underline">প্রোগ্রামিং নীতিমালা</a> পড়েছে সম্মতি দিচ্ছি।
              </span>
            </label>

            {payError && <p className="text-sm text-red-600">{payError}</p>}
          </div>

          <button
            onClick={handlePay}
            disabled={!agreedToTerms || paying}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            <span>{paying ? 'পেমেন্ট হচ্ছে...' : 'পেমেন্ট করুন'}</span>
            <span>৳{total}</span>
          </button>
        </div>
      </div>
    </div>
  );

  // ======= Render root =======
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className=" text-lg lg:text-2xl font-bold text-gray-800">আমার কার্ট</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {renderStepIndicator()}
        {currentStep === 'confirmation' && renderConfirmationStep()}
        {currentStep === 'details' && renderDetailsStep()}
        {currentStep === 'payment' && renderPaymentStep()}
      </div>
    </div>
  );
}
