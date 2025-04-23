export function getStatus(startDate: string, endDate: string): "Completed" | "Active" | "Upcoming" {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (end < today) return "Completed";
    if (start <= today && end >= today) return "Active";
    return "Upcoming";
  }