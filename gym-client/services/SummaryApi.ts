const backendDomin: string = "http://localhost:8080";

interface ApiConfig {
  url: string;
  method: "get" | "post" | "put" | "delete";
}

const SummaryApi: Record<string, ApiConfig> = {
  register: {
    url: `${backendDomin}/api/register`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomin}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomin}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/update-user`,
    method: "post",
  },
  getTrainers: {
    url: `${backendDomin}/api/trainers`,
    method: "get",
  },
  createTrainer: {
    url: `${backendDomin}/api/trainers`,
    method: "post",
  },
  updateTrainer: {
    url: `${backendDomin}/api/trainers`,
    method: "put",
  },
  deleteTrainer: {
    url: `${backendDomin}/api/trainers`,
    method: "delete",
  },
  uploadClass: {
    url: `${backendDomin}/api/upload-class`,
    method: "post",
  },
  allClasses: {
    url: `${backendDomin}/api/get-class`,
    method: "get",
  },
  updateClasses: {
    url: `${backendDomin}/api/update-class`,
    method: "post",
  },
  getClassDetail: {
    url: `${backendDomin}/api/class`,
    method: "get",
  },
  payment: {
    url: `${backendDomin}/api/checkout`,
    method: "post",
  },
  getMembership: {
    url: `${backendDomin}/api/membership-list`,
    method: "get",
  },
  createTestimonial: {
    url: `${backendDomin}/api/testimonial`,
    method: "post"
  },
  getAllTestimonial: {
    url: `${backendDomin}/api/testimonial`,
    method: "get"
  }
};

export default SummaryApi;
