import { Ticket, User } from "../interfaces";

// Organize tickets by their current status
export const categorizeTicketsByStatus = (
  tickets: Ticket[]
): Record<string, Ticket[]> => {
  return tickets.reduce(
    (accumulator: Record<string, Ticket[]>, ticket: Ticket) => {
      if (!accumulator[ticket.status]) {
        accumulator[ticket.status] = [];
      }
      accumulator[ticket.status].push(ticket);
      return accumulator;
    },
    { Backlog: [], Todo: [], "In Progress": [], Done: [], Cancelled: [] }
  );
};

// Organize tickets based on priority levels
export const categorizeTicketsByPriority = (
  tickets: Ticket[]
): Record<string, Ticket[]> => {
  return tickets.reduce(
    (accumulator: Record<string, Ticket[]>, ticket: Ticket) => {
      const priorityLabel = getPriorityLabel(ticket.priority);
      if (!accumulator[priorityLabel]) {
        accumulator[priorityLabel] = [];
      }
      accumulator[priorityLabel].push(ticket);
      return accumulator;
    },
    { "No Priority": [], Low: [], Medium: [], High: [], Urgent: [] }
  );
};

// Organize tickets by the ID of the assigned user
export const categorizeTicketsByUser = (
  tickets: Ticket[]
): Record<string, Ticket[]> => {
  return tickets.reduce(
    (accumulator: Record<string, Ticket[]>, ticket: Ticket) => {
      if (!accumulator[ticket.userId]) {
        accumulator[ticket.userId] = [];
      }
      accumulator[ticket.userId].push(ticket);
      return accumulator;
    },
    {}
  );
};

// Create a user mapping based on user IDs
export const mapUsersById = (users: User[]): Record<string, User> => {
  return users.reduce((accumulator: Record<string, User>, user: User) => {
    accumulator[user.id] = user;
    return accumulator;
  }, {});
};

// Retrieve label based on the priority value
const getPriorityLabel = (priority: number): string => {
  switch (priority) {
    case 0:
      return "No Priority";
    case 1:
      return "Low";
    case 2:
      return "Medium";
    case 3:
      return "High";
    case 4:
      return "Urgent";
    default:
      return "Not Applicable";
  }
};

// Sort tickets based on their priority
const sortTicketsByPriority = (tickets: Ticket[]): Ticket[] =>
  tickets.sort((a, b) => b.priority - a.priority);

// Sort tickets alphabetically by title
const sortTicketsByTitle = (tickets: Ticket[]): Ticket[] =>
  tickets.sort((a, b) => a.title.localeCompare(b.title));

// Load and organize the ticket grid based on grouping and sorting criteria
export const loadTicketGrid = (
  tickets: Ticket[],
  groupBy: string,
  orderBy: string
): Record<string, Ticket[]> => {
  const sortedTickets =
    orderBy === "priority"
      ? sortTicketsByPriority(tickets)
      : sortTicketsByTitle(tickets);

  switch (groupBy) {
    case "status":
      return categorizeTicketsByStatus(sortedTickets);
    case "priority":
      return categorizeTicketsByPriority(sortedTickets);
    case "user":
      return categorizeTicketsByUser(sortedTickets);
    default:
      return categorizeTicketsByUser(sortedTickets); // Default grouping by user
  }
};
