export const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return { backgroundColor: "#FAD02E", color: "black" };
    case "under-review":
      return { backgroundColor: "#cc9fff", color: "black" };
    case "planned":
      return { backgroundColor: "#04bebe", color: "black" };
    case "in-progress":
      return { backgroundColor: "#4FC3F7", color: "black" };
    case "complete":
      return { backgroundColor: "#00ff0a", color: "black" };
    default:
      return {};
  }
};
