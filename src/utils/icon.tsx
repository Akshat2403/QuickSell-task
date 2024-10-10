export const priorityIcon = (priority: string) => {
  switch (priority) {
    case "No priority":
      return <img src="icons/No-priority.svg" />;
    case "Low":
      return <img src="icons/Img - Low Priority.svg" />;
    case "Medium":
      return <img src="icons/Img - Medium Priority.svg" />;
    case "High":
      return <img src="icons/Img - High Priority.svg" />;
    case "Urgent":
      return <img src="icons/SVG - Urgent Priority colour.svg" />;
    default:
      return <img src="icons/No-priority.svg" />;
  }
};

export const statusIcon = (status: string) => {
  switch (status) {
    case "Backlog":
      return <img src="icons/Backlog.svg" />;
    case "Todo":
      return <img src="icons/To-do.svg" />;
    case "In progress":
      return <img src="icons/in-progress.svg" />;
    case "Done":
      return <img src="icons/Done.svg" />;
    case "Cancelled":
      return <img src="icons/Cancelled.svg" />;
    default:
      return <img src="icons/Cancelled.svg" />;
  }
};
