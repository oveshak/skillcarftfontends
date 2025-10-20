"use client";

import { url } from "@/lib/api/baseurl";
import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#82ca9d", "#8884d8", "#ffc658", "#8dd1e1", "#a4de6c"];

// ===== Type Definitions =====
interface MCQContent {
  id: number;
  title: string;
  content_type?: string;
  mark?: number;
    mcq_details?: any[]; 
}

interface Module {
  id: number;
  title: string;
  contents?: MCQContent[];
}

interface Milestone {
  id: number;
  modules?: Module[];
}

interface CourseDetails {
  id: number;
  title?: string;
  course_thumbnail?: string;
  milestones?: Milestone[];
}

interface EnrolledCourse {
  id: number;
  course_id: number;
  course_details?: CourseDetails;
  mcqcontents_detail?: MCQContent[];
  content_marks?: { [key: number]: number };
}

interface ModuleStats {
  module: string;
  quizzes: number;
  questions: number;
  correct: number;
}

// ===== JWT Decoder =====
function decodeJWT(token: string): any | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT decode error:", error);
    return null;
  }
}

export default function Resultpage() {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null);
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("access_token") : null);

  // Load enrolled courses
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setError(null);
        const token = getToken();
        if (!token) {
          setError("⚠️ Access token missing. Please login again.");
          return;
        }

        const res = await fetch(`${url}/enrolled-courses/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to load courses");

        const apiResponse = await res.json();
        console.log("🧩 Full API Response:", apiResponse);

        if (apiResponse.success && apiResponse.data?.results?.token) {
          const decodedData = decodeJWT(apiResponse.data.results.token);
          console.log("🔓 Decoded Data:", decodedData);

          const coursesArray: EnrolledCourse[] = Array.isArray(decodedData?.data) ? decodedData.data : [];
          setCourses(coursesArray);
        } else {
          setError("Invalid API response structure");
          setCourses([]);
        }
      } catch (err: any) {
        setError(err.message || "Error fetching courses");
        setCourses([]);
      }
    };

    loadCourses();
  }, []);

  // Load course detail
  const handleCourseSelect = async (enrollmentId: number) => {
    setLoading(true);
    setError(null);
    setSelectedEnrollmentId(enrollmentId);

    try {
      const token = getToken();
      if (!token) {
        setError("⚠️ Access token missing. Please login again.");
        setLoading(false);
        return;
      }

      const res = await fetch(
        `${url}/enrolled-courses/${enrollmentId}/?depth=3`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) throw new Error("Failed to load course details");

      const apiResponse = await res.json();
      console.log("📊 Course Detail Response:", apiResponse);

      if (apiResponse.success && apiResponse.data?.results?.token) {
        const decodedData = decodeJWT(apiResponse.data.results.token);
        console.log("🔓 Decoded Course Data:", decodedData);
        setSelectedCourse(decodedData?.data || null);
      } else {
        setError("Invalid course detail response");
      }
    } catch (err: any) {
      setError(err.message || "Error fetching course details");
    } finally {
      setLoading(false);
    }
  };

  // Quiz statistics
  const getQuizStats = () => {
    if (!selectedCourse) return { totalQuizzes: 0, totalQuestions: 0, correctAnswers: 0, moduleStats: [] as ModuleStats[] };

    const mcqContents: MCQContent[] = selectedCourse.mcqcontents_detail || [];
    const contentMarks = selectedCourse.content_marks || {};

    let totalQuestions = 0;
    let correctAnswers = 0;
    const moduleMap = new Map<string, ModuleStats>();

    mcqContents.forEach((mcq) => {
      totalQuestions++;
      const mark = contentMarks[mcq.id] || 0;
      correctAnswers += mark;

      selectedCourse.course_details?.milestones?.forEach((milestone) => {
        milestone.modules?.forEach((module) => {
          const content = module.contents?.find((c) => c.id === mcq.id);
          if (content) {
            if (!moduleMap.has(module.title)) {
              moduleMap.set(module.title, { module: module.title, quizzes: 0, questions: 0, correct: 0 });
            }
            const modStats = moduleMap.get(module.title)!;
            modStats.quizzes++;
            modStats.questions += content.mcq_details?.length || 1;
            modStats.correct += mark;
          }
        });
      });
    });

    return {
      totalQuizzes: mcqContents.length,
      totalQuestions,
      correctAnswers,
      moduleStats: Array.from(moduleMap.values()),
    };
  };

  const stats = getQuizStats();
  const pieData = [
    { name: "সঠিক উত্তর", value: stats.correctAnswers },
    { name: "ভুল উত্তর", value: stats.totalQuestions - stats.correctAnswers },
  ];
  const scorePercentage =
    stats.totalQuestions > 0 ? ((stats.correctAnswers / stats.totalQuestions) * 100).toFixed(1) : 0;

  return (
    <div className="px-4 lg:p-6 max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-3xl text-center py-10 font-semibold mb-6 text-gray-900">
        🎯 কোর্সভিত্তিক কুইজ রেজাল্ট বিশ্লেষণ
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-4">{error}</div>
      )}

      {/* Course List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 space-y-3">
          {courses.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCourseSelect(c.id)}
              className={`w-full text-left p-4 rounded-xl border transition ${
                selectedEnrollmentId === c.id
                  ? "border-indigo-400 bg-indigo-50"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                {c.course_details?.course_thumbnail && (
                  <img
                    src={c.course_details.course_thumbnail}
                    alt={c.course_details.title}
                    className="w-14 h-14 rounded-md object-cover"
                  />
                )}
                <div>
                  <div className="font-bold text-gray-700">{c.course_details?.title || "কোর্স"}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    কুইজ: {c.mcqcontents_detail?.length || 0} টি
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Quiz Result Section */}
        <div className="col-span-1 lg:col-span-2">
          {loading && <div className="text-center py-10 text-gray-500">লোড হচ্ছে...</div>}

          {!loading && selectedCourse && (
            <div className="py-4 lg:py-6 lg:p-6 rounded-2xl lg:shadow-sm">
              <h2 className="text-xl pb-2 font-semibold mb-2 text-gray-700">
                {selectedCourse.course_details?.title}
              </h2>

              {/* Score Summary */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg mb-4">
                <div className="flex text-center overflow-x-auto  items-center justify-between">
                  <div>
                    <p className="text-sm text-nowrap text-gray-600">মোট কুইজ</p>
                    <p className="text-2xl font-bold text-indigo-600">{stats.totalQuizzes}</p>
                  </div>
                  <div>
                    <p className="text-sm  text-nowrap text-gray-600">মোট প্রশ্ন</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.totalQuestions}</p>
                  </div>
                  <div>
                    <p className="text-sm  text-nowrap text-gray-600">স্কোর</p>
                    <p className="text-2xl font-bold text-green-600">{scorePercentage}%</p>
                  </div>
                  <div>
                    <p className="text-sm  text-nowrap text-gray-600">সঠিক উত্তর</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {stats.correctAnswers}/{stats.totalQuestions}
                    </p>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-4 lg:shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium mb-2 text-gray-700">রেজাল্ট ওভারভিউ</h3>
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl p-4 lg:shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium mb-2 text-gray-700">মডিউল-ভিত্তিক পারফরম্যান্স</h3>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={stats.moduleStats} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="module" tick={{ fontSize: 10 }} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="correct" name="সঠিক" fill="#82ca9d" />
                      <Bar dataKey="questions" name="মোট প্রশ্ন" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Quiz Details List */}
              <div className="mt-6 lg:bg-slate-50 py-4 lg:py-4 lg:p-4 rounded-xl">
                <h3 className="font-medium text-gray-600 mb-3">📝 কুইজ বিস্তারিত তথ্য</h3>
                {selectedCourse.mcqcontents_detail?.map((quiz) => {
                  const mark = selectedCourse.content_marks?.[quiz.id] || 0;
                  return (
                    <div key={quiz.id} className="bg-white p-4 rounded-lg shadow-sm mb-3 border-l-4 border-indigo-400">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{quiz.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">
                            প্রকার: {quiz.content_type === "quiz" ? "কুইজ" : quiz.content_type}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            mark > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {mark > 0 ? "✓ সঠিক" : "✗ ভুল"}
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        প্রাপ্ত নম্বর: <span className="font-bold">{mark}</span> / {quiz.mark || 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!loading && !selectedCourse && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">একটি কোর্স নির্বাচন করুন</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
