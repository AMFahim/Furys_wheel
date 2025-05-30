import { AxiosError } from "axios";

export const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    // Server responded with error status
    switch (error.response.status) {
      case 400:
        return {
          message: "Invalid request. Please check your input.",
          errors: (error.response.data as { errors?: any })?.errors
        };
      case 401:
        return {
          message: "Invalid Credintial! Please log in to continue.",
          redirect: "/login"
        };
      case 403:
        return {
          message: "You don't have permission to access this."
        };
      case 404:
        return {
          message: "Resource not found"
        };
      case 409:
        return {
          message: " User already exists!"
        };
      default:
        return {
          message: "An error occurred"
        };
    }
  } else if (error.request) {
    // Request made but no response
    return {
      message: "No response from server"
    };
  } else {
    // Request setup error
    return {
      message: "Error setting up request"
    };
  }
};
