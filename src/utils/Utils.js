export const formatCategoryName = (name) => {
  return name
    .split("-") // Split the name into words by hyphen
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Rejoin the words with a space
};
