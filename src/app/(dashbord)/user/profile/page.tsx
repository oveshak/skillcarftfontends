"use client";

import React, { useMemo, useState } from "react";
import { Edit3, Plus, Phone, Mail, MapPin, User, X, Link as LinkIcon, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";

/**
 * Drop this file as app/profile/page.tsx (App Router) or any client component.
 * Requires TailwindCSS and lucide-react. Fully responsive. TypeScript-ready.
 *
 * Added per request:
 *  - Qualification, Work Experience, Educational Experience sections
 *  - Connected Social Media
 *  - Guardian / Emergency Contacts
 * Each section opens a modal to add detailed items.
 */

// ---------- Types ----------
interface Profile {
  name: string;
  phone: string;
  email: string;
  id: string;
  address: string;
  tags: string[];
  notes: string;
  accounts: string[]; // e.g. card numbers or bkash/ac numbers
  highlights: string[]; // bullets in the big paragraph card

  qualifications: Qualification[];
  experiences: Experience[];
  eduExperiences: EducationExp[];
  socials: SocialLink[];
  guardians: Guardian[];
}

interface Qualification {
  degree: string; // e.g., BSc in CSE
  institute: string;
  sessionOrYear: string; // e.g., 2019-2023
  grade?: string; // CGPA/Division (optional)
}

interface Experience {
  company: string;
  role: string;
  from: string; // e.g., Jan 2022
  to: string;   // e.g., Present / Dec 2024
  details?: string; // short description
}

interface EducationExp {
  title: string; // e.g., Research Assistant, Teaching Fellow
  org: string;   // University/Dept
  from: string;
  to: string;
  details?: string;
}

interface SocialLink {
  platform: string; // Facebook, LinkedIn, GitHub, X, etc.
  handle: string;   // @username or custom text
  url: string;      // https://...
}

interface Guardian {
  name: string;
  relation: string; // Father/Mother/Uncle/etc.
  phone: string;
  altPhone?: string;
}

// ---------- Small helpers ----------
const prettyMask = (value: string) => {
  const clean = value.replace(/\s+/g, "");
  if (clean.length <= 4) return value;
  return `${"•".repeat(Math.max(0, clean.length - 4))}${clean.slice(-4)}`.replace(/(.{4})/g, "$1 ");
};

// ---------- Modal Component ----------
function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-2xl bg-white ">
        <div className="flex items-center justify-between px-5 py-4">
          <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
          <button onClick={onClose} className="text-gray-600 rounded-full p-1 hover:bg-gray-100" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-5 pb-5 pt-4">{children}</div>
      </div>
    </div>
  );
}

// ---------- Field + Label ----------
function LabeledInput({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; }) {
  return (
    <label className="grid gap-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <input
        type={type}
        className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function LabeledTextArea({ label, value, onChange, rows = 3, placeholder }: { label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string; }) {
  return (
    <label className="grid gap-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <textarea
        rows={rows}
        className="w-full resize-y rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

// ---------- Chip ----------
function Chip({ text, onRemove }: { text: string; onRemove?: () => void }) {
  return (
    <span className="inline-flex items-center gap-2 text-gray-500 rounded-full border border-gray-300 px-3 py-1 text-sm">
      {text}
      {onRemove && (
        <button onClick={onRemove} className="rounded-full p-0.5 text-gray-500  " aria-label="remove">
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </span>
  );
}

// ---------- Main Page ----------
export default function ProfileDashboard() {
  const [data, setData] = useState<Profile>({
    name: "OVE",
    phone: "+8801555555555",
    email: "ove@example.com",
    id: "ID-20252025",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    tags: ["এক্টিভ", "স্টুডেন্ট", "VIP"],
    notes:
      "Education is the most powerful weapon which you can use to change the world — Nelson Mandela.",
    accounts: ["017XXXXXXXX", "013XXXXXXXX", "5555 5555 5555 5555"],
    highlights: [
      "Declaration ডকুমেন্ট আপলোড",
      "Faster KYC Tracking",
      "Service note যোগ করুন",
    ],
    qualifications: [],
    experiences: [],
    eduExperiences: [],
    socials: [],
    guardians: [],
  });

  const maskedAccounts = useMemo(() => data.accounts.map(prettyMask), [data.accounts]);

  // Modal states
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [openAccounts, setOpenAccounts] = useState(false);
  const [openTags, setOpenTags] = useState(false);

  const [openQual, setOpenQual] = useState(false);
  const [openExp, setOpenExp] = useState(false);
  const [openEduExp, setOpenEduExp] = useState(false);
  const [openSocial, setOpenSocial] = useState(false);
  const [openGuardian, setOpenGuardian] = useState(false);

  // Local edit buffers
  const [buf, setBuf] = useState<any>({});

  // Handlers
  const startEdit = (which:
    | "profile" | "notes" | "accounts" | "tags"
    | "qual" | "exp" | "eduexp" | "social" | "guardian") => {
    switch (which) {
      case "profile": setBuf({ ...data }); setOpenProfile(true); break;
      case "notes": setBuf({ notes: data.notes }); setOpenNotes(true); break;
      case "accounts": setBuf({ accounts: [...data.accounts] }); setOpenAccounts(true); break;
      case "tags": setBuf({ tags: [...data.tags] }); setOpenTags(true); break;
      case "qual": setBuf({ qualifications: [...data.qualifications] }); setOpenQual(true); break;
      case "exp": setBuf({ experiences: [...data.experiences] }); setOpenExp(true); break;
      case "eduexp": setBuf({ eduExperiences: [...data.eduExperiences] }); setOpenEduExp(true); break;
      case "social": setBuf({ socials: [...data.socials] }); setOpenSocial(true); break;
      case "guardian": setBuf({ guardians: [...data.guardians] }); setOpenGuardian(true); break;
    }
  };

  const save = (which:
    | "profile" | "notes" | "accounts" | "tags"
    | "qual" | "exp" | "eduexp" | "social" | "guardian") => {
    if (which === "profile") setData((d) => ({ ...d, name: buf.name, phone: buf.phone, email: buf.email, id: buf.id, address: buf.address }));
    if (which === "notes") setData((d) => ({ ...d, notes: buf.notes }));
    if (which === "accounts") setData((d) => ({ ...d, accounts: buf.accounts }));
    if (which === "tags") setData((d) => ({ ...d, tags: buf.tags }));
    if (which === "qual") setData((d) => ({ ...d, qualifications: buf.qualifications }));
    if (which === "exp") setData((d) => ({ ...d, experiences: buf.experiences }));
    if (which === "eduexp") setData((d) => ({ ...d, eduExperiences: buf.eduExperiences }));
    if (which === "social") setData((d) => ({ ...d, socials: buf.socials }));
    if (which === "guardian") setData((d) => ({ ...d, guardians: buf.guardians }));

    setOpenProfile(false); setOpenNotes(false); setOpenAccounts(false); setOpenTags(false);
    setOpenQual(false); setOpenExp(false); setOpenEduExp(false); setOpenSocial(false); setOpenGuardian(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Banner */}
      <section className="relative">
        <div className="h-28 w-full bg-[radial-gradient(circle_at_20%_20%,#ffedd5,transparent_60%),radial-gradient(circle_at_80%_30%,#ffe4e6,transparent_55%),linear-gradient(90deg,#ff7b39,#ffb703)]" />
        <div className="container mx-auto -mt-10 px-4">
          {/* Profile Card */}
          <div className="rounded-2xl bg-white p-5  md:p-6">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-black text-white ">
                  <span className="text-lg font-semibold">App</span>
                </div>
                <div>
                  <h1 className="text-xl text-gray-700 font-semibold sm:text-2xl">{data.name}</h1>
                  <p className="mt-1 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="inline-flex items-center gap-1"><Phone className="h-4 w-4" />{data.phone}</span>
                    <span className="inline-flex items-center gap-1"><Mail className="h-4 w-4" />{data.email}</span>
                    <span className="inline-flex items-center gap-1"><User className="h-4 w-4" />{data.id}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => startEdit("profile")} className="rounded-xl border border-gray-300 text-gray-700 px-3 py-2 text-sm font-medium hover:bg-gray-50">
                  <span className="inline-flex items-center gap-2"><Edit3 className="h-4 w-4" /> প্রোফাইল এডিট</span>
                </button>
              </div>
            </div>
            <p className="mt-4 inline-flex items-start gap-2 text-gray-700">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" /> {data.address}
            </p>
          </div>
        </div>
      </section>

      {/* Body Grid */}
      <section className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Left (2 cols) */}
          <div className="grid gap-6 xl:col-span-2">
            {/* Notes / Quote */}
            <CardShell title="হাইলাইটস & নোটস" onEdit={() => startEdit("notes")}>
              <ul className="mb-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {data.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
              <p className="rounded-xl bg-orange-50 p-3 text-[15px] leading-relaxed text-gray-800">{data.notes}</p>
            </CardShell>

            {/* Accounts */}
            <CardShell title="পেমেন্ট / অ্যাকাউন্ট নম্বর" onEdit={() => startEdit("accounts")}>
              <div className="flex flex-wrap gap-3">
                {maskedAccounts.map((a, i) => (
                  <span key={i} className="rounded-xl bg-gray-50 px-3 py-2 font-mono text-sm text-gray-500">{a}</span>
                ))}
              </div>
            </CardShell>

            {/* Qualification */}
            <CardShell title="Qualification" onEdit={() => startEdit("qual")}>
              {data.qualifications.length === 0 ? (
                <EmptyText text="কোনো ডেটা নেই। Edit করে যোগ করুন." />
              ) : (
                <div className="grid gap-3">
                  {data.qualifications.map((q, i) => (
                    <div key={i} className="rounded-xl border p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <strong className="text-sm">{q.degree}</strong>
                        <span className="text-xs text-gray-600">{q.sessionOrYear}{q.grade ? ` • ${q.grade}` : ""}</span>
                      </div>
                      <div className="text-sm text-gray-700">{q.institute}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardShell>

            {/* Work Experience */}
            <CardShell title="Work Experience" onEdit={() => startEdit("exp")}>
              {data.experiences.length === 0 ? (
                <EmptyText text="কোনো অভিজ্ঞতা যোগ করা হয়নি। Edit করে যোগ করুন." />
              ) : (
                <div className="grid gap-3">
                  {data.experiences.map((e, i) => (
                    <div key={i} className="rounded-xl border p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <strong className="text-sm">{e.role} — {e.company}</strong>
                        <span className="text-xs text-gray-600">{e.from} – {e.to}</span>
                      </div>
                      {e.details && <p className="mt-1 text-sm text-gray-700">{e.details}</p>}
                    </div>
                  ))}
                </div>
              )}
            </CardShell>

            {/* Educational Experience */}
            <CardShell title="Educational Experience" onEdit={() => startEdit("eduexp")}>
              {data.eduExperiences.length === 0 ? (
                <EmptyText text="কিছু যোগ করুন (RA/TA, Projects, Fellowships ইত্যাদি)।" />
              ) : (
                <div className="grid gap-3">
                  {data.eduExperiences.map((e, i) => (
                    <div key={i} className="rounded-xl border p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <strong className="text-sm">{e.title} — {e.org}</strong>
                        <span className="text-xs text-gray-600">{e.from} – {e.to}</span>
                      </div>
                      {e.details && <p className="mt-1 text-sm text-gray-700">{e.details}</p>}
                    </div>
                  ))}
                </div>
              )}
            </CardShell>
          </div>

          {/* Right (1 col) */}
          <div className="grid gap-6">
            {/* Tags */}
            <CardShell title="ট্যাগ ও ফিল্টার" onEdit={() => startEdit("tags")}>
              <div className="flex flex-wrap gap-2">
                {data.tags.map((t, i) => (
                  <Chip key={i} text={t} />
                ))}
              </div>
            </CardShell>

            {/* Socials */}
            <CardShell title="Connected Social Media" onEdit={() => startEdit("social")}>
              {data.socials.length === 0 ? (
                <EmptyText text="সোশাল লিঙ্ক যোগ করুন (Facebook, LinkedIn, GitHub...)" />
              ) : (
                <div className="grid gap-3">
                  {data.socials.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border px-3 py-2 hover:bg-gray-50">
                      <span className="flex items-center gap-2"><LinkIcon className="h-4 w-4" /> {s.platform} — {s.handle}</span>
                      <span className="text-xs text-gray-500 truncate max-w-[40%]">{s.url}</span>
                    </a>
                  ))}
                </div>
              )}
            </CardShell>

            {/* Guardian / Emergency */}
            <CardShell title="অভিভাবক / ইমারজেন্সি নাম্বার" onEdit={() => startEdit("guardian")}>
              {data.guardians.length === 0 ? (
                <EmptyText text="জরুরি যোগাযোগ যোগ করুন।" />
              ) : (
                <div className="grid gap-3">
                  {data.guardians.map((g, i) => (
                    <div key={i} className="flex items-start justify-between rounded-xl border p-3">
                      <div>
                        <div className="font-medium">{g.name} <span className="text-xs text-gray-600">({g.relation})</span></div>
                        <div className="text-sm text-gray-700">{g.phone}{g.altPhone ? `, ${g.altPhone}` : ""}</div>
                      </div>
                      <ShieldAlert className="mt-1 h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              )}
            </CardShell>

            {/* Quick Actions */}
            <div className="rounded-2xl bg-white  lg:p-5 ">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-600">দ্রুত অ্যাকশন</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <ActionButton text="নতুন ডক" />
                <ActionButton text="মেসেজ" />
                <ActionButton text="ফলো-আপ" />
                <ActionButton text="কল" />
                <ActionButton text="রিমাইন্ডার" />
                <ActionButton text="আরও" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------- Modals -------- */}
      <Modal open={openProfile} onClose={() => setOpenProfile(false)} title="প্রোফাইল আপডেট">
        <div className="grid gap-4">
          <LabeledInput label="নাম" value={buf.name ?? ""} onChange={(v) => setBuf((b: any) => ({ ...b, name: v }))} />
          <LabeledInput label="ফোন" value={buf.phone ?? ""} onChange={(v) => setBuf((b: any) => ({ ...b, phone: v }))} />
          <LabeledInput type="email" label="ইমেইল" value={buf.email ?? ""} onChange={(v) => setBuf((b: any) => ({ ...b, email: v }))} />
          <LabeledInput label="আইডি" value={buf.id ?? ""} onChange={(v) => setBuf((b: any) => ({ ...b, id: v }))} />
          <LabeledInput label="ঠিকানা" value={buf.address ?? ""} onChange={(v) => setBuf((b: any) => ({ ...b, address: v }))} />
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setOpenProfile(false)} className="rounded-xl border px-4 py-2  border-gray-400 text-gray-700">বাতিল</button>
            <button onClick={() => save("profile")} className="rounded-xl bg-black px-4 py-2 text-white">সেভ</button>
          </div>
        </div>
      </Modal>

      <Modal open={openNotes} onClose={() => setOpenNotes(false)} title="নোটস / হাইলাইটস">
        <div className="grid gap-3">
          <LabeledTextArea label="নোট" value={buf.notes ?? ""} onChange={(v) => setBuf((b: any) => ({ ...b, notes: v }))} rows={5} />
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setOpenNotes(false)} className="rounded-xl border px-4 py-2 text-gray-500 border-gray-400">বাতিল</button>
            <button onClick={() => save("notes")} className="rounded-xl bg-black px-4 py-2 text-white">সেভ</button>
          </div>
        </div>
      </Modal>

      <Modal open={openAccounts} onClose={() => setOpenAccounts(false)} title="অ্যাকাউন্ট / নম্বর এডিট">
        <AccountEditor value={buf.accounts ?? []} onChange={(v) => setBuf((b: any) => ({ ...b, accounts: v }))} />
        <div className="mt-3 flex justify-end gap-2">
          <button onClick={() => setOpenAccounts(false)} className="rounded-xl border px-4 py-2 text-gray-500 border-gray-400">বাতিল</button>
          <button onClick={() => save("accounts")} className="rounded-xl bg-black px-4 py-2 text-white">সেভ</button>
        </div>
      </Modal>

      <Modal open={openTags} onClose={() => setOpenTags(false)} title="ট্যাগ এডিট">
        <TagEditor value={buf.tags ?? []} onChange={(v) => setBuf((b: any) => ({ ...b, tags: v }))} />
        <div className="mt-3 flex justify-end gap-2">
          <button onClick={() => setOpenTags(false)} className="rounded-xl border px-4 py-2 text-gray-500 border-gray-400">বাতিল</button>
          <button onClick={() => save("tags")} className="rounded-xl bg-black px-4 py-2 text-white">সেভ</button>
        </div>
      </Modal>

      {/* Qualification Modal */}
      <Modal open={openQual} onClose={() => setOpenQual(false)} title="Add / Edit Qualification">
        <QualificationEditor value={buf.qualifications ?? []} onChange={(v) => setBuf((b: any) => ({ ...b, qualifications: v }))} />
        <div className="mt-3 flex justify-end gap-2">
          <button onClick={() => setOpenQual(false)} className="rounded-xl border px-4 py-2 text-gray-500 border-gray-400">বাতিল</button>
          <button onClick={() => save("qual")} className="rounded-xl bg-black px-4 py-2 text-white">সেভ</button>
        </div>
      </Modal>

      {/* Experience Modal */}
      <Modal open={openExp} onClose={() => setOpenExp(false)} title="Add / Edit Work Experience">
        <ExperienceEditor value={buf.experiences ?? []} onChange={(v) => setBuf((b: any) => ({ ...b, experiences: v }))} />
        <div className="mt-3 flex justify-end gap-2">
          <button onClick={() => setOpenExp(false)} className="rounded-xl border px-4 py-2 text-gray-500 border-gray-400">বাতিল</button>
          <button onClick={() => save("exp")} className="rounded-xl bg-black px-4 py-2 text-white">সেভ</button>
        </div>
      </Modal>

      {/* Educational Experience Modal */}
      <Modal open={openEduExp} onClose={() => setOpenEduExp(false)} title="Add / Edit Educational Experience">
        <EduExperienceEditor value={buf.eduExperiences ?? []} onChange={(v) => setBuf((b: any) => ({ ...b, eduExperiences: v }))} />
        <div className="mt-3 flex justify-end gap-2">
          <button onClick={() => setOpenEduExp(false)} className="rounded-xl border px-4 py-2 text-gray-500 border-gray-400">বাতিল</button>
          <button onClick={() => save("eduexp")} className="rounded-xl bg-black px-4 py-2 text-white">সেভ</button>
        </div>
      </Modal>

      {/* Social Links Modal */}
      <Modal open={openSocial} onClose={() => setOpenSocial(false)} title="Connected Social Media">
        <SocialEditor value={buf.socials ?? []} onChange={(v) => setBuf((b: any) => ({ ...b, socials: v }))} />
        <div className="mt-3 flex justify-end gap-2">
          <button onClick={() => setOpenSocial(false)} className="rounded-xl border px-4 py-2 text-gray-500 border-gray-400">বাতিল</button>
          <button onClick={() => save("social")} className="rounded-xl bg-black px-4 py-2 text-white">সেভ</button>
        </div>
      </Modal>

      {/* Guardians Modal */}
      <Modal open={openGuardian} onClose={() => setOpenGuardian(false)} title="অভিভাবক / ইমারজেন্সি নাম্বার">
        <GuardianEditor value={buf.guardians ?? []} onChange={(v) => setBuf((b: any) => ({ ...b, guardians: v }))} />
        <div className="mt-3 flex justify-end gap-2">
          <button onClick={() => setOpenGuardian(false)} className="rounded-xl border px-4 py-2 text-gray-500 border-gray-400">বাতিল</button>
          <button onClick={() => save("guardian")} className="rounded-xl bg-black px-4 py-2 text-white">সেভ</button>
        </div>
      </Modal>
    </main>
  );
}

// ---------- Reusable shells/components ----------
function CardShell({ title, children, onEdit }: { title: string; children: React.ReactNode; onEdit?: () => void }) {
  return (
    <div className="rounded-2xl bg-white p-5 ">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-600">{title}</h3>
        {onEdit && (
          <button onClick={onEdit} className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm border-gray-200 text-gray-500 hover:bg-gray-50">
            <Edit3 className="h-4 w-4" /> এডিট
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function EmptyText({ text }: { text: string }) {
  return <p className="rounded-xl border border-dashed p-4 text-sm text-gray-600">{text}</p>;
}

function ActionButton({ text }: { text: string }) {
  return (
    <button className="flex items-center justify-center gap-2 rounded-2xl border px-3 py-2 text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-50">
      <Plus className="h-4 w-4" /> {text}
    </button>
  );
}

function AccountEditor({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [list, setList] = useState<string[]>(value);
  const [draft, setDraft] = useState("");
  const push = () => {
    if (!draft.trim()) return;
    const next = [...list, draft.trim()];
    setList(next);
    onChange(next);
    setDraft("");
  };
  const remove = (idx: number) => {
    const next = list.filter((_, i) => i !== idx);
    setList(next);
    onChange(next);
  };
  return (
    <div className="grid gap-3">
      <div className="flex gap-2">
        <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="e.g. 017XXXXXXXX or 5555 5555 5555 5555" className="flex-1 rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-greeny-900 focus:ring-2 focus:ring-gray-200" />
        <button onClick={push} className="rounded-xl bg-black px-4 py-2 text-white">Add</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {list.map((a, i) => (
          <Chip key={i} text={a} onRemove={() => remove(i)} />
        ))}
      </div>
    </div>
  );
}

function TagEditor({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [tags, setTags] = useState<string[]>(value);
  const [draft, setDraft] = useState("");
  const add = () => {
    if (!draft.trim()) return;
    const next = [...tags, draft.trim()];
    setTags(next);
    onChange(next);
    setDraft("");
  };
  const remove = (idx: number) => {
    const next = tags.filter((_, i) => i !== idx);
    setTags(next);
    onChange(next);
  };
  return (
    <div className="grid gap-3">
      <div className="flex gap-2">
        <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="নতুন ট্যাগ লিখুন" className="flex-1 rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-green-900 focus:ring-2 focus:ring-gray-200" />
        <button onClick={add} className="rounded-xl bg-black px-4 py-2 text-white">Add</button>
      </div>
      <div className="flex flex-wrap gap-2 ">
        {tags.map((t, i) => (
          <Chip key={i} text={t} onRemove={() => remove(i)} />
        ))}
      </div>
    </div>
  );
}

// ----- Complex Editors -----
function QualificationEditor({ value, onChange }: { value: Qualification[]; onChange: (v: Qualification[]) => void }) {
  const [list, setList] = useState<Qualification[]>(value);
  const [item, setItem] = useState<Qualification>({ degree: "", institute: "", sessionOrYear: "", grade: "" });
  const add = () => {
    if (!item.degree || !item.institute) return;
    const next = [...list, { ...item }];
    setList(next); onChange(next);
    setItem({ degree: "", institute: "", sessionOrYear: "", grade: "" });
  };
  const remove = (i: number) => { const next = list.filter((_, idx) => idx !== i); setList(next); onChange(next); };
  return (
    <div className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <LabeledInput label="Degree" value={item.degree} onChange={(v) => setItem({ ...item, degree: v })} placeholder="BSc in CSE" />
        <LabeledInput label="Institute" value={item.institute} onChange={(v) => setItem({ ...item, institute: v })} placeholder="University Name" />
        <LabeledInput label="Session/Year" value={item.sessionOrYear} onChange={(v) => setItem({ ...item, sessionOrYear: v })} placeholder="2019-2023" />
        <LabeledInput label="Grade (optional)" value={item.grade ?? ""} onChange={(v) => setItem({ ...item, grade: v })} placeholder="CGPA 3.80" />
      </div>
      <div className="flex justify-end"><button onClick={add} className="rounded-xl bg-black px-4 py-2 text-white">Add</button></div>
      <div className="grid gap-2">
        {list.map((q, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border px-3 py-2 text-sm">
            <div>
              <div className="font-medium">{q.degree} • {q.institute}</div>
              <div className="text-gray-600">{q.sessionOrYear}{q.grade ? ` • ${q.grade}` : ""}</div>
            </div>
            <button onClick={() => remove(i)} className="rounded-lg border px-2 py-1">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceEditor({ value, onChange }: { value: Experience[]; onChange: (v: Experience[]) => void }) {
  const [list, setList] = useState<Experience[]>(value);
  const [item, setItem] = useState<Experience>({ company: "", role: "", from: "", to: "", details: "" });
  const add = () => {
    if (!item.company || !item.role) return;
    const next = [...list, { ...item }]; setList(next); onChange(next);
    setItem({ company: "", role: "", from: "", to: "", details: "" });
  };
  const remove = (i: number) => { const next = list.filter((_, idx) => idx !== i); setList(next); onChange(next); };
  return (
    <div className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <LabeledInput label="Company" value={item.company} onChange={(v) => setItem({ ...item, company: v })} />
        <LabeledInput label="Role" value={item.role} onChange={(v) => setItem({ ...item, role: v })} />
        <LabeledInput label="From" value={item.from} onChange={(v) => setItem({ ...item, from: v })} placeholder="Jan 2023" />
        <LabeledInput label="To" value={item.to} onChange={(v) => setItem({ ...item, to: v })} placeholder="Present" />
      </div>
      <LabeledTextArea label="Details" value={item.details ?? ""} onChange={(v) => setItem({ ...item, details: v })} />
      <div className="flex justify-end"><button onClick={add} className="rounded-xl bg-black px-4 py-2 text-white">Add</button></div>
      <div className="grid gap-2">
        {list.map((e, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border px-3 py-2 text-sm">
            <div>
              <div className="font-medium">{e.role} • {e.company}</div>
              <div className="text-gray-600">{e.from} – {e.to}</div>
              {e.details && <div className="text-gray-700">{e.details}</div>}
            </div>
            <button onClick={() => remove(i)} className="rounded-lg border px-2 py-1">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EduExperienceEditor({ value, onChange }: { value: EducationExp[]; onChange: (v: EducationExp[]) => void }) {
  const [list, setList] = useState<EducationExp[]>(value);
  const [item, setItem] = useState<EducationExp>({ title: "", org: "", from: "", to: "", details: "" });
  const add = () => {
    if (!item.title || !item.org) return;
    const next = [...list, { ...item }]; setList(next); onChange(next);
    setItem({ title: "", org: "", from: "", to: "", details: "" });
  };
  const remove = (i: number) => { const next = list.filter((_, idx) => idx !== i); setList(next); onChange(next); };
  return (
    <div className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <LabeledInput label="Title" value={item.title} onChange={(v) => setItem({ ...item, title: v })} placeholder="Research Assistant" />
        <LabeledInput label="Organisation" value={item.org} onChange={(v) => setItem({ ...item, org: v })} placeholder="Dept/University" />
        <LabeledInput label="From" value={item.from} onChange={(v) => setItem({ ...item, from: v })} />
        <LabeledInput label="To" value={item.to} onChange={(v) => setItem({ ...item, to: v })} />
      </div>
      <LabeledTextArea label="Details" value={item.details ?? ""} onChange={(v) => setItem({ ...item, details: v })} />
      <div className="flex justify-end"><button onClick={add} className="rounded-xl bg-black px-4 py-2 text-white">Add</button></div>
      <div className="grid gap-2">
        {list.map((e, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border px-3 py-2 text-sm">
            <div>
              <div className="font-medium">{e.title} • {e.org}</div>
              <div className="text-gray-600">{e.from} – {e.to}</div>
              {e.details && <div className="text-gray-700">{e.details}</div>}
            </div>
            <button onClick={() => remove(i)} className="rounded-lg border px-2 py-1">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialEditor({ value, onChange }: { value: SocialLink[]; onChange: (v: SocialLink[]) => void }) {
  const [list, setList] = useState<SocialLink[]>(value);
  const [item, setItem] = useState<SocialLink>({ platform: "", handle: "", url: "" });
  const add = () => {
    if (!item.platform || !item.url) return;
    const next = [...list, { ...item }]; setList(next); onChange(next);
    setItem({ platform: "", handle: "", url: "" });
  };
  const remove = (i: number) => { const next = list.filter((_, idx) => idx !== i); setList(next); onChange(next); };
  return (
    <div className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-3">
        <LabeledInput label="Platform" value={item.platform} onChange={(v) => setItem({ ...item, platform: v })} placeholder="Facebook" />
        <LabeledInput label="Handle" value={item.handle} onChange={(v) => setItem({ ...item, handle: v })} placeholder="@username" />
        <LabeledInput label="URL" value={item.url} onChange={(v) => setItem({ ...item, url: v })} placeholder="https://..." />
      </div>
      <div className="flex justify-end"><button onClick={add} className="rounded-xl bg-black px-4 py-2 text-white">Add</button></div>
      <div className="grid gap-2">
        {list.map((s, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border px-3 py-2 text-sm">
            <div>
              <div className="font-medium">{s.platform} — {s.handle}</div>
              <div className="text-gray-600">{s.url}</div>
            </div>
            <button onClick={() => remove(i)} className="rounded-lg border px-2 py-1">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function GuardianEditor({ value, onChange }: { value: Guardian[]; onChange: (v: Guardian[]) => void }) {
  const [list, setList] = useState<Guardian[]>(value);
  const [item, setItem] = useState<Guardian>({ name: "", relation: "", phone: "", altPhone: "" });
  const add = () => {
    if (!item.name || !item.phone) return;
    const next = [...list, { ...item }]; setList(next); onChange(next);
    setItem({ name: "", relation: "", phone: "", altPhone: "" });
  };
  const remove = (i: number) => { const next = list.filter((_, idx) => idx !== i); setList(next); onChange(next); };
  return (
    <div className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <LabeledInput label="Name" value={item.name} onChange={(v) => setItem({ ...item, name: v })} />
        <LabeledInput label="Relation" value={item.relation} onChange={(v) => setItem({ ...item, relation: v })} placeholder="Father/Mother/Uncle..." />
        <LabeledInput label="Phone" value={item.phone} onChange={(v) => setItem({ ...item, phone: v })} />
        <LabeledInput label="Alt Phone (optional)" value={item.altPhone ?? ""} onChange={(v) => setItem({ ...item, altPhone: v })} />
      </div>
      <div className="flex justify-end"><button onClick={add} className="rounded-xl bg-black px-4 py-2 text-white">Add</button></div>
      <div className="grid gap-2">
        {list.map((g, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border px-3 py-2 text-sm">
            <div>
              <div className="font-medium">{g.name} <span className="text-gray-600">({g.relation})</span></div>
              <div className="text-gray-700">{g.phone}{g.altPhone ? `, ${g.altPhone}` : ""}</div>
            </div>
            <button onClick={() => remove(i)} className="rounded-lg border px-2 py-1">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
