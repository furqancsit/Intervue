
import axios from "axios";
import api from "./axios";
import { toastApiPromise } from "../../utils/notifications";


const interviewApi = {

  // 1. Create Interview
  create: async (payload) => {
    const { data } = await toastApiPromise(
      api.post("/interview/create", payload),
      {
        loading: "Creating your interview...",
        success: "Interview created successfully.",
        error: "Unable to create your interview.",
      },
    );
    return data;
  },

  // 2. Get All My Interviews
  getAll: async (params = {}) => {
    const { data } = await api.get(
      "/interview/get",
      { params }
    );
    return data;
  },

  // 3. Get Single Interview Details
  getById: async (id) => {
    const { data } = await api.get(
      `/interview/${id}`
    );

    console.log(data)
    return data;
  },

  startSession: async (interviewId) => {
  const { data } = await toastApiPromise(
    api.post(`/interview/${interviewId}/sessions`),
    {
      loading: "Starting your interview...",
      success: "Your interview is ready.",
      error: "Unable to start your interview.",
    },
  );

  return data;
},

  // 4. Update Interview
  update: async (interviewId, payload) => {
    const { data } = await toastApiPromise(
      api.put(`/interview/${interviewId}`, payload),
      {
        loading: "Saving your interview...",
        success: "Interview updated successfully.",
        error: "Unable to update your interview.",
      },
    );
    return data;
  },

  // 5. Delete Interview
  delete: async (interviewId) => {
    const { data } = await toastApiPromise(
      api.delete(`/interview/${interviewId}`),
      {
        loading: "Archiving your interview...",
        success: "Interview archived successfully.",
        error: "Unable to archive your interview.",
      },
    );
    return data;
  },

  // 6. Start Interview
  start: async (interviewId) => {
    const { data } = await api.post(
      `/interview/${interviewId}/start`
    );
    return data;
  },

  // 7. Resume Interview
  resume: async (interviewId) => {
    const { data } = await api.post(
      `/interview/${interviewId}/resume`
    );
    return data;
  },

  // 8. Submit Answer
  submitAnswer: async (interviewId,sessionId,order, payload) => {
    const { data } = await api.post(
      `/session/interviews/${interviewId}/sessions/${sessionId}/questions/${order}/answer`,
      payload
    );
    return data;
  },

  // 9. Get Interview Questions
  getQuestions: async (interviewId) => {
    const { data } = await api.get(
      `/interviews/${interviewId}/questions`
    );
    return data;
  },

  // /:interviewId/sessions/:sessionId/complete


  // 10. Complete Interview
  complete: async (interviewId, sessionId, payload = {}) => {
    const { data } = await toastApiPromise(
      api.post(
        `/session/${interviewId}/sessions/${sessionId}/complete`,
        payload,
      ),
      {
        loading: "Completing your interview...",
        success: "Interview completed. Your results are ready.",
        error: "Unable to complete your interview.",
      },
    );
    return data;
  },

  // 11. Get Interview Result
  getResult: async (interviewId, sessionId,config) => {
    const { data } = await api.get(
      `/session/${interviewId}/sessions/${sessionId}/result`,config
    );
    return data;
  },

  // 12. Retake Interview
  retake: async (interviewId) => {
    const { data } = await api.post(
      `/interviews/${interviewId}/retake`
    );
    return data;
  },

  // 13. Get Interview History
  getHistory: async (interviewId) => {
    const { data } = await api.get(
      `/interviews/${interviewId}/history`
    );
    return data;
  },

};

export default interviewApi;
