import React, { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  File,
  X,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  FileCheck2,
  ShieldCheck,
  CaptionsOff,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getApiErrorMessage } from "../../utils/notifications";

const ResumeInterview = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const MAX_SIZE = 5 * 1024 * 1024;
  const ALLOWED_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFile = (selectedFile) => {
    setError("");

    if (!selectedFile) return;

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError("Please upload a PDF or Word document.");
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      setError("File size must be less than 5MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const removeFile = () => {
    setFile(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatSize = (size) => {
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  };

  const handleContinue = async () => {
    if (!file) {
      setError("Please select a resume first.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("resume", file);

      const res = await axios.post("/api/v1/resume/upload", formData);

      const resumeId = res.data.resume._id;
      console.log("IDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD", resumeId);

      navigate(`/resume-analysis/${resumeId}`);

      console.log("Upload successful:", res.data);

      // Navigate to the next page if needed
      // navigate("/interview");
    } catch (error) {
      console.error("Upload failed:", error);

      getApiErrorMessage(error);
    }
  };
  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-black"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center text-black gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold ">
            <Sparkles size={16} />
            AI Resume Analysis
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-amber-200 sm:text-4xl">
            Upload Your Resume
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
            Upload your resume and let AI analyze your skills, experience, and
            qualifications to create a personalized interview.
          </p>
        </div>

        {/* Upload Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Resume Document
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Upload your latest resume to get started.
            </p>
          </div>

          {/* Drag & Drop */}
          {!file ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200 sm:p-12 ${
                dragActive
                  ? "border-amber-500 bg-amber-50"
                  : "border-slate-300 bg-slate-50 hover:border-amber-400 hover:bg-amber-50/50"
              }`}
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <UploadCloud size={32} strokeWidth={1.8} />
              </div>

              <h3 className="text-base font-bold text-slate-800 sm:text-lg">
                Drag and drop your resume here
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                or click below to browse files
              </p>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-300 px-6 py-3 text-sm font-bold text-black shadow-sm transition cursor-pointer hover:bg-amber-400 active:scale-95"
              >
                <UploadCloud size={18} />
                Browse Files
              </button>

              <p className="mt-5 text-xs text-slate-400">
                Supported formats: PDF, DOC, DOCX · Maximum size: 5MB
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>
          ) : (
            /* Uploaded File */
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <FileText size={25} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="break-all text-sm font-bold text-slate-800">
                      {file.name}
                    </h3>

                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-emerald-600"
                    />
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    {formatSize(file.size)} · Ready to upload
                  </p>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-emerald-100">
                    <div className="h-full w-full rounded-full bg-emerald-500" />
                  </div>
                </div>

                <button
                  onClick={removeFile}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                  aria-label="Remove resume"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-700">
                <FileCheck2 size={15} />
                Resume selected successfully
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          {/* Security Info */}
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
            <ShieldCheck size={20} className="shrink-0 text-emerald-600" />

            <div>
              <p className="text-sm font-semibold text-slate-700">
                Your information is safe
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Your resume will be used to personalize your AI interview. Make
                sure your backend securely handles uploaded documents.
              </p>
            </div>
          </div>

          {/* Continue */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={() => navigate(-1)}
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold cursor-pointer text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              disabled={!file}
              onClick={handleContinue}
              className="flex items-center justify-center gap-2 rounded-xl bg-amber-300 px-7 py-3 text-sm font-bold text-black transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-7 text-center">
          <p className="text-xs text-slate-400">
            <Sparkles size={13} className="mr-1 inline text-amber-500" />
            AI-powered interview generation
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeInterview;
