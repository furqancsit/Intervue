import fs from "fs/promises";
import path from "path";
import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

import Resume from "../models/Resume.model.js";

export const uploadResumeController = async (req, res) => {
  let filePath;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume",
      });
    }

    filePath = req.file.path;

    const extension = path.extname(req.file.originalname).toLowerCase();

    let extractedText = "";

    // PDF extraction
    if (extension === ".pdf") {
      const buffer = await fs.readFile(filePath);

      const parser = new PDFParse({
        data: buffer,
      });

      try {
        const pdfData = await parser.getText();
        extractedText = pdfData.text || "";
      } finally {
        await parser.destroy();
      }
    }

    // DOCX extraction
    else if (extension === ".docx") {
      const result = await mammoth.extractRawText({
        path: filePath,
      });

      extractedText = result.value || "";
    }

    // Validate extracted text
    console.log("Extracted text:", extractedText);
    console.log("Text length:", extractedText.length);

    if (typeof extractedText !== "string" || !extractedText.trim()) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from resume",
      });
    }

    // Save resume
    const resume = await Resume.create({
      user: req.userId,
      fileName: req.file.originalname,
      fileUrl: filePath,
      extractedText,
    });

    return res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: {
        _id: resume._id,
        fileName: resume.fileName,
        fileUrl: resume.fileUrl,
        createdAt: resume.createdAt,
      },
    });
  } catch (error) {
    console.error("Resume upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload resume",
    });
  }
};
