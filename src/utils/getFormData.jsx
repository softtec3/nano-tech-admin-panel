export const getFormData = (form) => {
  if (!form) {
    return "please send e.target";
  }
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  return data;
};
