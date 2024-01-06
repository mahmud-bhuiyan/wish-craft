const getInitials = (name) => {
  if (!name) return "";

  const names = name.split(" ");
  if (!names || names.length === 0) return "";

  return names.map((n) => (n ? n[0].toUpperCase() : "")).join("");
};

export default getInitials;
